const Users= require("../models/User");

exports.loadDashboard = async (req, res) => {
    try{

        console.log(req.body);

        const id = req.body.id;
        const info = await Users.findById(id).populate({
            path:"CreatedFiles"
        })
        .populate({
            path:"SharedFiles"
        })
        .populate({
            path:"viewOnlyFiles"
        });
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