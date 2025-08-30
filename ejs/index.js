
const express=require("express");
const app=express();
//-----------------------------ejs file connect  ejs means html+js code combine write karna------------------------//
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');

app.get("/",(req,res)=>{
    res.render("index");
});
//--------------Dynamic routing---------------------//
app.get("/users/:name",(req,res)=>{
    res.send(`welcome ${req.params.name}`);
})
app.get("/user/:name/:age",(req,res)=>{
    res.send(`welcome ${req.params.name} your age is ${req.params.age}`);
})
app.listen(3000,()=>{
    console.log("server is running in port no: 3000");
});

