const express= require('express')
const router=express.Router()

const {login, signup, sendOTP}= require("../controllers/Auth")

router.post("/signup", signup);
router.post("/login",login);
router.post("/sendOTP", sendOTP)


module.exports=router