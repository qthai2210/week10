import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoThunk } from "../../features/todo/todoSlice";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.todo);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addTodoThunk(title));
    setTitle("");
  };

  return (
    <div className="add-task-container">
      <form onSubmit={handleSubmit} className="add-task">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add new task..."
          disabled={status === "loading"}
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Adding..." : "Add"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default AddTask;
