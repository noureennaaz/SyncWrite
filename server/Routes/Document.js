const express= require("express")
const router = express.Router()

const {CreateDoc}= require("../controllers/Doc");
const {loadFiles} = require("../controllers/Dashboard")
const {auth} = require("../Middlewares/Auth")
//  auth middleware -- to be added 
router.post("/create", CreateDoc);
router.post("/loadFiles", loadFiles)
module.exports= router