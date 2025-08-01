const express=require("express");
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');


require('dotenv').config();
require('./models/db.js');
const Authrouter=require('./routers/Authrouter');

// app.use(bodyParser.json());
app.use(cors());
app.use(express.json()); 


app.use("/auth",Authrouter);

const port=process.env.PORT || 8080; //port .env mai nhai hai toh wahe 8080 utha legi.

app.listen(port,()=>{
    console.log(`Server is running in port no: ${port}`);
})
