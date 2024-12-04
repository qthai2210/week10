import React from "react";
import AddTask from "../components/todolist/AddTask";
import FilterTask from "../components/todolist/FilterTask";
import TaskList from "../components/todolist/TaskList";

const TodoPage = () => {
  return (
    <div>
      <h1>Todo App</h1>
      <div className="container">
        <AddTask />
        <FilterTask />
        <TaskList />
      </div>
    </div>
  );
};

export default TodoPage;
