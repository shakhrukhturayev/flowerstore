"use strict";

var _require = require('express'),
    Router = _require.Router;

var _require2 = require('../controllers/product.controller.js'),
    getAddPage = _require2.getAddPage,
    AddProductData = _require2.AddProductData,
    ProductsPage = _require2.ProductsPage,
    AboutForProduct = _require2.AboutForProduct,
    AddComment = _require2.AddComment;

var router = Router();

var _require3 = require('../middlewares/add.middleware'),
    NotAddProduct = _require3.NotAddProduct,
    UserWebJwt = _require3.UserWebJwt;

router.get('/add', NotAddProduct, getAddPage);
router.get('/products', ProductsPage);
router.get('/about/:id', AboutForProduct);
router.post('/add-product', UserWebJwt, AddProductData);
router.post('/add-comment/:id', AddComment);
module.exports = router;