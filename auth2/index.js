
//----------------------------------------------how can we set cookie and read cookie---------------------------------////////

// const cookieParser = require("cookie-parser");
// const express=require("express");
// const app=express();

// app.use(cookieParser());
// app.get("/",(req,res)=>{
//     res.cookie("name","Sunny");
//     res.send("Hello");
// });

// // app.get("/read",(req,res)=>{       //es route per hum uper ki gayi route wali cookie dekh sakte hai
// //     res.send("Hello ji read karo");
// // })
// app.get("/cookie",(req,res)=>{
//     console.log(req.cookies);
//     res.send("read cookie");
// })

// app.listen(3000,()=>{
//     console.log("Server running in port: 3000");
// });


//----------------------------------------how can use bcrypt for password encryption and decryption------------------------------------//
// const express=require("express");
// const app=express();
// const bcrypt=require("bcrypt");


// app.get("/",(req,res)=>{
//     bcrypt.genSalt(10,(err,salt)=>{
//         bcrypt.hash("original password",salt,(err,hash)=>{
//             console.log("Salt: ",salt);
//             console.log("encrypt password: ",hash);
//         });
//     });
//     res.send("hii");
// });


// app.listen(3000,()=>{
//     console.log("Server run in port: 3000");
// });


//----------------------------------------------jwt kaise work karta hai data store or retrive data ----------------------//
const express=require("express");
const app=express();
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

app.get("/",(req,res)=>{
    let token=jwt.sign({email:"sunny@gmail.com"},"secret");
    res.cookie("token",token);
    res.send("Jwt send as cookie");
});

app.get("/read",(req,res)=>{
    let data=jwt.verify(req.cookies.token,"secret");
    console.log(data);
    res.send("read");
});

app.listen(3000,()=>{
    console.log("Server run in port: 3000");
});
