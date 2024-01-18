"use strict";

var middle = function middle(req, res, next) {
  var isAuth = req.cookies.token ? true : false;
  res.locals.token = isAuth;
  next();
};

module.exports = middle;