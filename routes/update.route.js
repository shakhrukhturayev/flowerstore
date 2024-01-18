const {Router} = require('express')
const router = Router()
const {UpdateProductPage,
    UpdateProductData,
    DeleteProduct,
    GetOrderPage,
    GetOrderOptions
} = require('../controllers/update.controller')

const {NotAddProduct} = require('../middlewares/add.middleware')


router.get('/update/:id',UpdateProductPage)
router.get('/order', NotAddProduct,GetOrderPage)
router.post('/orders-data',GetOrderOptions)
router.post('/update-product/:id',UpdateProductData)
router.post('/delete-product/:id',DeleteProduct)


module.exports= router