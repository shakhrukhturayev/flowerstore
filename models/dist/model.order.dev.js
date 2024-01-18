"use strict";

var _require = require('mongoose'),
    Schema = _require.Schema,
    model = _require.model;

var OrderSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phonenumber: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }
}, {
  timestamps: true
});
var Order = model('Order', OrderSchema);
module.exports = Order;