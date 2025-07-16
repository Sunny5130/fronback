
const express = require('express');
const app = express();
const users = require('./data.json');
const fs=require('fs');
const mongoose=require('mongoose');
//----------------------------------------return all data into html form into ui---------------------------------------------->>
app.get('/users', (req, res) => { 
    const html = `
    <h1>All Users Detail: </h1>
    <ul>
        ${users.map(user => `<li>Name: ${user.first_name}, Gender: ${user.gender}</li>`).join('')}
    </ul>`;
    res.send(html);
});


//------------------------------------return all data into sdon fromat into ui------------------------------------------------->>
app.get('/api/users', (req, res) => {
    return res.json(users);
});


//------------------- --------------------return users data as id into ui ------------------------------------------------->>
app.get("/api/users/:id",(req,res)=>{
    console.log("Your users here");
    const id=(Number)(req.params.id);
    const user=users.find((user)=>user.id===id)
    return res.json(user);
});



//-------------------in html form search by id-------------------------------------------....>>
app.get("/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.send(`<h2>User with ID ${id} not found</h2>`);
    }

    const html = `
        <h2>User Details</h2>
        <ul>
            <li> ID: ${user.id}</li>
            <li> Name: ${user.first_name}</li>
            <li> Age: ${user.age}</li>
            <li> Gender:${user.gender}</li>
        </ul>
    `;

    res.send(html);
});


//--------------------------------------------practice by our hand----------------------------->>
app.get('/userid/:id',(req,res)=>{
    const id=(Number)(req.params.id);
    const user=users.find((user)=>user.id===id);

    if(!user){
        return res.send(`<h1>User not find in this id :${user.id}`);
    }
        const html=`
        <h1>User details with id</h1>
        <ul>
        <li> ID: ${user.id}</li>
        <li> Name: ${user.first_name}</li>
        <li> Email: ${user.email}</li>
        <li> Gender: ${user.gender}</li>
        <li> Age: ${user.age}</li>
        </ul>
        `;
    res.send(html);
})


//------------------------------Route grouping with with diffrent http method------------------------------>>

// app.
// route('/users').
//     get((req,res)=>{
//         res.send("I am get method");
//     }).post((req,res)=>{
//             res.send("I am post method processing for creating a new users");
//     }).patch((req,res)=>{
//             res.send("I am processing with updating the user");
// });


//-------------------------------------Post data through postman------------------------------------>>

app.use(express.urlencoded({ extended: false }));  //it is like middleware
app.use(express.json()); // Add this if you're sending JSON via Postman or frontend

app.post('/users', (req, res) => {
    const body = req.body;
    users.push({ ...body, id: users.length + 1 });

    fs.writeFile('./data.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ status: "Error", message: err.message });
        }
        return res.json({ status: "Success", id: users.length });
    });
});

//-------------------------------------------------------middlewares----------------------------------------------->>

app.use((req,res,next)=>{
    console.log("I am first middleware");
    req.id="I am content of first middleware";
    fs.appendFile('log.txt',`\nDATE: ${Date.now()}IP:${req.ip} Method: ${req.method}`,(err,data)=>{
        if(err)console.error(err.mesage);
        else{
            next();
        }
    })
    next();
})
app.use((req,res,next)=>{
    console.log(req.id);
    req.id="I have changed request";
    console.log("I am second middleware",req.id);
    next();
})
app.use((req,res,next)=>{
    res.send("I am third middleware");
    // next();
})
//--------------connect mongodb with nodejs--------------------------??//
//database ko connect kiya or saini naam ka new database banaya

mongoose.connect('mongodb://127.0.0.1:27017/saini').then(()=>(
    console.log("MongoDb connected")
)).catch((err)=>{
console.log("MongoDb error",err.message);
})

//this is schema humne schema banaya 
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        require:true,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    gender:{
        type:String
    },
});

// ==----------this is model banaya jo crud operation ke kaam ke liye banaya hai------------------>>
const user=mongoose.model("user",userSchema);

//post the users throw mongodb---------
app.post("/api/users", async (req, res) => {
  const body = req.body;

  // Check if any required fields are missing
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    const user = new User({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ msg: "Error saving user", error: err.message });
  }
});




//---------------------------port number of an server----------------------------->>

app.listen(3000, () => {
    console.log("server running in 3000 port no.");
});


