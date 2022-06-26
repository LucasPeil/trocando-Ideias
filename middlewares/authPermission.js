const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authPermission = async (req,res,next)=>{
    const authHeader = req.header["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) return res.status(401).json({error: ["Acesso negado!"]});

    //check if token is valid
    try{
        let verified = jwt.verify(token, jwtSecret);
        req.user = await User.findById(verified.id).select("-password")
        next()

    }catch(e){
        res.status(400).json({errors:["O token é inválido!"]});

    }
}

module.exports = authPermission;