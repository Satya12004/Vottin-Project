const mongoose=require('mongoose');
const userSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true,
        require:true
    },
    email:{
       type:String,
       require:true,
       unique:true,
       lowercase:true,
       pattern: "^(?!.*@gmail\\.com$).*$",
    },
    password:{
        type:String,
        require:true,
    },
    role: {
    type: String,
    enum: ["admin", "user"], 
    default: "user",
    lowercase:true
  }
},{timeseries:true})
module.exports=mongoose.model("user",userSchema)