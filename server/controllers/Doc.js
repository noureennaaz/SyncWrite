const Users = require("../models/User");
const Files = require("../models/Files");
// import { useAuth } from "../middlewares/Auth"
exports.CreateDoc = async (req, res) => {
 
  try {  
    
    const {title  , isPublic , id} = req.body;
    
    if(!id){
      return res.status(404).json({
        success: false,
        message:"failed to fetch id for doc creation"
      })
    }
    
    console.log('initiated creation')

    var Doctitle="";
    var PublicAccess= false;
    if(!title){
      Doctitle= require('crypto').randomBytes(8).toString('hex');
    }
    else{
      Doctitle= title;
    }
     
    console.log(id)
    
    if(isPublic){
      PublicAccess=true;
    }
    const newDoc = await Files.create({
        Owner:id,
        CreatedBy:id,
        Title:title,
        Body:"",
        isPublic:PublicAccess,
        lastUpdatedAt:Date.now()
    })
    if(!newDoc){
        return res.status(400).json({
            success: false,
            message: "Problem occured while creating the document",
          });
    }
    return res.status(200).json({
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

exports.showDoc = async (req, res) => {

  try{
    const {docid} = req.body;
    
    if(!docid) {
      return res.status(300).json({
        success: false,
        message: "DocumentId not obtained"
      })
    }
    console.log("Doc id is :", docid)
    const doc = await Files.findById(docid);
    console.log("Doc is :", doc)
    if(!doc){
      return res.status(400).json({
        success:false,
        message:"File not found"
      })
    }
    
    console.log("file obtained :", doc)
    return res.status(200).json({
      success:true,
      message :"File obtained",
      data:doc

    })
  } catch{
    return res.status(500).json({
      success:false,
      message:"problem occured while loading file"
    })

  }

}