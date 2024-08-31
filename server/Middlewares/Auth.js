const jwt=require("jsonwebtoken")
require("dotenv").config()

exports.auth= (req, res, next)=>{
    try{
        
        console.log(req.cookies);
        
        
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
    
}

