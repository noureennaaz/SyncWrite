const express= require('express')
const router=express.Router()

const {login, signup, sendOTP, auth}= require("../controllers/Auth")
const {loadDashboard} = require("../controllers/Dashboard")
router.post("/signup", signup);
router.post("/login",login);
router.post("/sendOTP", sendOTP)
router.post("/",auth);
router.post("/dashboard", loadDashboard );
module.exports=router