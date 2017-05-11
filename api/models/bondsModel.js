'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BondsSchema = new Schema({
  Run_Date: {
	type: Date,
	Required: 'You must include the Run_Date (which reflects the date of the "latest" fields) of the Bond'  
  },
  Ticker: {
    type: String,
    Required: 'You must include the Ticker of the bond, which reflects its issuer'
  },
  Cusip: {
    type: String,
    Required: 'You must include the Cusip of the bond'
  },
  IssuerName: {
    type: String,
    Required: 'You must include the IssuerName of the bond'
  },
  Coupon: {
    type: Number,
    Required: 'You must include the Coupon of the bond'
  },
  Maturity_Date: {
	type: Date,
	Required: 'You must include the Maturity_Date of the Bond'  
  },
  Face_Value: {
    type: Number,
    Required: 'You must include the Face_Value of the bond'
  },
  ParentSector: {
    type: String,
  },
  Sector: {
    type: String,
    Required: 'You must include the Sector of the bond'
  },
  Country: {
    type: String,
  },
  Region: {
    type: String,
    Required: 'You must include the Region of the bond'
  },
  Latest_Duration: {
    type: Number,
  },
  Latest_Price: {
    type: Number,
  },
  Latest_OAS: {
    type: Number,
  },
  Latest_Weight: {
    type: Number,
  },
  Latest_Yield: {
    type: Number,
  }
});

module.exports = mongoose.model('Bonds', BondsSchema);