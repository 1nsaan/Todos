import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { todosState } from '../atoms'; // Adjust the import path as necessary

export function Todos() {
  const todos = useRecoilValue(todosState);
  const setTodos = useSetRecoilState(todosState); // Use to update the todos state

  const handleComplete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/completed`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            todo._id === id ? { ...todo, completed: true } : todo
          )
        );
      } else {
        console.error('Failed to mark todo as completed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClear = async (id) => {

    try {
      const response = await fetch('http://localhost:3000/clear', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
        console.log('Todo successfully deleted');
      } else {
        console.error('Failed to delete todo:', await response.text());
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="todo-list" style={{'backgroundColor':'#E2DAD6'}}>
      {todos.map(todo => (
        <div key={todo._id} className="todo-item" style={{ border: '1px solid #ddd', borderRadius: '5px', padding: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h1>{todo.title}</h1>
            <h4>{todo.completed ? 'Completed' : 'Incomplete'}</h4>
          </div>
          <p>{todo.description}</p>
          {!todo.completed && (
            <button
              onClick={() => handleComplete(todo._id)}
              style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
            >
              Mark as Completed
            </button>
          )}
          <button
            onClick={() => handleClear(todo._id)}
            style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', marginLeft: '8px' }}
          >
            Clear Task
          </button>
        </div>
      ))}
    </div>
  );
}
