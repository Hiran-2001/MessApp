const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const app = express();
const cors =require("cors");
const {connectToMongo} = require("./config/conn");
const port = process.env.PORT || 4000
const userRoutes = require("./routes/userRoutes")
connectToMongo()
app.use(cors())
app.use(express.json())

app.use('/user',userRoutes)

app.listen(port,()=>{
    console.log(`server started at ${port}`);
})