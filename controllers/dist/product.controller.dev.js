"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Product = require('../models/model.product.js'); // GET
// Route /add
//Desc open get page


var getAddPage = function getAddPage(req, res, next) {
  res.render('add', {
    title: 'Add product',
    isProductError: req.flash('isProductError')
  });
}; // POST
// Route /add-product
//Desc open get page


var AddProductData = function AddProductData(req, res, next) {
  var _req$body, title, description, image, number, inputProduct;

  return regeneratorRuntime.async(function AddProductData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, title = _req$body.title, description = _req$body.description, image = _req$body.image, number = _req$body.number;

          if (!(!title || !description || !image || !number)) {
            _context.next = 5;
            break;
          }

          req.flash('isProductError', 'You should fill in the blanks');
          res.redirect('/add');
          return _context.abrupt("return");

        case 5:
          // Create Product part
          inputProduct = {
            title: title,
            description: description,
            image: image,
            number: number
          };
          console.log(req.userId);
          _context.next = 9;
          return regeneratorRuntime.awrap(Product.create(_objectSpread({}, inputProduct, {
            user: req.userId
          })));

        case 9:
          res.redirect('/');

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
}; // GET
// Route /products
// Open all products page


var ProductsPage = function ProductsPage(req, res, next) {
  var user, myproducts;
  return regeneratorRuntime.async(function ProductsPage$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          user = req.userId ? req.userId.toString() : null;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Product.find({
            user: user
          }).populate('user').lean());

        case 3:
          myproducts = _context2.sent;
          res.render('products', {
            title: 'Products',
            isProducts: true,
            myproducts: myproducts
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // GET
// Route /about
// shows about product


var AboutForProduct = function AboutForProduct(req, res, next) {
  var id, aboutProduct;
  return regeneratorRuntime.async(function AboutForProduct$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Product.findById(id).populate('user').lean());

        case 3:
          aboutProduct = _context3.sent;
          res.render('about', {
            title: 'About for products',
            aboutProduct: aboutProduct
          });

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var AddComment = function AddComment(req, res, next) {
  var id;
  return regeneratorRuntime.async(function AddComment$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          console.log(req.body);
          res.redirect('/add-comment');

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
};

module.exports = {
  getAddPage: getAddPage,
  AddProductData: AddProductData,
  ProductsPage: ProductsPage,
  AboutForProduct: AboutForProduct,
  AddComment: AddComment
};