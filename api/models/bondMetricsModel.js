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
}, {collection: 'bondMetrics', toObject: {virtuals: true}, toJSON: {virtuals: true}});

BondMetricsSchema.virtual('Run_Date_ms').get(function () {
	return this.Run_Date.getTime();
});

module.exports = mongoose.model('BondMetrics', BondMetricsSchema);