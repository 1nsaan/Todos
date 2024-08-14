import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { todosState, unameState } from '../atoms'; // Adjust the import path as necessary
import './Interface.css'; // Import the CSS file
import { CreateToDo } from './CreateToDo';
import { Todos } from './Todos';
import { useState } from 'react';

function Interface() {
    const [todos, setTodos] = useRecoilState(todosState);
    const [showCreateToDo, setShowCreateToDo] = useState(false);
    const username = useRecoilValue(unameState);
    useEffect(() => {
        fetch(`http://localhost:3000/todos?username=${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const json = await res.json();
                console.log(json.todos);
                if (json && json.todos) {
                    setTodos(json.todos);
                }
            })
            .catch((err) => {
                console.error("Failed to fetch todos:", err);
                setTodos([]);
            });
    }, [setTodos]);

    const addTodo = (newTodo) => {
        setTodos((prevTodos) => [...prevTodos, newTodo]);
    };

    const handleToggleCreateToDo = () => {
        setShowCreateToDo(!showCreateToDo);
    };

    return (
        <div className="container">
            <button onClick={handleToggleCreateToDo}>
                {showCreateToDo ? "Hide Form" : "Add Todo"}
            </button>
            {showCreateToDo && <CreateToDo addTodo={addTodo} onClose={handleToggleCreateToDo} />}
            <h1>Todos:</h1>
            <Todos id="todos" />
        </div>
    );
}

export default Interface;