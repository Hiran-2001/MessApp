const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const app = express();
const cors =require("cors");
const {connectToMongo} = require("./config/conn");
const port = process.env.PORT
app.listen(port,()=>{
    console.log(`server started at ${port}`);
})
connectToMongo()
app.use(cors())

const data = [{
    name:"Hiran",
    age:20
},{
    name:"sreekutty",
    age:21
}]

app.get('/user',(req,res)=>{
    res.send(data)
    
})