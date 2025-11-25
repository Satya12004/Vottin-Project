const polldata=require('../Modules/PollSchema')
const mongoose = require("mongoose");

const createPoll=async(req,res)=>{
    const {id} =req.user
    
     const { question, options, closingDateTime } = req.body;
    try {
    const polls=await polldata.create({
        question,
        options,
        closingDateTime,
        userId:id
    })
    res.status(200).json({message:"polls created Successfully",polls})
    } catch (error) {
     res.status(500).json({msg:'error in poll creating',error:error.message})
    }
}
const getpoll=async(req,res)=>{
    const {id} =req.user
   
    try {
        const polls= await polldata.find({userId:id})
        res.status(200).json({message:"polls find Successfully",polls})
    } catch (error) {
        res.status(500).json({msg:'error in poll finding',error:error.message})
    }
}

const UpdatePoll=async(req,res)=>{
   const id =req.params.id
   const {question,options, closingDateTime}=req.body
    try {
        const polls= await polldata.findByIdAndUpdate(id,{question, options, closingDateTime},{new:true})
        res.status(200).json({message:"polls update Successfully",polls})
    } catch (error) {
        res.status(500).json({msg:'error in poll updating',error:error.message})
    }
}
const Deletepoll=async(req,res)=>{
   const id =req.params.id

    try {
        const polls= await polldata.findByIdAndDelete(id)
        res.status(200).json({message:"polls Delete Successfully"})
    } catch (error) {
        res.status(500).json({msg:'error in deleting poll',error:error.message})
    }
}

const getAllPolls = async (req, res) => {
  try {
    const polls = await polldata.find();
    res.status(200).json(polls);
  } catch (error) {
    res.status(500).json({ message: "Error fetching polls", error:error.message});
  }
};

const SubmitPoll=async (req,res)=>{
    try {
   if (!req.user || !req.user.id)
      return res.status(401).json({ message: "User not authenticated" });

    const userId = req.user.id;
  
         
    const pollId   = req.params.id  
    const  {optionId}  = req.body;
    
     const poll = await polldata.findById(pollId);
     
    if (!poll) {
      return res.status(404).json({ message: 'Poll not found' });
    }
    const now = new Date();
    if (poll.closingDateTime < now || poll.isClosed) {
      return res.status(400).json({ message: 'Voting is closed for this poll' });
    }
    if (poll.voters && poll.voters.some(vote =>vote.userId && vote.userId.toString() === userId)) {
      return res.status(400).json({ message: 'You have already voted' });
    }
    const option = poll.options.find(option => option._id.toString() == optionId);
    
    if (!option) {
      return res.status(400).json({message: 'Invalid option'});
    }
    option.votes = (option.votes || 0) + 1;
    poll.voters = poll.voters || [];
    poll.voters.push({
  userId: new mongoose.Types.ObjectId(userId),
  optionId: new mongoose.Types.ObjectId(optionId)
    });
    await poll.save();
    return res.json({ message: 'Vote submitted successfully' });
    } catch (error) {
    
    res.status(500).json({message: "Error in votting", error:error.message});  
    }
    
  
}

const getPollResult= async (req, res) => {
  try {
    const pollId = req.params.id;
    const poll = await polldata.findById(pollId);

    if (!poll) return res.status(404).json({ message: "Poll not found" });

    const totalVotes = poll.voters?.length || 0;

    const result = poll.options.map(option => {
      const votes = poll.voters.filter(v => v.optionId.toString() === option._id.toString()).length;
      return {
        option: option.text,
        percent: totalVotes ? ((votes / totalVotes) * 100).toFixed(2) : "0"
      };
    });

    return res.status(200).json({ poll: poll.question, result, msg:"here is your poll result"});
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message:"Error fetching poll result", error: error.message});
  }
};

module.exports={
createPoll,
getpoll,
UpdatePoll,
Deletepoll,
getAllPolls,
SubmitPoll,
getPollResult
}