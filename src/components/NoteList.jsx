import NoteCard from "./NoteCard";

function NoteList({ notes , deleteNote ,editNote})  {
  if(notes.length === 0){
    return <p className="empty-state">No notes found.</p>;
  }

  const listClass=notes.length > 7 ? 'note-list two-columns' : 'note-list';

  return (
    <div className={listClass}>
      {notes.map((note,index) => (
        <div
          className="note-item"
          key={note.id}
          style={{'--note-index': index}}
        >
            <h3>{note.text}</h3>
            <NoteCard note={note} deleteNote={deleteNote} editNote={editNote} />
        </div>
      ))}
    </div>
  );
}

export default NoteList;
