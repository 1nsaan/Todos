import { useState } from "react";
import axios from 'axios';
import './CreateToDo.css'; // Import the CSS file
import { unameState } from "../atoms";
import { useRecoilValue } from "recoil";

export function CreateToDo({ addTodo, onClose }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const uname = useRecoilValue(unameState);

  const handleAddTodo = async () => {
    try {
      
      const newTodo = { title, description, uname };
      const res = await axios.post("http://localhost:3000/todo", newTodo, {
        headers: { "Content-Type": "application/json" }
      });
      addTodo(res.data.newtodo);
      setTitle("");
      setDescription("");
      onClose();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div className="create-todo-overlay">
      <div className="create-todo-card">
        <h1>Create New Todo</h1>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <button onClick={handleAddTodo}>Add Todo</button>
        <button onClick={onClose} className="close-button">Close</button>
      </div>
    </div>
  );
}
