import {useState} from 'react'
function Delete({deleteNote}){
    const[id,setId]= useState('');
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(id.trim()){
            deleteNote(Number(id));
            setId('');
        }   
    };
    return(
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={id}
                    
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter the id of the note to delete..."
            />  
            <button type="submit">Delete Note</button>
        </form>
    );

}
export default Delete;