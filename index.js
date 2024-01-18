const express =  require('express')
const dotenv = require('dotenv')
const flash = require('connect-flash')
const session = require('express-session')
const mongoose = require('mongoose')
const authPage = require('./routes/auth.route')
const productPage = require('./routes/product.route')
const UpdateAndOrder = require('./routes/update.route')
const {UserWebJwt} = require('./middlewares/add.middleware')
const middle = require('./middlewares/auth.middleware')
const CookieParser = require('cookie-parser')
const {engine} = require('express-handlebars')
const {HelperHandlebars} = require('./utils/index.helper')

const app = express()

dotenv.config()

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(CookieParser())
app.use(session({secret:"flower shop",resave:false,saveUninitialized:false}))
app.use(flash())

app.use(middle)
app.use(UserWebJwt)

//Routes
app.use(productPage)
app.use(authPage)
app.use(UpdateAndOrder)



app.engine('.hbs',engine({extname:'.hbs',helpers:HelperHandlebars}))
app.set('view engine','.hbs')
app.set('views','views')


const PORT = process.env.PORT || 4000

mongoose.connect( process.env.MONGO_URI).then(console.log('connected'))

app.listen(PORT,()=>{
    console.log('Server running on port'  + PORT)
})