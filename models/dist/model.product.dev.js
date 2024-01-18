"use strict";

var _require = require('mongoose'),
    Schema = _require.Schema,
    model = _require.model;

var ProductSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});
var Product = model('Product', ProductSchema);
module.exports = Product;