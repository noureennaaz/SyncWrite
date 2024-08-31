const Users= require("../models/User");
const File= require("../models/Files")
exports.loadDashboard = async (req, res) => {
    try{

        console.log(req.body);

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
        console.log("the info is :");
        console.log(info);
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
        console.log(id)
        const files = await File.find({ CreatedBy: id }, 'Title lastUpdatedAt');

        console.log(files, ": files");
        console.log("the info is :");
        console.log(files);
        if(!files){
           
            return res.status(400).json({
                success:false, 
                message:"No info found"
            })
        }
        return res.status(200).json({
            success:false, 
            message:"fetch successful",
            data:files
        })

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success:false, 
            message:"Problem occured while fetching the user documents info"
        })
    }
}