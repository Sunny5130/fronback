
const express = require('express');
const app = express();
const users = require('./data.json');
const fs=require('fs');
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
    fs.appendFile('log.txt',`\nDATE: ${Date.now()} Method: ${req.method} \n`,(err,data)=>{
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


//---------------------------port number of an server----------------------------->>

app.listen(3000, () => {
    console.log("server running in 3000 port no.");
});


