import React from 'react'
import {useState, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';


const API_BASE = 'http://localhost:3001';

const Home = () => {

  const [todos, setTodos] = useState([]);
  const [popup, Setpopup] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const [id, setId] = useState('');

  const location = useLocation()

  useEffect(() => {
    if (location.state && location.state.id) {
       
      setId(location.state.id);
      GetTodos();
      // console.log(location.state.id);
      console.log(id); 
      console.log(todos);
    }
  }, [location.state]);

  const GetTodos = () => {
		fetch(API_BASE + '/todos/' + location.state.id)
			.then(res => res.json())
			.then(data => setTodos(data))
			.catch((err) => console.error("Error: ", err));
	}
  
  const completeTodo = async id => {
    const data = await fetch(API_BASE + "/todo/complete/" + id)
      .then(res => res.json());
    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id) {
        todo.complete = data.complete;
      }
      return todo;
    }));
  }

  const deleteTodo = async id => {
    const data = await fetch(API_BASE + "/todo/delete/" + id, { method: "DELETE"})
      .then(res => res.json());

      setTodos(todos => todos.filter(todo => todo._id !== data._id));
  }

  const addTodo = async () => {
    const data = await fetch(API_BASE + "/todo/new", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        text: newTodo,
        user: id 
      })
    }).then(res => res.json());
    
    setTodos([...todos, data]);
    Setpopup(false);
    setNewTodo("");
    setId(location.state.id)
  }

  return (
    <div className="homepage">
      {id ? (
        <div>
          <h1>Hello, {location.state.id}!</h1>
          <h4>Your Tasks</h4>

          <div className='todos'>
            {
              todos.map(todo => (
                <div className={"todo " + (todo.complete ? "is-complete" : "")
                } key={todo._id} onClick={() => completeTodo(todo._id)}>
                  <div className='checkbox'></div>
                  <div className='text'>{todo.text}</div>
                  <div className='delete-todo' onClick={() => deleteTodo(todo._id)}>x</div>
                </div>
              ))
            }
            
          </div>
          <div className='addPopup' onClick={() => Setpopup(true)}>+</div>
      </div>
      ) : ' '}
      
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

export default Home