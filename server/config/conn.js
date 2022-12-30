const mongoose = require("mongoose")

exports.connectToMongo=()=>{
    mongoose.set("strictQuery", false);
    mongoose.connect("mongodb+srv://Hiran:Hiran@2001@cluster0.e7euu.mongodb.net/customer_mangement?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        console.log("Db connceted suffuly")
        }).catch((err)=>{console.log(`${err},err.message`)});
}
