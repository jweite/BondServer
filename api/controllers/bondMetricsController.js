'use strict';
// Set up mongo/mongoose

var mongoose = require('mongoose'),
  BondMetrics = mongoose.model('BondMetrics');

exports.list_all_bondMetrics = function(req, res) {
  var limit = parseInt(req.query.limit);
  console.log("limit: " + limit);
  
  var skip = parseInt(req.query.skip);
  console.log("skip: " + skip);
  
  var projection = null;
  if (typeof(req.query.fields) !== "undefined") {
	  projection = req.query.fields;
	  projection = projection.replace(/,/g, " ");		// Commas are nice.  Spaces are required.
  }
  console.log("projection: " + projection);

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
	
    BondMetrics.find(query, projection, function (err, bondMetrics) {
      if (err)
        res.send(err);
      res.json(bondMetrics);
    }).sort({"Run_Date": 1}).limit(isNaN(limit) ? 100 : limit).skip(isNaN(skip) ? 0 : skip);
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
