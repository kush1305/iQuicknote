import React, { useState } from "react";
import noteContext from "./noteContext";


const NoteState = (props) => {

  const host="http://localhost:5000"
  const noteInitial = [
    
  ];

    //Get all notes
    const getNotes = async () => {

      //API CALL
      const response= await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        }
      });

      const json= await response.json()

      console.log(json);

  
      setNotes(json);
      // eslint-disable-next-line
    };



  const [notes, setNotes] = useState(noteInitial);
  //Add a note
  const addNote = async (title, description, tag) => {

    //API CALL
    const addnot= await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag}),
    });

    const note= await addnot.json()
    

    setNotes(notes.concat(note));
  };

  //Delete a note
  const deleteNote = async(id) => {
    // to do api call
    const response= await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      }
    });

    const json= await response.json()
    console.log(json)
    console.log("Deleting the node with id" + id);

    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  //Edit a note

  const editNote = async (id, title, description, tag) => {
    try {
      const editNot = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
        },
        body: JSON.stringify({ id, title, description, tag }),
      });
  
      if (!editNot.ok) {
        throw new Error(`Failed to edit note with ID: ${id}`);
      }
  
      const json = await editNot.json();
  
      // Update local state optimistically
      let newNotes = JSON.parse(JSON.stringify(notes));
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
  
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
  
      // Set the updated state
      setNotes(newNotes);
  
      console.log(json);
    } catch (error) {
      console.error("Error editing note:", error.message);
      // Optionally, you may want to revert the local state to maintain consistency
    }
  };
  

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
