import React from 'react'
import { useEffect, useState } from 'react'



export default function Homepage ({todo}) {

  const [todos, setTodos] = useState([]);
  const [popup, Setpopup] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const API_BASE = 'http://localhost:3001';

  useEffect(() => {
    GetTodos();
    console.log(todos)
  }, [])

  const GetTodos = async () => {
		await fetch(API_BASE + '/api/tasks')
			.then(res => res.json())
			.then(data => setTodos(data))
			.catch((err) => console.error("Error: ", err));
	}
  
  const CompleteTodo = async id => {
    if (!id) return;
    const data = await fetch(API_BASE + "/api/tasks/" + id, { method: "PUT" })
      .then(res => res.json());
      
    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id) {
        todo.complete = data.complete;
      }
      return todo;
    }));
  }
  
  const deleteTodo = async id => {
    const data = await fetch(API_BASE + "/api/tasks/" + id, { method: "DELETE"})
      .then(res => res.json());

      setTodos(todos => todos.filter(todo => todo._id !== data._id));
  }

  const addTodo = async () => {
    const data = await fetch(API_BASE + "/api/tasks/", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        text: newTodo
      })
    }).then(res => res.json());
    
    setTodos([...todos, data]);
    Setpopup(false);
    setNewTodo("");
  }
  return (
    <div className="App">
      <h1>Hello MattyB</h1>
      <h4>Your Tasks </h4>

      <div className='todos'>
        {
          todos.map(todo => (
            <div className={"todo " + (todo.complete ? "is-complete" : "")
            } key={todo._id}>
              <div className='checkbox' onClick={() => CompleteTodo(todo._id)}></div>
              <div className='text'>{todo.text}</div>
              <div className='delete-todo' onClick={() => deleteTodo(todo._id)}>x</div>
            </div>
          ))
        }
        
      </div>
      <div className='addPopup' onClick={() => Setpopup(true)}>+</div>

      {popup ? (
        <div className='popup'>
          <div className='closePopup' onClick={() => 
            Setpopup(false)}>x</div>
            <div className='content'>
              <h3>Add Task</h3>
              
              <input 
                type='text' 
                className='add-todo-input' 
                onChange={e => setNewTodo(e.target.value)}
                value={newTodo} />
              <div className='button' onClick={addTodo}>Create Task</div> 
            </div>
        </div>
      ) : ''}

    </div>
  )
}
