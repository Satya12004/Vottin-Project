const express=require('express');
const { UserCreate,getUser} = require('../Controller/UserController');
const Checktoken = require('../Middleware/Json');
const userRouter=express.Router();


userRouter.post('/create',UserCreate)
userRouter.post('/get',getUser)


module.exports=userRouter