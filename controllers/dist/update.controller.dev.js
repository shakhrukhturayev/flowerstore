"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Product = require('../models/model.product');

var Order = require('../models/model.order'); //Desc : Edit product page
//Route: /update/:id
//method GET


var UpdateProductPage = function UpdateProductPage(req, res, next) {
  var id, Editproduct;
  return regeneratorRuntime.async(function UpdateProductPage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          id = req.params.id;
          _context.next = 3;
          return regeneratorRuntime.awrap(Product.findById(id).populate('user').lean());

        case 3:
          Editproduct = _context.sent;
          res.render('update', {
            title: 'Update',
            Editproduct: Editproduct,
            UpdateError: req.flash('UpdateError')
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}; //Desc : Edit product data
//Route: /update/:id
//method POST


var UpdateProductData = function UpdateProductData(req, res, next) {
  var _req$body, title, description, number, id;

  return regeneratorRuntime.async(function UpdateProductData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, title = _req$body.title, description = _req$body.description, number = _req$body.number;
          id = req.params.id;

          if (!(!title || !description || !number)) {
            _context2.next = 6;
            break;
          }

          req.flash('UpdateError', 'You should fill in the blanks');
          res.redirect("/update/".concat(id));
          return _context2.abrupt("return");

        case 6:
          _context2.next = 8;
          return regeneratorRuntime.awrap(Product.findByIdAndUpdate(id, req.body, {
            "new": true
          }));

        case 8:
          res.redirect('/products');

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  });
}; //Desc : Delete product
//Route: //delete-product
//method POST


var DeleteProduct = function DeleteProduct(req, res, next) {
  var id;
  return regeneratorRuntime.async(function DeleteProduct$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Product.findByIdAndDelete(id));

        case 3:
          res.redirect('/');

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // Desc : Open order page 
// Route: /order
// method GET


var GetOrderPage = function GetOrderPage(req, res, next) {
  res.render('order', {
    title: 'Order-page',
    orderError: req.flash('orderError')
  });
}; // Desc: Take order data from form table
// Route : /orders-data
// Method : POST


var GetOrderOptions = function GetOrderOptions(req, res, next) {
  var _req$body2, firstname, lastname, email, country, state, phonenumber, inputOrder;

  return regeneratorRuntime.async(function GetOrderOptions$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, firstname = _req$body2.firstname, lastname = _req$body2.lastname, email = _req$body2.email, country = _req$body2.country, state = _req$body2.state, phonenumber = _req$body2.phonenumber;
          inputOrder = req.body;

          if (!(!firstname || !lastname || !email || !country || !state || !phonenumber)) {
            _context4.next = 6;
            break;
          }

          req.flash('orderError', 'Error: All filers are required');
          res.redirect('/order');
          return _context4.abrupt("return");

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(Order.create(_objectSpread({}, inputOrder, {
            product: req.userId
          })));

        case 8:
          res.redirect('/');

        case 9:
        case "end":
          return _context4.stop();
      }
    }
  });
};

module.exports = {
  UpdateProductPage: UpdateProductPage,
  UpdateProductData: UpdateProductData,
  DeleteProduct: DeleteProduct,
  GetOrderPage: GetOrderPage,
  GetOrderOptions: GetOrderOptions
};