const express=require('express');
// const fs=require('fs');
// const http=require('http')
const app=express();

app.get('/',(req,res)=>{
   return res.send("Hello Express");
});
app.get('/home',(req,res)=>{
    return res.send("This is home page");
})
app.get('/about',(req,res)=>{
    return res.send("I am "+ req.query.name);
})
app.listen(3000,()=>{
    console.log("Server is started at port number 3000");
})