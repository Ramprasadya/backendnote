import React, { useState } from "react";

import NoteContext from "./noteContext";

const NoteState=(props)=>{
  const host = "http://localhost:5000"
  const initialNote = []
  const [notes, setNotes] = useState(initialNote);



  // Get All Notes  ...
  const getAllNotes=async()=>{

    // API call 
    const response = await fetch(`${host}/api/notes/allnotes` ,{
      method : "GET",
      headers :{
        'Content-Type' : 'application/json',
        'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MjAwZmI2YWFhYzMzZTkyZDM0OWMxIn0sImlhdCI6MTY4NTQxMTk1M30.E3HOcrzOndL9sdwU1bgqVP8NdZokLE-PBl1NGARpnBU'
      },
      
    })
    const json = await response.json()
    setNotes(json)
    
    
    
   
  }

    // Add Notes 

    const addNote=async(title,description ,tag)=>{

        // API call 
        const response = await fetch(`${host}/api/notes/addnote` ,{
          method : "POST",
          headers :{
            'Content-Type' : 'application/json',
            'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MjAwZmI2YWFhYzMzZTkyZDM0OWMxIn0sImlhdCI6MTY4NTQxMTk1M30.E3HOcrzOndL9sdwU1bgqVP8NdZokLE-PBl1NGARpnBU'
          },
          body : JSON.stringify({title,description,tag})
         })
        let note= await response.json();
     setNotes(notes.concat(note))

    }

    // Update Note 

    const updateNotes= async (id,title,description,tag)=>{
        // API call 
       const response = await fetch(`${host}/api/notes/updatenote/${id}` ,{
        method : "PATCH",
        headers :{
          'Content-Type' : 'application/json',
          'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MjAwZmI2YWFhYzMzZTkyZDM0OWMxIn0sImlhdCI6MTY4NTQxMTk1M30.E3HOcrzOndL9sdwU1bgqVP8NdZokLE-PBl1NGARpnBU'
        },
        body : JSON.stringify({title,description,tag})
       })
       await response.json();
        // Logic to update in client 
        let newNote = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNote.length; index++) {
          const element = newNote[index];
          if(element._id === id){
            newNote[index].title = title;
            newNote[index].description = description;
            newNote[index].tag = tag;
            break;
          }
        }
        setNotes(newNote)
    }

    // Delete Note 

    const deleteNote=async(id)=>{

       // API call 
       const response = await fetch(`${host}/api/notes/deletenote/${id}` ,{
        method : "DELETE",
        headers :{
          'Content-Type' : 'application/json',
          'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MjAwZmI2YWFhYzMzZTkyZDM0OWMxIn0sImlhdCI6MTY4NTQxMTk1M30.E3HOcrzOndL9sdwU1bgqVP8NdZokLE-PBl1NGARpnBU'
        },
      
       })
       const json =response.json();
       console.log(json)

        console.log("Deleting note using id  ." ,id )
        const newNotes = notes.filter((note)=>{return note._id !== id})
        setNotes(newNotes)
    }

   return(
    <NoteContext.Provider value={{notes,addNote ,updateNotes ,deleteNote,getAllNotes}} >
        {props.children}
    </NoteContext.Provider>
   )
}

export default NoteState ;