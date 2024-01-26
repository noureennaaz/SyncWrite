const jwt=require("jsonwebtoken")
require("dotenv").config()

exports.auth= (req, res, next)=>{
    try{
        
        const token=req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ", "");
        if(!token){
            return res.status(401).json({
                success:false,
                message: "Token not found"
            })
        }
        
        try{
            const decode=jwt.verify(token, process.env.JWT_SECRET);
            req.user=decode;
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:"Invalid Token"
            })
        }

    } catch(err){
        return res.status(401).json({
            success:false,
            message: "Token not found"
        })

    }
    next();
}

