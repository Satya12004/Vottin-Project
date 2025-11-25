const mongoose = require('mongoose');
const pollSchema=new mongoose.Schema({
      question: { 
        type: String, 
        required: true 
    },
      options: [
    {
      text: { type: String, required:true},
      votes: { type: Number,default:0}
    }
  ],
 closingDateTime: { 
    type: Date, 
    required: true 
},
  isClosed: { 
    type: Boolean, 
    default: false 
},
userId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"user"
},
 voters: [                                       
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      optionId: { type: mongoose.Schema.Types.ObjectId, required: true },
      votedAt: { type: Date, default: Date.now }
    }
  ]
},{ timestamps: true })
module.exports = mongoose.model('vote', pollSchema);