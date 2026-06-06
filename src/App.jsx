import {useEffect,useMemo,useState} from 'react'
import NoteList from './components/NoteList'
import NoteForm from './components/NoteForm'
import './App.css'
import {ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getStoredItem=(key)=>{
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const setStoredItem=(key,value)=>{
  try {
    localStorage.setItem(key,value);
  } catch {
    // Ignore storage failures so the deployed app still works in restricted browsers.
  }
};

const normalizeNotes=(savedNotes)=>{
  try {
    const parsedNotes=savedNotes ? JSON.parse(savedNotes) : [];

    if(!Array.isArray(parsedNotes)){
      return [];
    }

    return parsedNotes.map((note)=>({
      ...note,
      createdAt: note.createdAt || new Date(Number(note.id) || Date.now()).toISOString()
    }));
  } catch {
    return [];
  }
};

function App(){ 

  const [notes,setNotes]=useState(()=>{
    return normalizeNotes(getStoredItem('notes'));
  });
  const [search,setSearch]=useState('');
  const[darkMode,setDarkMode]=useState(()=>{
    return getStoredItem('darkMode') === 'true';
  });
  

  useEffect(()=>{
    setStoredItem('notes',JSON.stringify(notes));
  },[notes]);

  useEffect(()=>{
    setStoredItem('darkMode',String(darkMode));
  },[darkMode]);
 
  const addNote=(text)=>{
    const newNote={
      id:Date.now(),
      text,
      createdAt:new Date().toISOString()
    };
    setNotes((currentNotes)=>[...currentNotes,newNote]);
    toast.success('Note added successfully!');
  };

  const deleteNote=(id)=>{
    setNotes((currentNotes)=>currentNotes.filter(note => note.id !== id));
    toast.success('Note deleted successfully!');
  };

  const editNote=(id,newText)=>{
    setNotes((currentNotes)=>
      currentNotes.map(note => note.id === id ? {...note,text:newText} : note)
    );
    toast.success('Note updated successfully!');
  };

  const filteredNotes=useMemo(()=>{
    const searchText=search.trim().toLowerCase();

    if(!searchText){
      return notes;
    }

    return notes.filter(note => note.text.toLowerCase().includes(searchText));
  },[notes,search]);
  
  return(
    <>
      <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="water-lines" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="sea-animation" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <header className="app-header">
          <div>
            <h1>NOTE-APP</h1>
            <p>Write, search, edit, and keep your notes saved.</p>
          </div>
          <span className="note-count">{notes.length}</span>
        </header>

        <div className="search-box">
          <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M10.8 18.2a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Zm0-2a5.2 5.2 0 1 0 0-10.4 5.2 5.2 0 0 0 0 10.4Zm10.1 4.9-5.2-5.2 1.4-1.4 5.2 5.2-1.4 1.4Z" />
          </svg>
          <input
            className="search-input"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search notes..."
          />
        </div>
        <NoteForm addNote={addNote}/>
        <NoteList notes={filteredNotes} deleteNote={deleteNote} editNote={editNote}/>
        <div className="app-footer">
          <button
            className="dark-mode-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-pressed={darkMode}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme={darkMode ? 'dark' : 'light'}
      />
    </>
  )
}
export default App;
