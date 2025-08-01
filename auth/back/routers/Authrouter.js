const { signup } = require('../controllers/authController');
const { signupvalidation } = require('../middlewares/authMiddleware');

const router=require('express').Router();

router.get('/login',(req,res)=>{
    res.send("login successfully");
});

router.post('/signup',signupvalidation,signup);
 
module.exports=router;
