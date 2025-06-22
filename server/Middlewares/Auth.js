const jwt=require("jsonwebtoken")
require("dotenv").config()

exports.authMiddleware= (req, res, next)=>{
    try{
        
        console.log("cookie from req :" , req.cookies);

        const token=req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
        console.log(token , ": token obtained")
        if(!token){
            return res.status(403).json({
                success:false,
                message: "Token not found"
            })
        }
        
        try{
            console.log("trying the decode:")
            const decode=jwt.verify(token, process.env.JWT_SECRET);
            req.user=decode;
            console.log("DEcode id is", decode.id);
            req.id=decode.id
            console.log("the decode:",req.id);
            next();
        }
        catch(err){
            console.log("Token found to be invalid ....")
            return res.status(401).json({
                success:false,
                message:"Invalid Token"
            })
        }

    } catch(err){
        console.log("token not found")
        return res.status(401).json({
            success:false,
            message: "Token not found"
        })

    }
    
};

exports.preventLoggedInAccess = (req, res, next) => {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
  
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Entered the verification of already logged in")
        console.log("And your're already loggedin", decoded)
        return res.status(403).json({
          success: false,
          user:decoded,
          message: "Already logged in.",
        });
      } catch (err) {
        next(); // Token is invalid, allow access
      }
    } else {
      next(); // No token, allow access
    }
  };

