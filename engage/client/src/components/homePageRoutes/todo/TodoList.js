import React, {useState, useEffect} from 'react'
import Todo from './Todo';
import TodoForm from './TodoForm'
import axios from 'axios';
import './todo.css'

// let newTodos ;
function TodoList() {
    const[todos, setTodos] = useState([]) ;
    const addTodo = todo => {
        
        if ( !todo.text || /^\s*$/.test(todo.text))
        {
            return;
        }
         let newTodos = [todo, ...todos];

        setTodos(newTodos);    

    }

    const [state, setState] = useState({});
    useEffect(() => {
        axios.get('http://localhost:5200/todos/')
                .then(response => {
                    setTodos(response.data);
                    
                })
                .catch((error) => {
                    console.log(error);
                })
                return () => {
                    setState({}); // This worked for me
                  };
               
    }, [todos])
    

const removeTodo = id => {
    console.log(id + " frontend");
    axios.delete('http://localhost:5200/todos/'+id)
    .then(response => {
       
    })

    .catch((error) => {
        console.log(error);
    })
   
}


    return (
        <div className='todo-app'>
            <h1> What's the plan for today</h1>
            <TodoForm onSubmit={addTodo}/>
            <Todo 
            todos={todos} 
            removeTodo={removeTodo}
            />
        </div>
    )
}

export default TodoList
