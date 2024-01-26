const mongoose=require('mongoose')
const SendMail = require('../utils/SendMail')

const OTPModel=mongoose.Schema({

    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires: Date.now()+1000*60*60
    }

})

module.exports=mongoose.model('OTPModel', OTPModel)