const express=require('express');
const router=express.Router();
const authRoute=require('../controllers/auth')

router.post('/register',authRoute.register);
router.post('/login',authRoute.login);  



 
module.exports=router  