'use strict';
// Set up mongo/mongoose

var mongoose = require('mongoose'),
  BondMetrics = mongoose.model('BondMetrics');

exports.list_all_bondMetrics = function(req, res) {
  console.log("query:");
  console.log(req.query);

  var limit = parseInt(req.query.limit);
  console.log("limit: " + limit);
  
  var skip = parseInt(req.query.skip);
  console.log("skip: " + skip);
  
  var projection = null;
  if (typeof(req.query.fields) !== "undefined") {
	  projection = req.query.fields;
	  projection = projection.replace(/,/g, " ");		// Commas are nice.  Spaces are required.
	  if (projection.indexOf("_id") < 0) {
		  projection = projection + " -_id";			// Unless you ask for _id, exclude it.
	  }
  }
  console.log("projection: " + projection);
  
  var groupFields = null;
  console.log("groupFields string = " + req.query.groupFields);
  if (typeof(req.query.groupFields) !== "undefined") {
	groupFields = req.query.groupFields.split(',');
  }	
  console.log("groupFields:");
  console.log(groupFields);

  if (typeof(req.query.query) != "undefined") {
    console.log("BondMetrics Query:" + req.query.query);
    var query = JSON.parse(req.query.query);

	if (typeof(query.Run_Date) !== "undefined") {
		console.log("Special Handling Run_Date: " + typeof(query.Run_Date));
		if (typeof(query.Run_Date) === "string") {
			var d = Date.parse(query.Run_Date);
			query.Run_Date = Date.parse(query.Run_Date);
		}
		else if (typeof(query.Run_Date) === "object") {
			// For today we handle two-element objects, typically a range query ($gte and a $lt)
			if (Object.keys(query.Run_Date).length > 0) {
				var d = new Date(Date.parse(query.Run_Date[Object.keys(query.Run_Date)[0]]));
				query.Run_Date[Object.keys(query.Run_Date)[0]] = d;
			}
			if (Object.keys(query.Run_Date).length > 1) {
				var d = new Date(Date.parse(query.Run_Date[Object.keys(query.Run_Date)[1]]));
				query.Run_Date[Object.keys(query.Run_Date)[1]] = d;
			}
		}
		console.log(query.Run_Date);
	}

	if (groupFields === null || groupFields.length == 0 ) {
		BondMetrics.find(query, projection, function (err, bondMetrics) {
		  if (err)
			res.send(err);
		  res.json(bondMetrics);
		}).sort({"Run_Date": 1}).limit(isNaN(limit) ? 100 : limit).skip(isNaN(skip) ? 0 : skip);
	}
	else {
		var projectionArray = (projection !== null && projection.length > 0) ?
				projection.split(' ') : 
				Object.keys(BondMetrics.schema.obj);

		// The order of the pipeline's entries is assumed by the code below that pushes values into them.
		//  If you re-order the entries then the hard-coded offsets below need to be adjusted.
		var pipeline = [
			{"$match" : query},
			{"$sort" : { "Cusip" : 1, "Run_Date" : 1}},
			{"$group" : { _id: {}, data: { $push:  {} } } } 
		];
		
		groupFields.forEach(field => pipeline[2]["$group"]["_id"][field] = "$"+field);	// 2 = $group pipeline member offset in pipeline.
		
		projectionArray.forEach(field => { if (!groupFields.includes(field)) pipeline[2]["$group"]["data"]["$push"][field] = "$"+field; } ); 
		
		BondMetrics.aggregate(pipeline, function (err, bondMetrics) {
		  if (err)
			res.send(err);
		  res.json(bondMetrics);
		});
	}
  }
  else {
      console.log("BondMetrics ReadAll");
	  BondMetrics.find({}, projection, function(err, bondMetrics) {
		if (err)
		  res.send(err);
		res.json(bondMetrics);
	  }).sort({"Run_Date": 1}).limit(isNaN(limit) ? 1000 : limit).skip(isNaN(skip) ? 0 : skip);
  }
};

exports.create_a_bondMetric = function(req, res) {
  console.log("create_a_bondMetric:");
  console.log(req.body);
  var new_bondMetric = new BondMetric(req.body);
  new_bondMetric.save(function(err, bondMetric) {
    if (err)
      res.send(err);
    res.json(bondMetric);
  });
};

exports.read_a_bondMetric = function(req, res) {
  console.log("read_a_bondMetric: ID=" + req.params.id);
  BondMetrics.findById(req.params.id, function(err, bondMetric) {
    if (err)
      res.send(err);
    res.json(bondMetric);
  });
};

exports.update_a_bondMetric = function(req, res) {
  console.log("update_a_bondMetric: ID=" + req.params.id);
  console.log(req.body);
  BondMetrics.findOneAndUpdate(req.params.id, req.body, {new: true}, function(err, bondMetric) {
    if (err)
      res.send(err);
    res.json(bondMetric);
  });
};

exports.delete_a_bondMetric = function(req, res) {
  console.log("delete_a_bondMetric: ID=" + req.params.id);
  BondMetrics.remove({
    _id: req.params.cusip
  }, function(err, bondMetric) {
    if (err)
      res.send(err);
    res.json({ message: 'BondMetric successfully deleted' });
  });
};
