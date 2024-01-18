"use strict";

// is connected yo auth route
// method GET
// route /order
// Open order page
var GetOrderPage = function GetOrderPage(req, res, next) {
  res.render('order', {
    title: 'Order-Product'
  });
};

module.exports = {
  GetOrderPage: GetOrderPage
};