const mongoose= require('mongoose')

const FileModel =mongoose.Schema(
    {
        Owners:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        }],
        Title:{
            type:String,
            default:'Untitled',
            required:true,
            trim:true  
        },
        Body:{
            type:String,
        },
        CreatedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        },
        isPublic:{
            type:Boolean,
            required:true
        },
        CreatedAt:{
            type:Date,
            required:true,
            default:Date.now()
        },
        lastUpdatedAt:{
            type:Date, 
            required:true
        },
        EditWrites:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        }],
        ViewWrites:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
           
        }],
    }
)

module.exports=mongoose.model("File", FileModel);