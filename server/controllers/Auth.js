const User = require("../models/User");
const OTPModel = require("../models/OTPModel");
const bcrypt = require("bcrypt");
const otpgenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const SendMail = require("../utils/SendMail");
require("dotenv").config();

exports.auth= (req, res)=>{
  try{
    
      const token=req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "") || "";
      console.log("from cookies:",req.cookies.token)
      if(!token || token ===""){
          return res.status(200).json({
              success:true,
              login:false,
              message: "Not loggedin",
              id:""
          })
      }
      else{
        try{
          
          const decode=jwt.verify(token, process.env.JWT_SECRET);
          
          console.log(decode);

          return res.status(200).json({
            success:true,
            login:true,
            id:decode.id,
            message: "User already loggedIn"
        })
          
      }
      catch(err){
          return res.status(200).json({
              success:true,
              login:false,
              message:"Token invalid",
              id:"",
          })
      }


      }
      

  } catch(err){
      return res.status(200).json({
          success:true,
          message: "Problem occured in fetching user state",
          id:""
      })

  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details",
      });
    }

    var user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found, try signing in first",
      });
    }
    
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        success: false,
        message: "Wrong Password",
      });
    }
    const payload = {
      email: user.email,
      id: user._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
    });
    
    user = user.toObject();
    user.token = token;
    user.password = undefined;
    console.log(user)
    res
      .cookie("token", token, {
        expire: new Date(Date.now() + 1000 * 3 * 24 * 60 * 60),
        httpOnly: true,
      })
      .status(200)
      .json({
        success: true,
        message: "Successfully logged in",
        token,
        user,
      });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: "Login Failed, try again",
    });
  }
};


exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
   
    var otp = otpgenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const OTPdata = await OTPModel.create({
      email,
      otp,
      createdAt:Date.now(),
    });
    
    try {
        
        const subject='Verify your email'
        const messageText=`The OTP for yor mail verification is ${otp} `
        await SendMail(email , subject,messageText )
        console.log("mail Sent");

      } catch ( err ){

        console.error(err);
        return res.status(200).json({
          success: false,
          message: "Error in Sending email",
        });
      }

    return res.status(200).json({
      success: true,
      message: "OTP Generated",
    });
  } catch (err) {
    console.error(err);
    return res.status(200).json({
      success: false,
      message: "OTP cannot be generated, try again",
    });
  }
};


exports.signup = async (req, res) => {
  try {
    const {
      fname,
      lname,
      email,
      password,
      confirmPassword,
      otp,
    } = req.body;

    if (
      !fname ||
      !lname ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords does not match",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const lastOtp = await OTPModel.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);
     
    
    if (lastOtp.length == 0) {
      return res.status(400).json({
        success: false,
        message: "No Otp Found",
      });
    }
    console.log(lastOtp);
    if (lastOtp.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Enter the recent OTP",
      });
    }
    
    const hashedPassword =await bcrypt.hash(password, 10);
    console.log(hashedPassword)
    if(!hashedPassword){
      return res.status(400).json({
        success: false,
        message: "Error in hashing password",
      });
    }
    const imgUrl=`https://api.dicebear.com/7.x/initials/svg/seed=${fname} ${lname}`
    
    const newUser = await User.create({
      fname,
      lname,
      email,
      password: hashedPassword,
      image: imgUrl,
    });
    console.log(lastOtp)
    if(!newUser){
      return res.status(400).json({
        success: false,
        message: "User cannot be registered in DB",
      });
    }
    

    return res.status(200).json({
      success: true,
      message: "User registration Successful",
    });

  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "User cannot be registered. Try again",
    });
  }
};




