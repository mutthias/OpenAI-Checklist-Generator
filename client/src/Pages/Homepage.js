import React, { useEffect, useState } from 'react';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Homepage({ todo }) {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    console.log("Button clicked");
    setTodos([]);
    logout();
  }

  const [todos, setTodos] = useState([]);
  const [popup, Setpopup] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = 'http://localhost:3001';

  useEffect(() => {
    const GetTodos = async () => {
      try {
        const response = await fetch(API_BASE + '/api/tasks', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setTodos(data);
        } else {
          console.error("Error fetching tasks");
          setError("Failed to fetch data.");
        }
      } catch (error) {
        console.error("Error: ", error);
        setError("Failed to fetch data.");
      } finally {
        setIsLoading(false);
      }
    }

    if (user) {
      GetTodos();
    }
  }, [user]);

  useEffect(() => {
    console.log(todos); // Log the updated todos whenever it changes
  }, [todos]);

  const CompleteTodo = async id => {
    if (!id) return;
    const data = await fetch(API_BASE + "/api/tasks/" + id, { 
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(res => res.json());
      
    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id) {
        todo.complete = data.complete;
      }
      return todo;
    }));
  }

  const deleteTodo = async id => {
    const data = await fetch(API_BASE + "/api/tasks/" + id, { 
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(res => res.json());

    setTodos(todos => todos.filter(todo => todo._id !== data._id));
  }

  const addTodo = async () => {
    if (!user) {
      setError('You must be logged in!')
      return;
    }
    const data = await fetch(API_BASE + "/api/tasks/", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json", 
        'Authorization': `Bearer ${user.token}`
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
      <h1>Hello {user && user.email}</h1>
      <h4>Your Tasks </h4>
      <button onClick={handleClick}>Log out</button>

      <div className='todos'>
        {
          todos.map(todo => (
            <div className={"todo " + (todo.complete ? "is-complete" : "")} key={todo._id}>
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
          <div className='closePopup' onClick={() => Setpopup(false)}>x</div>
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
  );
}
