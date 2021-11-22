import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import "./notesApp.css";

function Note(props) {
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
      <div className="dustbin">  <DeleteIcon /></div>
      </button>
    </div>
  );
}

export default Note;
