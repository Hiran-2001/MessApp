const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const app = express();
const cors =require("cors");
const {connectToMongo} = require("./config/conn");
const port = process.env.PORT || 4000
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");
connectToMongo()
app.use(cors())
app.use(express.json())

app.use('/user',userRoutes)
app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`server started at ${port}`);
})