const jwt = require("jsonwebtoken")
const jwtPassword = "secret"

function authentication(req,res,next){
    const token = req.headers["authorization"].split(" ")[1];

    if(!token){
        return res.status(400).json({
            error : "Unauthorized"
        })
    }

    try{
        const decode = jwt.verify(token,jwtPassword);
        req.user = decode;
        next();
    }catch(err){
        return res.status(400).json({
            error : "Invalid token"
        })
    }
}

module.exports = {
    authentication
}