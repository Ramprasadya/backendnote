const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser');

//Secret key of jwt

const JWT_SECRET = "IamCoding";

//Create a user using POST method with end point   :   localhost:5000/api/auth/createuser   ; 

router.post('/createuser',[
    body('name', 'Enter A valid name').isLength({ min: 3 }),
     body('email','Enter a valid Email').isEmail(),
    body('password', 'password must be atleast 5 character').isLength({ min: 5 }),
],async(req,res)=>{
  let success = false;
    // Handeling Error 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success , errors: errors.array() });
    }
  // check the email exist or not 
  try{

   let user = await User.findOne({email : req.body.email}); // finding the email from body and check
   if(user){
    return res.status(400).json({success,error : "A user with this email already exists"});
   }
  //  Password hashing using salt  .
   let salt = await bcrypt.genSalt(10);
   let securePassword = await bcrypt.hash(req.body.password , salt);
  //  Creating a User ..........
     user = await User.create({
      name: req.body.name,
      password: securePassword,
      email : req.body.email
    })
    // Passing the user id 
    const data = {
      user:{
        id : user.id
      }
    }
    // sending the json web token  in response .
    const authToken = jwt.sign(data,JWT_SECRET);
    success = true
    res.send({success,authToken})

    // res.send(user);  // make sure to send response  ..
  
  }catch(error){
  console.log(error.massage)
  res.status(500).send("Internal server error")
  }
    // .then(user => res.json(user)).catch(err=>{console.log(err)
    //     res.json({err:'please enter a unique email',message: err.massage })});

    // console.log(req.body);
    // // Storing the data in database 
    // const user = User(req.body);
    // user.save();
    // // Displaying the data in response  .
    // res.send(req.body);


    
    
    
})
// Authenticate user using  : POST  " /api/auth/login " No Login Require  .
router.post('/login',[
  body('email','Enter a valid Email').isEmail(),
  body('password', 'password can not be blank').exists(),
],async(req,res)=>{
  let success =false
  // Handeling Error 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
 
  // Destructuring , getting email and password from body .
  const {email , password } = req.body ;

  try {
    let user  = await User.findOne({email}) ;
    if(!user){
      success=false
      return res.status(400).json({error : "Please try to login with correct credentials "});
    }

    // compare password  ..

    const comparePassword = await bcrypt.compare(password ,user.password)
    
    // If password wrong 
    if(!comparePassword){
      success=false
     await res.status(400).json({success, error : "Please try to login with correct credentials"})
    }

    const data = {
      user:{
        id : user.id
      }
    }
  //  Signing with jwt 
    const authtoken = await jwt.sign(data , JWT_SECRET);
    success=true
    res.json({success,authtoken})

  }catch(error){
    console.log(error.massage)
    res.status(500).send("Internal server error")
    }

})

// Login user deatil using  : POST  " /api/auth/getuser "  Login Require  .

router.post('/getuser',fetchUser,async(req,res)=>{
   
  try {
    userId = req.user.id
    const user = await User.findById(userId).select('-password')
    res.send(user);

    
  }catch(error){
    console.log(error.massage)
    res.status(500).send("Internal server error")
    }
})

module.exports = router;