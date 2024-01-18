const {Router} = require('express')

const {getAddPage,
    AddProductData,
    ProductsPage,
    AboutForProduct,
    AddComment
} = require('../controllers/product.controller.js')

const router = Router()

const {NotAddProduct,UserWebJwt} =  require('../middlewares/add.middleware')

router.get('/add', NotAddProduct,getAddPage)
router.get('/products', ProductsPage)
router.get('/about/:id',AboutForProduct)
router.post('/add-product',UserWebJwt,AddProductData)
router.post('/add-comment/:id',AddComment)

module.exports = router
