import React, {useState, useEffect} from 'react'
import Todo from './Todo';
import TodoForm from './TodoForm'
import './todo.css'

function TodoList() {
    const[todos, setTodos] = useState([])

    const getTodos = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            setTodos(data.todoList)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getTodos()
    }, [])

    const addTodo = todo => {
        
        if ( !todo.text || /^\s*$/.test(todo.text))
        {
            return;
        }
        let newTodos = [todo, ...todos];
        setTodos(newTodos);
    }    





const removeTodo = async(todo) => {
    console.log(todo._id + " frontend");

    const res = await fetch('/todo/delete', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    })
    const data = await res.json()
    if(!data) {
        console.log("some error in deleting todo")
    } else {    
        console.log(data)
        setTodos(data)
    }   
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
