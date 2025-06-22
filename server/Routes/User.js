const express= require('express')
const router=express.Router()
const { authMiddleware, preventLoggedInAccess } = require('../Middlewares/Auth');
const {login, signup, sendOTP, auth}= require("../controllers/Auth")
const {userdetails} = require("../controllers/Dashboard")
router.post("/signup", signup);
router.post("/login", login);
router.post("/sendOTP", preventLoggedInAccess, sendOTP)
router.get("/checkAuth",auth);
router.post("/userdetails",authMiddleware, userdetails );

router.get('/auth', authMiddleware, (req, res) => {
    res.json({ message: `Welcome User ${req.id}` });
});
module.exports=router