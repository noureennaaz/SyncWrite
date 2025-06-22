const User = require("../models/User");
const OTPModel = require("../models/OTPModel");
const bcrypt = require("bcrypt");
const otpgenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const SendMail = require("../utils/SendMail");
require("dotenv").config();

exports.auth = (req, res) => {
  try {
    console.log("Entered auth:");

    // Extract token from cookies, body, or header
    const token = req.cookies.token || req.body.token || req.header("Authorization")?.replace("Bearer ", "");

    console.log("Token from cookies:", req.cookies.token);

    // If no token is found
    if (!token) {
      return res.status(401).json({
        success: false,
        login: false,
        message: "Not logged in",
        id: ""
      });
    }

    // If token is found, verify it
    try {
      console.log("Moving to decode");

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("ID decoded from token:", decoded);

      return res.status(200).json({
        success: true,
        login: true,
        id: decoded.id,
        message: "User already logged in"
      });

    } catch (err) {
      // Handle invalid token
      return res.status(401).json({
        success: false,
        login: false,
        message: "Invalid token",
        id: ""
      });
    }

  } catch (err) {
    // Handle other errors
    return res.status(500).json({
      success: false,
      message: "Problem occurred in fetching user state",
      id: ""
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email , password)
    if (!email || !password) {
      
      return res.status(400).json({
        success: false,
        message: "Please fill all the details",
      });
    }


    const Existingtoken = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
      
    if (Existingtoken) {
      try {
        const decoded = jwt.verify(Existingtoken, process.env.JWT_SECRET);
        console.log("Entered the verification of already logged in")
        console.log("And your're already loggedin", decoded)
        return res.status(200).json({
          success: true,
          user:decoded,
          message: "Already logged in",
        });
      } catch (err) {}
    } 

    var user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found, try sign up",
      });
    }
    
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Credentials",
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
    console.log("login controller data : " , user)
    res
      .cookie("token", token, {
        expires: new Date(Date.now() + 1000 * 3 * 24 * 60 * 60),
        httpOnly: true,
      })
      .status(200)
      .json({
        success: true,
        message: "Login Successful!",
        token,
        user,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Login Failed, try again",
    });
  }
};


exports.sendOTP = async (req, res) => {
  try {
     
    const {
      fname,
      lname,
      email,
      password,
      confirmPassword,
    } = req.body;

    if (
      !fname ||
      !lname ||
      !email ||
      !password ||
      !confirmPassword 
    ) {
      return res.status(200).json({
        success: false,
        message: "Please fill all the details",
      });
    }
    if (password !== confirmPassword) {
      return res.status(200).json({
        success: false,
        message: "Passwords does not match",
      });
    }
   
   
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: "Email is already in use",
      });
    }
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




