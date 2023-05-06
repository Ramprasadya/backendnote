const express = require('express');
const User = require('../models/User');
const router = express.Router();

//Create a user using POST method with end point   :   /api/auth   ; 

router.post('/',(req,res)=>{
   
    console.log(req.body);
    // Storing the data in database 
    const user = User(req.body);
    user.save();
    // Displaying the data in response  .
    res.send(req.body);
   
})

module.exports = router;