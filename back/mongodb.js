// const express = require('express');
// const mongoose = require('mongoose');
// const app = express();

// // Middleware to parse JSON & urlencoded data
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));//yei 29 line    const body = req.body;
// //  per kaam aa raha hai To make req.body available in your POST routes

// // Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/saini')
//     .then(() => console.log("✅ MongoDB connected"))
//     .catch((err) => console.error("❌ MongoDB connection error:", err.message));

//     //schema
// const userSchema = new mongoose.Schema({
//     first_name: { type: String, required: true },
//     last_name:  { type: String },
//     email:      { type: String, required: true, unique: true },
//     gender:     { type: String },
//     job_title:  { type: String },
    
// },{timestamps:true});//yei timestamps batayega kab entry create hoye thi or kab update  
// ////////model
// const User = mongoose.model("User", userSchema);

// // POST Route
// app.post("/api/users", async (req, res) => {
//     const body = req.body;

//     if (
//         !body.first_name ||
//         !body.last_name ||
//         !body.email ||
//         !body.gender ||
//         !body.job_title
//     ) {
//         return res.status(400).json({ msg: "All fields are required" });
//     }

//     try {
//         const result = await User.create({
//             first_name: body.first_name,
//             last_name: body.last_name,
//             email: body.email,
//             gender: body.gender,
//             job_title: body.job_title
//         });

//         console.log("User created:", result);//creation hone per hum entry terminal per dekh sakhte hai
//         return res.status(201).json({ msg: "User created successfully", data: result });

//     } catch (err) {
//         console.error("Error:", err.message);
//         return res.status(500).json({ msg: "Server Error", error: err.message });
//     }
// });
// //----UI view 
// app.get("/users", async (req, res) => {
//     try {
//         const allDbUsers = await User.find({});
        
//         const html = `
//     <h2>All Users from MongoDB</h2>
//     <ul>
//         ${allDbUsers.map(user => `
//             <li>
//                 FName: ${user.first_name}, 
//                 LName: ${user.last_name}, 
//                 Email: ${user.email}, 
//                 Gender: ${user.gender}, 
//                 Job Title: ${user.job_title}
//             </li>
//         `).join('')}
//     </ul>
// `;

//         res.send(html);
//     } catch (err) {
//         res.status(500).send("Error fetching users");
//     }
// });

// // Start Server
// app.listen(3000, () => {
//     console.log("🚀 Server running on http://localhost:3000");
// });


const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));// const body = req.body  per kaam aa raha hai To make req.body available in your POST routes

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/saini')
    .then(() => console.log(" MongoDB connected"))
    .catch((err) => console.error(" MongoDB connection error:", err.message));

// Schema
const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name:  { type: String },
    email:      { type: String, required: true, unique: true },
    gender:     { type: String },
    job_title:  { type: String },
}, { timestamps: true });

// Model
const User = mongoose.model("User", userSchema);

////////////////////////////////////////////////
// POST: Create New User
app.post("/api/users", async (req, res) => {
    const body = req.body;

    if(!body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ){
        return res.status(400).json({ msg: "All fields are required" });
    }

    try{
        const result = await User.create({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            gender: body.gender,
            job_title: body.job_title
        });

        console.log("User created:", result);
        return res.status(201).json({ msg: "User created successfully", data: result });

    } catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({ msg: "Server Error", error: err.message });
    }
});

////////////////////////////////////////////////
// PATCH: Update User by ID
app.patch("/api/users/:id", async (req, res) => {
    const userId = req.params.id;
    const updateFields = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.json({ msg: "User updated successfully", data: updatedUser });

    } catch (err) {
        return res.status(500).json({ msg: "Error updating user", error: err.message });
    }
});

////////////////////////////////////////////////
// DELETE: Delete User by ID
app.delete("/api/users/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.json({ msg: "User deleted successfully", data: deletedUser });

    } catch (err) {
        return res.status(500).json({ msg: "Error deleting user", error: err.message });
    }
});

////////////////////////////////////////////////
// GET: UI View
app.get("/users", async (req, res) => {
    try {
        const allDbUsers = await User.find({});

        const html = `
            <h2>All Users from MongoDB</h2>
            <ul>
                ${allDbUsers.map(user => `
                    <li>
                        FName: ${user.first_name}, 
                        LName: ${user.last_name}, 
                        Email: ${user.email}, 
                        Gender: ${user.gender}, 
                        Job Title: ${user.job_title}
                    </li>
                `).join('')}
            </ul>
        `;

        res.send(html);
    } catch (err) {
        res.status(500).send("Error fetching users");
    }
});

////////////////////////////////////////////////
// Server Start
app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});
 