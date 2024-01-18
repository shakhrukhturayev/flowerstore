"use strict";

var _require = require('mongoose'),
    Schema = _require.Schema,
    model = _require.model;

var UserSchema = new Schema({
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
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});
var User = model('User', UserSchema);
module.exports = User;