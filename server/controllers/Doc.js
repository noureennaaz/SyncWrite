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

exports.RenameDoc = async (req, res) => {
  try {

    console.log("recieved at server :::::::::",req.body)
    const { id, title, userId } = req.body;

    

    if (!id || !title || !userId) {
      return res.status(400).json({
        success: false,
        message: "Document ID, new title, and user ID are required.",
      });
    }

    // Find the document
    const document = await Files.findById(id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found.",
      });
    }

    // Check if the user is authorized to rename the document
    const isOwner = document.CreatedBy.toString() === userId;
    const hasEditRights = document.EditWrites.some(
      (editorId) => editorId.toString() === userId
    );

    if (!isOwner && !hasEditRights) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to rename this document.",
      });
    }

    // Update the document title
    document.Title = title;
    document.lastUpdatedAt = Date.now();

    const updatedDoc = await document.save();

    return res.status(200).json({
      success: true,
      message: "Document renamed successfully.",
      updatedDoc,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error renaming document.",
    });
  }
};


exports.SaveDoc = async (req, res) => {
  try {
    // Extracting user ID from auth middleware
    const userId = req.id || req.user?.id;

    // Extract data from request body
    const { id, html } = req.body;

    // Validation: Check if ID and HTML content are provided
    if (!id || !html) {
      return res.status(400).json({
        success: false,
        message: "Document ID and content are required.",
      });
    }

    // Check if the document exists
    const document = await File.findById(id);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found.",
      });
    }

    // Verify ownership (Optional, for security)
    if (document.user.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this document.",
      });
    }

    // Update the document with new content
    try {
      const updatedDoc = await File.findByIdAndUpdate(
        id,
        { Body: html, lastUpdatedAt: new Date() },
        { new: true }  // Return the updated document
      );

      return res.status(200).json({
        success: true,
        message: "Document updated successfully.",
        data: updatedDoc,
      });
    } catch (err) {
      console.error("Error updating document:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to update the document.",
      });
    }

  } catch (err) {
    console.error("Error in SaveDoc:", err);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred.",
    });
  }
};


exports.deleteDoc = async (req, res) => {
  try {
    // console.log("Received delete request :::::::::", req.body);
    const { id, userId } = req.body;

    if (!id || !userId) {
      return res.status(400).json({
        success: false,
        message: "Document ID and user ID are required.",
      });
    }

    // Find the document
    const document = await Files.findById(id);
    
    console.log(document)
    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found.",
      });
    }

    // Check if the user is authorized to delete the document
    const isOwner = document.CreatedBy.toString() === userId;

    if (!isOwner) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to delete this document.",
      });
    }

    // Delete the document
    await Files.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Document deleted successfully.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error deleting document.",
    });
  }
};
