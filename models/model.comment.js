const {Schema,model} = require('mongoose')

const CommentSchema = new Schema ({
   comment:{
    type:String,
    required:true
   },
   email:{
    type:String,
    required:true
   },
   user:{type:Schema.Types.ObjectId, ref:'User'
    } 
},{timestamps:true})

const Comment = model('Comment',CommentSchema)

module.exports = Comment