const express=require('express');
const {connectMongoDb}=require("./connection")//for url

const {logRequest}=require("../middlewares/index");

const userRouter=require("../routes/user");
 
const app=express();
const PORT=3000;

// connection
connectMongoDb("mongodb://127.0.0.1:27017/saini").then(()=>{
    console.log("MongoDb Connected!");
});

// Middleware plugin
// app.use(logRequest("log.txt")); // Custom logging middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/user", userRouter);

app.listen(PORT,() => {
    console.log("Server running on port:3000");
}); 