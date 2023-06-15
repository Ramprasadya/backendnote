import React,{useContext, useState} from 'react'
import NoteContext from '../context/noteContext'
const AddNote = () => {
    const context = useContext(NoteContext)
    const {addNote} = context ;
    const [note, setNote] = useState({title : "" ,description : "" , tag:""})
    const handleClick=(e)=>{
        e.preventDefault()
      addNote(note.title ,note.description ,note.tag)
      setNote({title : "" ,description : "" , tag:""})
    }

    const onChange=(e)=>{
     setNote({...note ,[e.target.name] : e.target.value} )
    }

  return (
   <>
      <div className="container my-3">
    <h2>Add Your Note</h2>
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" name='title' id="title" value={note.title}  minLength={5} required onChange={onChange } />
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" name="description" id="description" value={note.description} minLength={5} required onChange={onChange} />
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" name="tag" value={note.tag} id="tag" onChange={onChange} />
  </div>
  <button disabled={note.title.length <5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick} >Add Note</button>
</form>
    </div>
   </>
  )
}

export default AddNote