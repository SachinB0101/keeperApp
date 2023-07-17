import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

function Note(props){
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [editedContent, setEditedContent] = useState(props.content);

  function handleEdit(event){
    setEditMode(true);
    // props.onEdit(props.id);
  }

  function handleDelete(){
    props.onDelete(props.id);
  }

  function handleSave() {
    setEditMode(false);
    props.onSave(props.id, editedTitle, editedContent);
    // Call a function to save the edited note with the updated title and content
    // For example: props.onSave(props.id, editedTitle, editedContent);
  }

  function handleTitleChange(event) {
    setEditedTitle(event.target.value);
  }

  function handleContentChange(event) {
    setEditedContent(event.target.value);
  }

  return (
    <div className={`note ${editMode ? "edit-mode" : ""}`}>
      {editMode ? (
        <>
          <input type="text" value={editedTitle} onChange={handleTitleChange} />
          <textarea value={editedContent} onChange={handleContentChange} />
          <button onClick={handleSave}><SaveIcon/></button>
        </>
      ) : (
        <>
          <h1>{props.title}</h1>
          <p>{props.content}</p>
          <button onClick={handleDelete}><DeleteIcon /></button>
          <button onClick={handleEdit}><EditIcon /></button>
        </>
      )}
    </div>
  );
}

export default Note;
