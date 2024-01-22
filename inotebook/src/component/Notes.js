import React ,{useContext,useEffect,useRef,useState} from "react";
import  noteContext  from "../context/noteContext";
import Noteitems from "./Noteitems";
import Addnote from "./Addnote";
import { useNavigate } from "react-router-dom";


function Notes(props) {
  let history=useNavigate();
    const context = useContext(noteContext)

  const {notes,getNotes,editNote}= context;

  useEffect(() => {
   if(localStorage.getItem('token')){
    getNotes();
   }else{
    history("/login")
   } 
    
      //eslint-disable-next-line
    
  }, [])

  const ref= useRef(null);
  const refClose= useRef(null);
  const[note,setNote] = useState({id:"",etitle:"",edescription:"",etag:"default"})

  const updatenote=(currentNote)=>{
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description})
  }
  

  const handleClick=(e)=>{
    console.log(note);
    
    editNote(note.id,note.etitle,note.edescription,note.etag)
    setNote({id:"",etitle:"",edescription:"",etag:""});

    refClose.current.click();
    props.showalert("updated sucessfully","success")

    
    
  }
  const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});

  }
  
  return (
    <div>
        <Addnote/>
        <>
  {/* Button trigger modal */}
  <button
    ref={ref}
    type="button"
    className="btn btn-primary d-none"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    Launch demo modal
  </button>
  {/* Modal */}
  <div
    className="modal fade"
    id="exampleModal"
    tabIndex={-1}
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">
            Edit your Notes
          </h1>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body">
        <form>
          <div className="mb-3">
            <label htmlFor="etitle" className="form-label" defaultValue={""}>
              title
            </label>
            <input
              type="text"
              className="form-control"
              value={note.etitle}
              id="etitle"
              name="etitle"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
            
          </div>
          <div className="mb-3">
            <label htmlFor="edescription" className="form-label" defaultValue={""}>
            description
            </label>
            <input
              type="text"
              className="form-control"
              value={note.edescription}
              id="edescription"
              name="edescription"
              onChange={onChange}
            />
          </div>
          
          
        </form>
        </div>
        <div className="modal-footer">
          <button

            ref={refClose}
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          
          <button name="update"disabled={note.etitle.length<3 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>
            Update 
          </button>
        </div>
      </div>
    </div>
  </div>
</>

      <div className="row my-3">
        <h1>Your Notes</h1>
        {notes?.map((note) => {
          return <Noteitems key={note._id} updatenote={updatenote} showalert={props.showalert} note={note}/>
        })}
      </div>
    </div>
  );
}

export default Notes;
