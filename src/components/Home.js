import React, { useContext } from 'react'
import NoteContext from '../context/noteContext'
const Home = () => {
  const context = useContext(NoteContext)
  const {notes ,setNotes} = context ;

  return (
    <>
    <div className="container my-3">
    <h2>Add Your Note</h2>
      <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
    <div className="container my-3">
      <h2>Your Note </h2>
      {
        notes.map((note)=>{
          return note.title
        })
      }
    </div>
    </>
  )
}

export default Home