"use strict";

var jwt = require('jsonwebtoken');

var User = require('../models/model.auth');

var NotAddProduct = function NotAddProduct(req, res, next) {
  if (!req.cookies.token) {
    res.redirect('/login');
    return;
  }

  next();
};

var UserWebJwt = function UserWebJwt(req, res, next) {
  var token, decode, user;
  return regeneratorRuntime.async(function UserWebJwt$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (req.cookies.token) {
            _context.next = 3;
            break;
          }

          next();
          return _context.abrupt("return");

        case 3:
          token = req.cookies.token;
          decode = jwt.verify(token, process.env.JWT_SECRET);
          _context.next = 7;
          return regeneratorRuntime.awrap(User.findById(decode.userId));

        case 7:
          user = _context.sent;
          req.userId = user._id;
          next();

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = {
  NotAddProduct: NotAddProduct,
  UserWebJwt: UserWebJwt
};