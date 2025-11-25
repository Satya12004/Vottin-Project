var jwt = require('jsonwebtoken');
const JWT_SECRET = 'mySecret@123'
const UserData= require('../Modules/UserSchema')


async function Checktoken(req,res,next) {
    let token =req.cookies.token||req.headers.authorization
    try {
        var decoded = await jwt.verify(token, JWT_SECRET);
        let user= await UserData.findById(decoded._id);
        req.user=user;
        next()
    } catch (error) {
        return res.status(401).json({message:"unauthorized",error:error.message})
    }
}
module.exports=Checktoken