"use strict";

var _require = require('express'),
    Router = _require.Router;

var router = Router();

var _require2 = require('../controllers/auth.controller'),
    GetLoginPage = _require2.GetLoginPage,
    mainPage = _require2.mainPage,
    postLoginData = _require2.postLoginData,
    RegistrPage = _require2.RegistrPage,
    PostRegistrPage = _require2.PostRegistrPage,
    GetLogout = _require2.GetLogout,
    GetAdminDashboard = _require2.GetAdminDashboard;

var _require3 = require('../middlewares/protect.middleware.js'),
    protectUser = _require3.protectUser;

router.get('/login', protectUser, GetLoginPage);
router.get('/registr', protectUser, RegistrPage);
router.get('/logout', GetLogout);
router.get('/dashboard', GetAdminDashboard);
router.post('/login', postLoginData);
router.post('/registr', PostRegistrPage);
router.get('/', mainPage);
module.exports = router;