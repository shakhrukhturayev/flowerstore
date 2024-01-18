"use strict";

var _require = require('mongoose'),
    Schema = _require.Schema,
    model = _require.model;

var CommentSchema = new Schema({
  comment: {
    type: String,
    required: true
  },
  email: {
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
var Comment = model('Comment', CommentSchema);
module.exports = Comment;