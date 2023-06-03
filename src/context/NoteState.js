import React, { useState } from "react";

import NoteContext from "./noteContext";

const NoteState=(props)=>{

  const initialNote = [
    {
      "_id": "647a97ff388500812d16da0a",
      "user": "646200fb6aaac33e92d349c1",
      "title": "lets learn java",
      "description": "Welcome in this java tutorial",
      "tag": "genaral",
      "date": "2023-06-03T01:31:43.885Z",
      "__v": 0
    },
    {
      "_id": "647a980f388500812d16da0c",
      "user": "646200fb6aaac33e92d349c1",
      "title": "lets learn java",
      "description": "Welcome in this java tutorial",
      "tag": "genaral",
      "date": "2023-06-03T01:31:59.609Z",
      "__v": 0
    }
  ]

    const [notes, setNotes] = useState(initialNote);

   return(
    <NoteContext.Provider value={{notes,setNotes}} >
        {props.children}
    </NoteContext.Provider>
   )
}

export default NoteState ;