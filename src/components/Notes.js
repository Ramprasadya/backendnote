import React, { useContext, useEffect ,useRef ,useState} from 'react'
import NoteContext from '../context/noteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';

const Notes = () => {
  const context = useContext(NoteContext)
  const {notes,getAllNotes} = context ;
  
  
  useEffect(()=>{
    getAllNotes()
    // eslint-disable-next-line 
  },[])

  const updateNote=(currentNote)=>{
     ref.current.click();
     setNote({etitle:currentNote.title , edescription : currentNote.description , etag : currentNote.tag })
  }

  const ref = useRef(null)

  const [note, setNote] = useState({etitle : "" ,edescription : "" , etag:""})
    const handleClick=(e)=>{
        e.preventDefault()
       console.log("updating the note ", note)
    }

    const onChange=(e)=>{
     setNote({...note ,[e.target.name] : e.target.value} )
    }


  return (
    <> 
    <AddNote/>

    
<button type="button" hidden ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
      <div className="mb-3">
    <label htmlFor="etitle" className="form-label">Title</label>
    <input type="text" className="form-control" name='etitle' id="etitle" value={note.etitle} onChange={onChange } />
  </div>
  <div className="mb-3">
    <label htmlFor="edescription" className="form-label">Description</label>
    <input type="text" className="form-control" name="edescription" id="edescription" value={note.edescription} onChange={onChange} />
  </div>
  <div className="mb-3">
    <label htmlFor="etag" className="form-label">Tag</label>
    <input type="text" className="form-control" name="etag" id="etag" value={note.etag} onChange={onChange} />
  </div>
 
</form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>

    <div className="row my-3">
    <h2>Your Note </h2>
    {
      notes.map((note)=>{
        return <Noteitem key={note._id} updateNote={updateNote} note={note} />
      })
    }
  </div>
  </>
  )
}

export default Notes