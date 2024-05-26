const mongoose = require("mongoose")

exports.connectToMongo=()=>{
    mongoose.set("strictQuery", false);
    mongoose.connect("mongodb+srv://hiranraj:Hiran2001@cluster0.ia89adu.mongodb.net/Messenger?retryWrites=true&w=majority&appName=Cluster0mongodb+srv://hiranraj:Hiran2001@cluster0.ia89adu.mongodb.net/Messenger?retryWrites=true&w=majority&appName=Cluster0",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
        console.log("Db connected")
        }).catch((err)=>{console.log(`${err},err.message`)});
}
