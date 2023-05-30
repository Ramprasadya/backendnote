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

//Route 2 :  Add a new note using post method      :   localhost:5000/api/notes/addnote   ; 

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


//Route 3 :  update note using patch method      :   localhost:5000/api/notes/updatenote/:id   ;

router.patch('/updatenote/:id',fetchUser,async(req,res)=>{
   const {title,description,tag} = req.body;

//    create  a new note object 
try {
    
const newNote = {}

if(title){newNote.title = title};
if(description){newNote.description = description};
if(tag){newNote.tag = tag};

//  Find thr note to be updated and update it

let note = await Notes.findById(req.params.id)
if(!note){
    return res.status(400).send("Not Found")
}
if( note.user.toString() !== req.user.id ){
    return res.status(401).send("Not Allowed")
}

 note = await Notes.findByIdAndUpdate(req.params.id , {$set : newNote} , {new : true});

 res.json({note});
} catch (error) {
    console.log(error.massage)
    res.status(500).send("Internal server error")
}

})

//Route 4 :  Delete note using DELETE method      :   localhost:5000/api/notes/deletenote/:id   ;

router.delete('/deletenote/:id',fetchUser,async(req,res)=>{
   

 
 try {
    //  Find thr note to be delete and delete it
 
 let note = await Notes.findById(req.params.id)
 if(!note){
     return res.status(400).send("Not Found")
 }
//  Allow deletation only if user owns this Note
 if( note.user.toString() !== req.user.id ){
     return res.status(401).send("Not Allowed")
 }
 
  note = await Notes.findByIdAndDelete(req.params.id );
 
  res.json({"Succes ": " Note has been deleted" ,note:note});
 } catch (error) {
    console.log(error.massage)
    res.status(500).send("Internal server error")
 }
 
 })

module.exports = router;