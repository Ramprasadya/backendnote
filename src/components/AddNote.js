import React,{useContext, useState} from 'react'
import NoteContext from '../context/noteContext'
const AddNote = () => {
    const context = useContext(NoteContext)
    const {addNote} = context ;
    const [note, setNote] = useState({title : "" ,description : "" , tag:""})
    const handleClick=(e)=>{
        e.preventDefault()
      addNote(note.title ,note.description ,note.tag)
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
    <input type="text" className="form-control" name='title' id="title" onChange={onChange } />
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" name="description" id="description" onChange={onChange} />
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" name="tag" id="tag" onChange={onChange} />
  </div>
  <button type="submit" className="btn btn-primary" onClick={handleClick} >Submit</button>
</form>
    </div>
   </>
  )
}

export default AddNote