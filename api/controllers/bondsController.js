'use strict';
// Set up mongo/mongoose

var mongoose = require('mongoose'),
  Bonds = mongoose.model('Bonds');

exports.list_all_bonds = function(req, res) {
  if (typeof(req.query.query) != "undefined") {
    console.log("Query:" + req.query.query);
    var query = JSON.parse(req.query.query);
    Bonds.find(query, null, function (err, bonds) {
      if (err)
        res.send(err);
      res.json(bonds);
    }).limit(100);
  }
  else {
      console.log("ReadAll");
	  Bonds.find({}, function(err, bonds) {
		if (err)
		  res.send(err);
		res.json(bonds);
	  });
  }
};

exports.create_a_bond = function(req, res) {
  console.log("Create:");
  console.log(req.body);
  var new_bond = new Bond(req.body);
  new_bond.save(function(err, bond) {
    if (err)
      res.send(err);
    res.json(bond);
  });
};

exports.read_a_bond = function(req, res) {
  console.log("Read: ID=" + req.params.id);
  Bonds.findById(req.params.id, function(err, bond) {
    if (err)
      res.send(err);
    res.json(bond);
  });
};

exports.update_a_bond = function(req, res) {
  console.log("Update: ID=" + req.params.id);
  console.log(req.body);
  Bonds.findOneAndUpdate(req.params.id, req.body, {new: true}, function(err, bond) {
    if (err)
      res.send(err);
    res.json(bond);
  });
};

exports.delete_a_bond = function(req, res) {
  console.log("Delete: ID=" + req.params.id);
  Bonds.remove({
    _id: req.params.cusip
  }, function(err, bond) {
    if (err)
      res.send(err);
    res.json({ message: 'Article successfully deleted' });
  });
};
