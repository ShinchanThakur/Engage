import React, {useState,useEffect, useRef} from 'react'

function TodoForm(props) {
    const[input, setInput] = useState("") ;

     const inputRef = useRef(null) ;

     useEffect(() => {
         inputRef.current.focus() 
     })

     const addTodoInDatabase = async(e) =>{
        e.preventDefault()

        if ( input === "") {
            return;
        }
        const todo = {
            text: input 
        }

        const res = await fetch('/todo/add', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(todo)
        })
        const data = await res.json()

        if(!data) {
            console.log("some error in fetching todo list")
        } else {    
            props.onSubmit({
                text: input
            })
            setInput('')
        }
    }

    const handleChange = e => {
        setInput(e.target.value) ;
    }
    return (
        <form className='todo-form' onSubmit={addTodoInDatabase}>
            
            
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
