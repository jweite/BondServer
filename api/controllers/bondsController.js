'use strict';
// Set up mongo/mongoose

var mongoose = require('mongoose'),
  Bonds = mongoose.model('Bonds');

exports.list_all_bonds = function(req, res) {
  var limit = parseInt(req.query.limit);
  console.log("limit: " + limit);
  
  var skip = parseInt(req.query.skip);
  console.log("skip: " + skip);

  var sortField = req.query.sortField || "_id";
  console.log("sortField: " + sortField);

  var sortDirection = req.query.sortDirection || "";
  console.log("sortDirection: " + sortDirection);
  
  var sortClause = {};
  sortClause[sortField] = (sortDirection.startsWith('desc')) ? -1 : 1;
  console.log(sortClause);
  
  
  if (typeof(req.query.query) != "undefined") {
    console.log("Bonds Query:" + req.query.query);
    var query = JSON.parse(req.query.query);

	if (typeof(query.Maturity) !== "undefined") {
		console.log("Special Handling MaturityDate: " + typeof(query.Maturity));
		if (typeof(query.Maturity) === "string") {
			var d = Date.parse(query.Maturity);
			query.Maturity = Date.parse(query.Maturity);
		}
		else if (typeof(query.Maturity) === "object") {
			// For today we handle two element objects, typically a range query ($gte and a $lt)
			if (Object.keys(query.Maturity).length > 0) {
				var d = new Date(Date.parse(query.Maturity[Object.keys(query.Maturity)[0]]));
				query.Maturity[Object.keys(query.Maturity)[0]] = d;
			}
			if (Object.keys(query.Maturity).length > 1) {
				var d = new Date(Date.parse(query.Maturity[Object.keys(query.Maturity)[1]]));
				query.Maturity[Object.keys(query.Maturity)[1]] = d;
			}
		}
		console.log(query.Maturity);
	}
	
    Bonds.find(query, null, function (err, bonds) {
      if (err)
        res.send(err);
      res.json(bonds);
    }).sort(sortClause).limit(isNaN(limit) ? 100000 : limit).skip(isNaN(skip) ? 0 : skip);
  }
  else {
      console.log("Bonds ReadAll");
	  Bonds.find({}, function(err, bonds) {
		if (err)
		  res.send(err);
		res.json(bonds);
	  }).sort(sortClause).limit(isNaN(limit) ? 100000 : limit).skip(isNaN(skip) ? 0 : skip);
  }
};

exports.create_a_bond = function(req, res) {
  console.log("create_a_bond:");
  console.log(req.body);
  var new_bond = new Bond(req.body);
  new_bond.save(function(err, bond) {
    if (err)
      res.send(err);
    res.json(bond);
  });
};

exports.read_a_bond = function(req, res) {
  console.log("read_a_bond: ID=" + req.params.id);
  Bonds.findById(req.params.id, function(err, bond) {
    if (err)
      res.send(err);
    res.json(bond);
  });
};

exports.update_a_bond = function(req, res) {
  console.log("update_a_bond: ID=" + req.params.id);
  console.log(req.body);
  Bonds.findOneAndUpdate(req.params.id, req.body, {new: true}, function(err, bond) {
    if (err)
      res.send(err);
    res.json(bond);
  });
};

exports.delete_a_bond = function(req, res) {
  console.log("delete_a_bond: ID=" + req.params.id);
  Bonds.remove({
    _id: req.params.cusip
  }, function(err, bond) {
    if (err)
      res.send(err);
    res.json({ message: 'Bond successfully deleted' });
  });
};
