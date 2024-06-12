import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const deleteTodos = async (todoId) => {
    const response = await fetch(`http://localhost:8080/api/v1/todos/${todoId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      fetchTodos();
    } else {
      console.log(data.error);
    }
  };

  const changeStatusTodos = async (todoId) => {
    const response = await fetch(`http://localhost:8080/api/v1/todos/toggle/status/${todoId}`, {
      method: 'PATCH',
    });
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      fetchTodos();
    } else {
      console.log(data.error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/api/v1/todos/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });
    const data = await response.json();
    console.log(data);
    if (response.status === 201) {
      fetchTodos();
      setTitle('');
      setDescription('');
    } else {
      console.log(data.error);
    }
  };

  const updateTodo = async (todo) => {
    setTitle(todo.title);
    setDescription(todo.description);
  }
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await fetch('http://localhost:8080/api/v1/todos');
    const data = await response.json();
    setTodos(data.data);
  };

  return (
    <div className="App">
      <div className="main-container">
        <div className="todoList-container">
          <h1>My Todos</h1>
          <section className="todoList">
            {todos.map((todo, index) => (
              <div className="card" key={todo._id}>
                <div className="card-header">
                  <div className="card-header-left">
                    <h2 style={{ textDecoration: todo.isComplete ? 'line-through' : 'none' }}>
                      <span>{index + 1}.</span> {todo.title}
                    </h2>
                  </div>
                  <div className="card-header-right">
                    <a onClick={() => changeStatusTodos(todo._id)}>
                      <span className="material-icons">
                        {todo.isComplete ? 'unpublished' : 'task_alt'}
                      </span>
                    </a>
                    <a className="delete-btn" onClick={() => deleteTodos(todo._id)}>
                      <span className="material-icons">delete</span>
                    </a>
                    <a onClick={()=>updateTodo(todo)}>
                      <i className="material-icons">edit</i>
                    </a>
                  </div>
                </div>
                <p>{todo.description}</p>
                <hr />
              </div>
            ))}
          </section>
        </div>
        <div className="form-container">
          <h2>Add Todo</h2>
          <form onSubmit={addTodo}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <button type="submit">Add Todo</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
