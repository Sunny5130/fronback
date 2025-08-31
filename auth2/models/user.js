const mongoose=require("mongoose");
mongoose.connect(`mongodb://localhost:27017/auth`).then(()=>{
    console.log("mongodb connected");
});

const userSchema=mongoose.Schema({
    username:String,
    email:String,
    password:String,
    age:Number
});
const User=mongoose.model("User",userSchema);
module.exports=User;