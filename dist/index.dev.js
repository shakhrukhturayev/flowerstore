"use strict";

var express = require('express');

var dotenv = require('dotenv');

var flash = require('connect-flash');

var session = require('express-session');

var mongoose = require('mongoose');

var authPage = require('./routes/auth.route');

var productPage = require('./routes/product.route');

var UpdateAndOrder = require('./routes/update.route');

var _require = require('./middlewares/add.middleware'),
    UserWebJwt = _require.UserWebJwt;

var middle = require('./middlewares/auth.middleware');

var CookieParser = require('cookie-parser');

var _require2 = require('express-handlebars'),
    engine = _require2.engine;

var _require3 = require('./utils/index.helper'),
    HelperHandlebars = _require3.HelperHandlebars;

var app = express();
dotenv.config();
app.use(express["static"]('public'));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(CookieParser());
app.use(session({
  secret: "flower shop",
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(middle);
app.use(UserWebJwt); //Routes

app.use(productPage);
app.use(authPage);
app.use(UpdateAndOrder);
app.engine('.hbs', engine({
  extname: '.hbs',
  helpers: HelperHandlebars
}));
app.set('view engine', '.hbs');
app.set('views', 'views');
var PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI).then(console.log('connected'));
app.listen(PORT, function () {
  console.log('Server running on port' + PORT);
});