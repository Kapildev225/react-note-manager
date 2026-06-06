import {useState} from 'react';

function NoteCard({ note, deleteNote , editNote}) {

  const[isEditing,setIsEditing]=useState(false);
  const[newText,setNewText]=useState(note.text);
  const createdDate=new Date(note.createdAt);
  const createdLabel=Number.isNaN(createdDate.getTime())
    ? 'Created time unavailable'
    : `Created ${createdDate.toLocaleDateString()} at ${createdDate.toLocaleTimeString([],{
      hour:'2-digit',
      minute:'2-digit'
    })}`;
      
  const handleSave=()=>{
    if(newText.trim()){
      editNote(note.id,newText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel=()=>{
    setNewText(note.text);
    setIsEditing(false);
  };

  const handleEdit=()=>{
    setNewText(note.text);
    setIsEditing(true);
  };

  if(isEditing){
    return(
      <div className="note-card">
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
        <button className="save-button" onClick={handleSave}>Save</button>
        <button className="cancel-button" onClick={handleCancel}>Cancel</button>
      </div>
    );
  }
      

  return (
    <div className="note-card">
      <p>{createdLabel}</p>
      <button className="delete-button" onClick={() => deleteNote(note.id)}>Delete</button>
      <button className="edit-button" onClick={handleEdit}>Edit</button>
    </div>
  );
}

export default NoteCard;
