const UserData= require('../Modules/UserSchema')
var jwt = require('jsonwebtoken');
const JWT_SECRET = 'mySecret@123'
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const UserCreate= async(req,res)=>{
    try {
        const{name,email,role,password}=req.body;
        const hash = bcrypt.hashSync(password, salt);
        const user= await UserData.create({
        
            name,
            email,
            role,
            password:hash
        })
        res.status(200).json({message:"User data created Successfully"})
    } catch (error) {
       res.status(500).json({error:error.message}) 
    }
}
const getUser= async(req,res)=>{
    try {
        const{email,password}=req.body;
        const user= await UserData.findOne({email})
        if(user){
            let comparePassword=bcrypt.compareSync(password,user.password)
            if(comparePassword){
                let token = jwt.sign({_id:user._id}, JWT_SECRET)
                res.cookie('token',token)
                res.status(200).json({message:"User data find sucessfully",user,token})
            }
        }else{
         res.status(400).json({message:"User data not find"})
        }
        
    } catch (error) {
       res.status(500).json({error:error.message}) 
    }
}






module.exports={
    UserCreate,
    getUser,
 
}