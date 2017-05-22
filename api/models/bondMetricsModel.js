'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BondMetricsSchema = new Schema({
  Run_Date: {
	type: Date,
	Required: 'You must include the Run_Date (which reflects the date of the "latest" fields) of the Bond'  
  },
  Cusip: {
    type: String,
    Required: 'You must include the Cusip of the bond'
  },
  Duration: {
    type: Number,
  },
  Face_Value: {
    type: Number,
  },
  Price: {
    type: Number,
  },
  OAS: {
    type: Number,
  },
  Weight: {
    type: Number,
  },
  Yield: {
    type: Number,
  }
}, {collection: 'bondMetrics'});

module.exports = mongoose.model('BondMetrics', BondMetricsSchema);