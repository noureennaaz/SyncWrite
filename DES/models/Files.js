const mongoose= require('mongoose')

const FileModel =mongoose.Schema(
    {
        Owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        Title:{
            type:String,
            default:'Untitled',
            required:true,
            trim:true  
        },
        Body:{
            type:String,
        },
        SharedTo:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        }],
        ViewWrites:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
           
        }],
        editWrites:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        }]
    }
)

module.exports=mongoose.model("File", FileModel);