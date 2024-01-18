const Product = require('../models/model.product')
const Order = require('../models/model.order')
//Desc : Edit product page
//Route: /update/:id
//method GET

const UpdateProductPage = async (req,res,next)=>{
const id = req.params.id
const Editproduct = await Product.findById(id).populate('user').lean()
res.render('update',{
    title:'Update',
    Editproduct:Editproduct,
    UpdateError:req.flash('UpdateError')
})
}

//Desc : Edit product data
//Route: /update/:id
//method POST

const UpdateProductData = async (req,res,next)=>{
   const {title,description,number} = req.body
   const id = req.params.id
   if(!title||!description||!number){
    req.flash('UpdateError','You should fill in the blanks')
    res.redirect(`/update/${id}`)
    return
   }  
   await Product.findByIdAndUpdate(id,req.body,{new:true})
   res.redirect('/products')
}

//Desc : Delete product
//Route: //delete-product
//method POST

const DeleteProduct = async (req,res,next)=>{
    const id = req.params.id
    await Product.findByIdAndDelete(id)
    res.redirect('/')
}

// Desc : Open order page 
// Route: /order
// method GET

const GetOrderPage = (req,res,next)=>{
    res.render('order',{
        title:'Order-page',
        orderError:req.flash('orderError')
    })
}

// Desc: Take order data from form table
// Route : /orders-data
// Method : POST

const GetOrderOptions = async (req,res,next)=>{
    const {firstname,lastname,email,country,state,phonenumber} = req.body
    const inputOrder=req.body
    if(!firstname||!lastname||!email||!country||!state||!phonenumber){
        req.flash('orderError','Error: All filers are required')
        res.redirect('/order')
        return
    }
     await Order.create({...inputOrder,product:req.userId})
    
    res.redirect('/')
}

module.exports = {
    UpdateProductPage,
    UpdateProductData,
    DeleteProduct,
    GetOrderPage,
    GetOrderOptions
}

