const express =require('express')
const port=8090
const app= express();
const cors=require('cors')
const connectDb=require("./Config/db")
const userRouter=require("./Router/UserRouter")
const userPol=require("./Router/pollRouter")
var cookieParser = require('cookie-parser');

require('dotenv').config()

app.use(cookieParser())
connectDb()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello from satya');
});


app.use("/user",userRouter)
app.use("/poll",userPol)

app.listen(port,()=>{
    console.log(`server is running on live`)
})