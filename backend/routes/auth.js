const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

//Secret key of jwt

const JWT_SECRET = "IamCoding";

//Create a user using POST method with end point   :   localhost:5000/api/auth/createuser   ; 

router.post('/createuser',[
    body('name', 'Enter A valid name').isLength({ min: 3 }),
     body('email','Enter a valid Email').isEmail(),
    body('password', 'password must be atleast 5 character').isLength({ min: 5 }),
],async(req,res)=>{
    // Handeling Error 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  // check the email exist or not 
  try{

   let user = await User.findOne({email : req.body.email}); // finding the email from body and check
   if(user){
    return res.status(400).json({error : "A user with this email already exists"});
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
    
    res.send({authToken})

    // res.send(user);  // make sure to send response  ..
  
  }catch(error){
  console.log(error.massage)
  res.status(500).send("Some Error Occured")
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

module.exports = router;