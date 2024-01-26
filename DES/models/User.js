const mongoose= require('mongoose')

const UserSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true
    },
    lname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    image:{
        type:String
    },
    CreatedFiles:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'File'
        
    }],
    SharedFiles:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'File'
    }],
    viewOnlyFiles:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'File'
    }]
})

module.exports= mongoose.model("User", UserSchema)