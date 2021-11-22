import React from 'react'
import {RiCloseCircleLine} from 'react-icons/ri'


function Todo({todos, removeTodo}) {
    return todos.map((todo, index) => (
        <div className='todo-row' key={index}>
        <div> {todo.text} </div>

          <div className='icons'>
           <RiCloseCircleLine
           onClick={()=> removeTodo(todo._id)}
           className='delete-icon'
           />
           
          </div>
    </div>
    ));
}

export default Todo
