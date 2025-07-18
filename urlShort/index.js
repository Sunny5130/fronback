const fs=require('fs');
const express=require('express');

const app=express();
app.get("/",(req,res)=>{
    res.send("Hello Everyone");
});

Port=3000;
app.listen(Port,()=>{
    console.log("Server started at port: ",`${Port}`);
});