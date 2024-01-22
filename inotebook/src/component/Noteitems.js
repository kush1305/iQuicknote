import React ,{useContext} from "react";
import  noteContext  from "../context/noteContext";

function Noteitems(props) {
    const context = useContext(noteContext)

  const {deleteNote}= context;

    const {note,updatenote}= props;
  return (
    <div className="col-md-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">
            {note.description}
          </p>
          <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id); props.showalert("Deleted sucessfully","success")}}></i>
          <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updatenote(note)}}></i>
          
        </div>
      </div>
    </div>
  );
}

export default Noteitems;
