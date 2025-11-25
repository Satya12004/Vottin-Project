const express=require('express');
const checkAdmin=require('../Middleware/CheckAdmin')
const Checktoken = require('../Middleware/Json');
const { createPoll,getpoll, UpdatePoll, Deletepoll, getAllPolls, SubmitPoll,getPollResult} = require('../Controller/PollController');
const pollRouter=express.Router();

pollRouter.post('/create',Checktoken,checkAdmin,createPoll)
pollRouter.get('/get',Checktoken,checkAdmin,getpoll)
pollRouter.put('/update/:id',Checktoken,checkAdmin,UpdatePoll)
pollRouter.delete('/delete/:id',Checktoken,checkAdmin,Deletepoll)
pollRouter.get('/getAllpoll',getAllPolls)
pollRouter.post('/SubmitPoll/:id',Checktoken,SubmitPoll)
pollRouter.get('/result/:id',getPollResult)

module.exports=pollRouter