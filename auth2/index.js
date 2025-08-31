
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
// const express=require("express");
// const app=express();
// const bcrypt=require("bcrypt");
// const jwt=require("jsonwebtoken");
// const cookieParser = require("cookie-parser");
// app.use(cookieParser());

// app.get("/",(req,res)=>{
//     let token=jwt.sign({email:"sunny@gmail.com"},"secret");
//     res.cookie("token",token);
//     res.send("Jwt send as cookie");
// });

// app.get("/read",(req,res)=>{
//     let data=jwt.verify(req.cookies.token,"secret");
//     console.log(data);
//     res.send("read");
// });

// app.listen(3000,()=>{
//     console.log("Server run in port: 3000");
// });













//user create karna, password incrypt karna, fhir user login karna user logout karna



//---------------------------------------Jwt full authentication------------------------------------- -----////////////////////

const express=require("express");
const app=express();

const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const cookieParser = require("cookie-parser");
const path=require('path');
const userModel=require("./models/user");

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());


app.get("/",(req,res)=>{
    res.render('create');  //ejs file ko render karne ke liye nodejs server per
});

//-------------------------------------user create signup page route creation---------------------------//
app.post("/create",(req,res)=>{
    let{username,email,password,age}=req.body;

    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password,salt,async(err,hash)=>{
            console.log(hash);
        let createdUser=await userModel.create({
        username,
        email,
        password:hash,
        age
    });
    res.send(createdUser);

        })
    })
})

//--------------------------------logout means token ko hata dena----------------//
app.get("/logout",(req,res)=>{
    res.cookie("token","");
    res.redirect("/");
})

//--------------------------------login route-------------------------///
app.get("/login",(req,res)=>{
        res.render('login');
});

app.post("/login",async(req,res)=>{
    let user=await userModel.findOne({email:req.body.email});/////idhar pasword ko decrypt karna padega kyoki hamne pasword hash kar rakha hai/////
    if(!user)res.send("Email is not registered");
   const match= await bcrypt.compare(req.body.password,user.password);
        console.log(match);
        // if(match)res.send("yes you can log in");
//--------yaha login hon chuke hai ab es user koi req per hamesha login nhai karega jwt token cookie banke jayega req ke saath-----------//
        if(match){
            let token=jwt.sign({email:user.email},"Userhai");
            res.cookie("token",token);
            res.render('saini');
        }else{
             res.send("Password is not correct");
        }
})


app.listen(3000,()=>{
    console.log("Server run at port: 3000");
})
