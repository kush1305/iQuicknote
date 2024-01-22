import React ,{useContext, useState} from "react";
import  noteContext  from "../context/noteContext";

function Addnote() {
    const context = useContext(noteContext)

  const {addNote}= context;

  const[note,setNote] = useState({title:"",description:"",tag:"default"})

  const handleClick=(e)=>{
    e.preventDefault();
    addNote(note.title,note.description);
    setNote({title:"",description:"",tag:""})
  }
  const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});

  }
  return (
    <div>
        <h1>Add a note</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              title
            </label>
            <input
              type="text"
              className="form-control"
              value={note.title}
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
            
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
            description
            </label>
            <input
              type="text"
              className="form-control"
              value={note.description}
              id="description"
              name="description"
              onChange={onChange}
            />
          </div>

          
          
          <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
            Submit
          </button>
        </form>
    </div>
  )
}

export default Addnote