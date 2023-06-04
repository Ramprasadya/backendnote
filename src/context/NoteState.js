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
        let json = response.json();
        console.log(json)


      let  note={
            "_id": "647a980f388500812d16da0c",
      "user": "646200fb6aaac33e92d349c1",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2023-06-03T01:31:59.609Z",
      "__v": 0
        }

     setNotes(notes.concat(note))

    }

    // Update Note 

    const updateNote= async (id,title,description,tag)=>{
        // API call 
       const response = await fetch(`${host}/api/notes/updatenote/${id}` ,{
        method : "POST",
        headers :{
          'Content-Type' : 'application/json',
          'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ2MjAwZmI2YWFhYzMzZTkyZDM0OWMxIn0sImlhdCI6MTY4NTQxMTk1M30.E3HOcrzOndL9sdwU1bgqVP8NdZokLE-PBl1NGARpnBU'
        },
        body : JSON.stringify({title,description,tag})
       })
       response.json();
        // Logic to update in client 
        for (let index = 0; index < notes.length; index++) {
          const element = notes[index];
          if(element._id === id){
            element.title = title;
            element.description = description;
            element.tag = tag;
          }
          
        }
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
    <NoteContext.Provider value={{notes,addNote ,updateNote ,deleteNote,getAllNotes}} >
        {props.children}
    </NoteContext.Provider>
   )
}

export default NoteState ;