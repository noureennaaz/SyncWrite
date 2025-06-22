const express= require("express")
const router = express.Router()

const {CreateDoc, showDoc, RenameDoc, SaveDoc, deleteDoc}= require("../controllers/Doc");
const {loadFiles} = require("../controllers/Dashboard")
const {auth, authMiddleware} = require("../Middlewares/Auth")
//  auth middleware -- to be added 
router.post("/create", authMiddleware, CreateDoc);
router.post("/open",authMiddleware, showDoc);
router.post("/renameFile",authMiddleware, RenameDoc)
router.delete("/delete", authMiddleware, deleteDoc)
router.post("/loadFiles",authMiddleware, loadFiles)
router.post("/save",authMiddleware, SaveDoc)
module.exports= router