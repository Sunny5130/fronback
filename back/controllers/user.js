const User=require("../models/user");

async function postHandler(req,res){
 const body = req.body;
    if(!body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
        return res.status(400).json({ msg: "All fields are required" });
    }try{
        const result = await User.create({
            first_name: body.first_name,last_name: body.last_name,email: body.email,gender: body.gender,job_title: body.job_title
        });
        console.log("User created:", result);
        return res.status(201).json({ msg: "User created successfully", data: result });
    }catch (err) {
        console.error("Error:", err.message);
        return res.status(500).json({ msg: "Server Error", error: err.message });
    }
}
async function getHandler(req,res){
    try {
        const allDbUsers = await User.find({});
        const html = `<h2>All Users from MongoDB</h2>
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
            </ul> `;
        res.send(html);
    } catch (err) {
        res.status(500).send("Error fetching users");
    }
}
async function patchHandler(req,res){
const userId = req.params.id;
    const updateFields = req.body;

    try{
        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });

        if (!updatedUser){
            return res.status(404).json({ msg: "User not found" });
        }
        return res.json({ msg: "User updated successfully", data: updatedUser });
    } catch (err) {
        return res.status(500).json({ msg: "Error updating user", error: err.message });
    }
}
async function deleteHandler(req,res){
const userId = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if(!deletedUser){
            return res.status(404).json({ msg: "User not found" });
        }
        return res.json({ msg: "User deleted successfully", data: deletedUser });
    } catch (err) {
        return res.status(500).json({ msg: "Error deleting user", error: err.message });
    }
}


// display 1 user details by its id

const mongoose = require("mongoose");

async function getUserByIdHandler(req, res) {
  const userId = req.params.id;

  // Check for valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).send("<h3>❌ Invalid User ID</h3>");
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("<h3>⚠️ User not found</h3>");
    }

    // Render as HTML
    const html = `
      <h2>User Details</h2>
      <ul>
        <li><strong>First Name:</strong> ${user.first_name}</li>
        <li><strong>Last Name:</strong> ${user.last_name}</li>
        <li><strong>Email:</strong> ${user.email}</li>
        <li><strong>Gender:</strong> ${user.gender}</li>
        <li><strong>Job Title:</strong> ${user.job_title}</li>
      </ul>
    `;
    res.send(html);
  } catch (err) {
    res.status(500).send("<h3>🚨 Error fetching user</h3>");
  }
}




module.exports={
    postHandler,
    getHandler,
    patchHandler,
    deleteHandler,
    getUserByIdHandler,
}