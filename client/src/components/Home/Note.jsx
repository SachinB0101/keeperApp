import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Note(props){
  const [editMode, setEditMode] = useState(false);

  function handleEdit(event){
    setEditMode(true);
    props.onEdit(props.id);
  }

  function handleDelete(){
    props.onDelete(props.id);
  }

  return(
    <div className="note">
      <h1>{!editMode ? props.title : ""}</h1>
      <p>{!editMode ? props.content : ""}</p>
      <button onClick={handleDelete}><DeleteIcon /></button>
      <button onClick={handleEdit}><EditIcon /></button>
    </div>
  );
}

export default Note;
