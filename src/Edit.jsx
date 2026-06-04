import {useState} from 'react'
function Edit({editNote}){
    const[id,setId]= useState('');
    const[text,setText]= useState('');
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(id.trim() && text.trim()){
            editNote(Number(id),text);
            setId('');
            setText('');
        }
    };
    return(
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={id}      
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter the id of the note to edit..."
            />  
            <input
                type="text"
                value={text}    
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter the new text for the note..."
            />
            <button type="submit">Edit Note</button>    
        </form>
    );
}
export default Edit;