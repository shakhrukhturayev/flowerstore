"use strict";

var User = require('../models/model.auth');

var Product = require('../models/model.product');

var bcrypt = require('bcrypt');

var _require = require('../services/token.service'),
    generateJWTtoken = _require.generateJWTtoken; // GEt
// take login page(/login)
//desc open login page


var GetLoginPage = function GetLoginPage(req, res) {
  return regeneratorRuntime.async(function GetLoginPage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          res.render('login', {
            title: 'Login',
            isLogin: true,
            loginError: req.flash('loginError')
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}; //GET
// Take a registr page(/registr)
// Private


var RegistrPage = function RegistrPage(req, res) {
  res.render('registr', {
    title: 'Registr',
    isRegistr: true,
    registrError: req.flash('registrError')
  });
}; //POST
// Take a data from registr page(/registr)
// PUBLIC


var PostRegistrPage = function PostRegistrPage(req, res) {
  var _req$body, email, password, firstname, lastname, hasUser, hashed, registrData, authuser, token;

  return regeneratorRuntime.async(function PostRegistrPage$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password, firstname = _req$body.firstname, lastname = _req$body.lastname;

          if (!(!email || !password || !firstname || !lastname)) {
            _context2.next = 5;
            break;
          }

          req.flash('registrError', 'All filers required');
          res.redirect('/registr');
          return _context2.abrupt("return");

        case 5:
          _context2.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 7:
          hasUser = _context2.sent;

          if (!hasUser) {
            _context2.next = 12;
            break;
          }

          req.flash('registrError', 'User already has');
          res.redirect('/registr');
          return _context2.abrupt("return");

        case 12:
          _context2.next = 14;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 14:
          hashed = _context2.sent;
          registrData = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashed
          };
          _context2.next = 18;
          return regeneratorRuntime.awrap(User.create(registrData));

        case 18:
          authuser = _context2.sent;
          token = generateJWTtoken(authuser._id);
          res.cookie('token', token, {
            httpOnly: true,
            secure: true
          });
          res.redirect('/');

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // POST
// take login page data
// Public


var postLoginData = function postLoginData(req, res) {
  var _req$body2, email, password, exsitUser, isPassEquual, token;

  return regeneratorRuntime.async(function postLoginData$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

          if (!(!email || !password)) {
            _context3.next = 5;
            break;
          }

          req.flash('loginError', 'All files required');
          res.redirect('/login');
          return _context3.abrupt("return");

        case 5:
          _context3.next = 7;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 7:
          exsitUser = _context3.sent;

          if (exsitUser) {
            _context3.next = 12;
            break;
          }

          req.flash('loginError', 'User not found try again');
          res.redirect('/login');
          return _context3.abrupt("return");

        case 12:
          _context3.next = 14;
          return regeneratorRuntime.awrap(bcrypt.compare(password, exsitUser.password));

        case 14:
          isPassEquual = _context3.sent;

          if (isPassEquual) {
            _context3.next = 19;
            break;
          }

          req.flash('loginError', 'Password is not correct');
          res.redirect('/login');
          return _context3.abrupt("return");

        case 19:
          token = generateJWTtoken(exsitUser._id);
          res.cookie('token', token, {
            httpOnly: true,
            secure: true
          });
          res.redirect('/dashboard'); // dashboard ga yo'naltirildi

        case 22:
        case "end":
          return _context3.stop();
      }
    }
  });
}; //GET
// /dashboard admin page data
// public 


var GetAdminDashboard = function GetAdminDashboard(req, res, next) {
  var user, adminAvatar;
  return regeneratorRuntime.async(function GetAdminDashboard$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          user = req.userId ? req.userId.toString() : null;
          _context4.next = 3;
          return regeneratorRuntime.awrap(User.findById(user));

        case 3:
          adminAvatar = _context4.sent;
          // Product.find({user}).populate('user')  
          res.render('dashboard', {
            title: 'Admin-dashboard',
            adminAvatar: adminAvatar
          });

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
}; // GET
// Route /logout
// Public


var GetLogout = function GetLogout(req, res) {
  res.clearCookie('token');
  res.redirect('/');
}; // GET
// take main page
// Public


var mainPage = function mainPage(req, res) {
  var products, useravatar, mainAdminAvatar;
  return regeneratorRuntime.async(function mainPage$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Product.find().lean());

        case 2:
          products = _context5.sent;
          useravatar = req.userId ? req.userId.toString() : null;
          _context5.next = 6;
          return regeneratorRuntime.awrap(User.find({
            useravatar: useravatar
          }));

        case 6:
          mainAdminAvatar = _context5.sent;
          res.render('main', {
            title: 'Flower shop',
            products: products.reverse(),
            userId: req.userId ? req.userId.toString() : null,
            mainAdminAvatar: mainAdminAvatar
          });

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  });
};

module.exports = {
  GetLoginPage: GetLoginPage,
  mainPage: mainPage,
  postLoginData: postLoginData,
  RegistrPage: RegistrPage,
  PostRegistrPage: PostRegistrPage,
  GetLogout: GetLogout,
  GetAdminDashboard: GetAdminDashboard
};