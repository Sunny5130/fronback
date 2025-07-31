const express=require("express");
const app=express();
const port =3000;
app.get("/",(req,res)=>{
    res.end("Hello server");
})

app.listen(port,()=>{
    console.log(`Server is running in port no: ${port}`);
})
