const express = require('express')
const router = express.Router();
const Notes = require('../models/Notes');
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');

//Route 1 :  Fetching all notes   :   localhost:5000/api/notes/allnotes   ; 

router.get('/allnotes',fetchUser,async(req,res)=>{
  try {
    let notes = await Notes.find({user : req.user.id});

    res.json(notes);
  } catch (error) {
    console.log(error.massage)
  res.status(500).send("Internal server error")
  }
})

//Route 1 :  Add a new note using post method      :   localhost:5000/api/notes/addnote   ; 

router.post('/addnote',fetchUser,[
    body('title', 'Enter A valid Title').isLength({ min: 3 }),
   body('tag', 'password must be atleast 5 character').isLength({ min: 5 }),
],async(req,res)=>{
     // Handeling Error 
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
 
    try {
        //  Destructuring getting data from the body

    const {title,description,tag} = req.body;

    // Adding note 

    const note = new Notes({
        title ,description ,tag , user : req.user.id
    })

    const savedNote = await note.save();

    res.send(savedNote);
    } catch (error) {
        console.log(error.massage)
  res.status(500).send("Internal server error")
    }



})

module.exports = router;