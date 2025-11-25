const mongoose=require('mongoose')
const connectTodb=async ()=>{
    try {
        await mongoose.connect('mongodb://0.0.0.0/Poll')
        console.log("mongodb connected successfully")
    } catch (error) {
        console.log("error in connected to db")
    }
}
module.exports=connectTodb