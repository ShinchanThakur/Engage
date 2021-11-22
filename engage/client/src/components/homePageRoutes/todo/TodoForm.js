import axios from 'axios';
import React, {useState,useEffect, useRef} from 'react'

function TodoForm(props) {
    const[input, setInput] = useState("") ;

     const inputRef = useRef(null) ;

     useEffect(() => {
         inputRef.current.focus() 
     })

    const handleSubmit = e => {
        e.preventDefault() ;
        if ( input === "") {
            return;
        }
        const todo = {
            text: input 
        }
        axios.post('http://localhost:5200/todos/add', todo)
        .then(res => console.log(res.data));

        props.onSubmit({
            text: input
        })
        
        setInput('');
    }

    const handleChange = e => {
        
        setInput(e.target.value) ;

    }
    return (
        <form className='todo-form' onSubmit={handleSubmit}>
            
            
         <input 
            type='text'
            placeholder = 'Add a todo'
            value={input}
            name='text'
            onChange={handleChange}
            ref={inputRef}
            className='todo-input'/>
            <button className='todo-button'>Add todo</button>
        
        
       
        </form>
    )
}

export default TodoForm
