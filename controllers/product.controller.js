const Product = require('../models/model.product.js')

// GET
// Route /add
//Desc open get page

const getAddPage = (req,res,next)=>{
    res.render('add',{
        title:'Add product',
        isProductError:req.flash('isProductError')
    })
}
// POST
// Route /add-product
//Desc open get page
const AddProductData = async (req,res,next)=>{
   const {title,description,image,number}= req.body  

   if(!title||!description||!image||!number){
    req.flash('isProductError','You should fill in the blanks')
    res.redirect('/add')
    return
   }
   // Create Product part
   const inputProduct = {
    title,
    description,
    image,
    number
   }
   
   console.log(req.userId)
    await Product.create({...inputProduct,user:req.userId}) 
    res.redirect('/')
}
// GET
// Route /products
// Open all products page
const ProductsPage = async (req,res,next)=>{
   const user = req.userId ? req.userId.toString() : null
   const myproducts = await Product.find({user}).populate('user').lean()  
    res.render('products',{
        title:'Products',
        isProducts:true,
        myproducts:myproducts,
    })
}

// GET
// Route /about
// shows about product

const AboutForProduct = async (req,res,next)=>{
    const id=req.params.id
    const aboutProduct = await Product.findById(id).populate('user').lean()
    
    res.render('about',{
        title:'About for products',
        aboutProduct:aboutProduct,
    })
}

const AddComment = async (req,res,next)=>{
 const id = req.params.id
 console.log(req.body)
 res.redirect('/add-comment',)

}

module.exports = {
    getAddPage,
    AddProductData,
    ProductsPage,
    AboutForProduct,
    AddComment
}