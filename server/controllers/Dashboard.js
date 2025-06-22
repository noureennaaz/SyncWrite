const Users= require("../models/User");
const File= require("../models/Files")
exports.userdetails = async (req, res) => {
    try{


        const id = req.body.id;
        const info = await Users.findById(id)
        // .populate({
        //     path:"CreatedFiles"
        // })
        // .populate({
        //     path:"SharedFiles"
        // })
        // .populate({
        //     path:"viewOnlyFiles"
        // });
     
        if(!info){
           
            return res.status(400).json({
                success:false, 
                message:"No info found"
            })
        }
        return res.status(200).json({
            success:false, 
            message:"fetch successful",
            data:info
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success:false, 
            message:"Problem occured while fetching the dashboard info"
        })
    }
}

exports.loadFiles= async (req, res) =>{

    try{
        const id = req.body.id;
        const files = await File.find({ CreatedBy: id }, 'Title lastUpdatedAt').sort({ lastUpdatedAt: -1 });
        
        const filesWithSizes = files.map(doc => {
            const docObject = doc.toObject(); // Convert Mongoose document to plain object
            const docSize =require('mongodb').BSON.calculateObjectSize(docObject);
            return {
                _id: doc._id,
                Title: doc.Title,
                lastUpdatedAt: doc.lastUpdatedAt,
                size: docSize
            };
        });
        console.log("size : ",filesWithSizes)
        if(!files || !filesWithSizes){
           
            return res.status(400).json({
                success:false, 
                message:"No info found"
            })
        }
        return res.status(200).json({
            success:true, 
            message:"fetch successful",
            data:filesWithSizes
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success:false, 
            message:"Problem occured while fetching the user documents info"
        })
    }
}