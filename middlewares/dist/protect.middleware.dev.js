"use strict";

var protectUser = function protectUser(req, res, next) {
  if (req.cookies.token) {
    res.redirect('/');
    return;
  }

  next();
};

module.exports = {
  protectUser: protectUser
};