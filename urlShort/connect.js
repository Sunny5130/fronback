const mongoose=require('mongoose');
async function connecttoMongodb(url){
    return mongoose.connect(url);
}
module.exports={
    connecttoMongodb,
}