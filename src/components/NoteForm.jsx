import {useState} from 'react';

function NoteForm({addNote}) {
  const[text,setText]=useState('');

  const handleSubmit=(e)=>{
    e.preventDefault();

    if(text.trim()){
      addNote(text.trim());
      setText('');
    }
  };

  return(
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a new note..."
      />
      <button type="submit">Add Note</button>
    </form>
  );
}

export default NoteForm;
