"use strict";

var _require = require('express'),
    Router = _require.Router;

var router = Router();

var _require2 = require('../controllers/order.controller'),
    GetOrderPage = _require2.GetOrderPage;

router.get('/order', GetOrderPage);
module.exports = router;