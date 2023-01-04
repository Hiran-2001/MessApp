const mongoose = require("mongoose")

exports.connectToMongo=()=>{
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        console.log("Db connected")
        }).catch((err)=>{console.log(`${err},err.message`)});
}
