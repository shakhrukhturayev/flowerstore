const {Router} = require('express')
const router = Router()
const {
    GetLoginPage,
    mainPage,
    postLoginData,
    RegistrPage,
    PostRegistrPage,
    GetLogout,
    GetAdminDashboard,
    
} = require('../controllers/auth.controller')

const {protectUser} = require('../middlewares/protect.middleware.js')

router.get('/login', protectUser,GetLoginPage)
router.get('/registr',protectUser,RegistrPage)
router.get('/logout',GetLogout)
router.get('/dashboard',GetAdminDashboard)
router.post('/login',postLoginData)
router.post('/registr',PostRegistrPage)
router.get('/',mainPage)

module.exports = router