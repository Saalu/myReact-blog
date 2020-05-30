const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength: 50
    },
    email: {
        type:String,
        trim:true,
        unique:1
    },
    password: {
        type:String,
        minlength: 5
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    role: {
        type:Number,
        default:0
    },
    
    token: {
        type:String,
    },
    
    tokenExp: {
        type:Number,
    }
    

})




module.exports = User = mongoose.model('user', UserSchema)