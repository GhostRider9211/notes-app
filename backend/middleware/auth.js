import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const protect = async (req,res,next)=>{
    const {authoriszation} = req.headers;


    if(!authoriszation|| !authoriszation.startswith("Bearer ")){
        return res.status(401).json({message:"Not authorised,no token "});
    }

    const token = authoriszation.split(" ")[1];

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select("-password");

        if(!req.user){
            return res.status(401).json({message:"User not found"});
        }
        return next();
    } catch (error) {
        console.log("token cerification failed:",error.message);
        return res.status(401).json({message:"Not authorized,token failed"});
    }

}