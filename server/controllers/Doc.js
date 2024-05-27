const Users = require("../models/User");
const Files = require("../models/Files")
exports.CreateDoc = async (req, res) => {
  console.log(req.body);
  try {
    
    const {id , title  , isPublic} = req.body;
  
    if(!title){
        title= require('crypto').randomBytes(8).toString('hex');
    }
    
    if(!isPublic){
        isPublic=false;
    }
    const newDoc = await Files.create({
        CreatedBy:id,
        Title:title,
        Body:"",
        isPublic
    })
    if(!newDoc){
        return res.status(400).json({
            success: false,
            message: "Problem occured while creating the document",
          });
    }
    return res.status(400).json({
        success: true,
        message: "Document created Successfully",
        newDoc
      });

    
  } catch (err) {

    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Problem in creating Document",
    });
  }
  
};
