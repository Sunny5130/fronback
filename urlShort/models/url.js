const mongoose=require("mongoose");

const UrlSchema= new mongoose.Schema({
    shortId:{
        type:String,
        require:true,
        unique:true
    },
    redirectId:{
        type:String,
        require:true
    },
    visitHistory:[{ timestamp:{type:Number}}]
},{timestamps:true});

const URL=mongoose.model("URL", UrlSchema);
module.exports(URL);