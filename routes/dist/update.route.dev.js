"use strict";

var _require = require('express'),
    Router = _require.Router;

var router = Router();

var _require2 = require('../controllers/update.controller'),
    UpdateProductPage = _require2.UpdateProductPage,
    UpdateProductData = _require2.UpdateProductData,
    DeleteProduct = _require2.DeleteProduct,
    GetOrderPage = _require2.GetOrderPage,
    GetOrderOptions = _require2.GetOrderOptions;

var _require3 = require('../middlewares/add.middleware'),
    NotAddProduct = _require3.NotAddProduct;

router.get('/update/:id', UpdateProductPage);
router.get('/order', NotAddProduct, GetOrderPage);
router.post('/orders-data', GetOrderOptions);
router.post('/update-product/:id', UpdateProductData);
router.post('/delete-product/:id', DeleteProduct);
module.exports = router;