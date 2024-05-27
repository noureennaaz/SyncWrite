const express= require("express")
const router = express.Router()

const {CreateDoc}= require("../controllers/Doc");
const {auth} = require("../Middlewares/Auth")

router.post("/create",auth, CreateDoc);

module.exports= router