const jwt = require('jsonwebtoken')

const generateJWTtoken = userId=>{
    const accesToken = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'1d'})

    return accesToken
}

module.exports={generateJWTtoken}