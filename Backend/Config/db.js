const mongoose=require('mongoose')
require('dotenv').config()
const url=process.env.mongodb_url
console.log(url)
const connectTodb=async ()=>{
    try {
        await mongoose.connect(process.env.mongodb_url)
        
        console.log("mongodb connected successfully")
    } catch (error) {
        console.log({msg:"error in connected to db",error:error.message})
    }
}
module.exports=connectTodb