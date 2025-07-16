const express = require('express');
const { postHandler, getHandler, deleteHandler, patchHandler,getUserByIdHandler } = require("../controllers/user");

const router = express.Router();

// GET all users
router.get("/", getHandler);

// POST a new user
router.post("/", postHandler);

// PATCH user by ID
router.patch("/:id", patchHandler);

// DELETE user by ID
router.delete("/:id", deleteHandler);
// get allusers by id
router.get("/:id", getUserByIdHandler); // ✅ Get user by ID


module.exports = router;













// const express = require('express');

// const { postHandler, getHandler, deleteHandler,patchHandler}=require("../controllers/user")

// const router=express.Router();

// router.post("/", postHandler);

// router.get("/:id", getHandler)
// .patch( patchHandler)
// .delete(deleteHandler);


// module.exports=router;