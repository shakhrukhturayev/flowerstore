const User = require('../models/model.auth')
const Product = require('../models/model.product')
const bcrypt = require('bcrypt')

const{generateJWTtoken} = require('../services/token.service')

// GEt
// take login page(/login)
//desc open login page
const GetLoginPage = async (req,res)=>{
  
    res.render('login',{
        title:'Login',
        isLogin:true,
        loginError:req.flash('loginError')
    })
}

//GET
// Take a registr page(/registr)
// Private
const RegistrPage = (req,res)=>{
   
    res.render('registr',{
        title:'Registr',
        isRegistr:true,
        registrError:req.flash('registrError'),
    })
}

//POST
// Take a data from registr page(/registr)
// PUBLIC
const PostRegistrPage = async (req,res)=>{
   const {email,password,firstname,lastname} = req.body
   if(!email||!password||!firstname||!lastname){
    req.flash('registrError','All filers required')
    res.redirect('/registr')
    return
   }

   const hasUser = await User.findOne({email})
   if(hasUser){
    req.flash('registrError','User already has')
    res.redirect('/registr')
    return
   }

    const hashed = await bcrypt.hash(password,10)     
    const registrData = {
    firstname:firstname,
    lastname:lastname,
    email:email,
    password:hashed
   }
   const authuser = await User.create(registrData)
   const token = generateJWTtoken(authuser._id)
   res.cookie('token',token,{httpOnly:true, secure:true})
   res.redirect('/')
}

// POST
// take login page data
// Public
const postLoginData = async (req,res)=>{
    const {email,password} = req.body
    
    if(!email||!password){
        req.flash('loginError','All files required')
        res.redirect('/login')
        return
    }

    const exsitUser = await User.findOne({email})
    if(!exsitUser)
    { 
    req.flash('loginError','User not found try again')
    res.redirect('/login')
    return    
    }
    const isPassEquual = await bcrypt.compare(password, exsitUser.password)
    if(!isPassEquual)
    { 
    req.flash('loginError','Password is not correct')
    res.redirect('/login')
    return  
    }
    const token = generateJWTtoken(exsitUser._id)
    res.cookie('token',token,{httpOnly:true, secure:true})
    res.redirect('/dashboard') // dashboard ga yo'naltirildi
}

//GET
// /dashboard admin page data
// public 

const GetAdminDashboard= async (req,res,next)=>{
    const user = req.userId ? req.userId.toString() : null
    const adminAvatar = await User.findById(user) // Product.find({user}).populate('user')  
    res.render('dashboard',{
        title:'Admin-dashboard',
        adminAvatar:adminAvatar
        
    })
}

// GET
// Route /logout
// Public
const GetLogout = (req,res)=>{
res.clearCookie('token')
res.redirect('/')
}

// GET
// take main page
// Public
const mainPage = async (req,res)=>{
    const products = await Product.find().lean()
    const useravatar = req.userId ? req.userId.toString() : null    
    const mainAdminAvatar = await User.find({useravatar})
    res.render('main',{
        title:'Flower shop',
        products:products.reverse(),
        userId:req.userId ? req.userId.toString() :null,
        mainAdminAvatar:mainAdminAvatar        
    })
}
module.exports = {
    GetLoginPage,
    mainPage,
    postLoginData,
    RegistrPage,
    PostRegistrPage,
    GetLogout,
    GetAdminDashboard
} 