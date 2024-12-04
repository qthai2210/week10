import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodoThunk, toggleTaskAsync } from "../../features/todo/todoSlice";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, filterText, status, error } = useSelector(
    (state) => state.todo
  );

  useEffect(() => {
    dispatch(fetchTodoThunk());
  }, [dispatch]);

  // dispatch the toggleTaskAsync action creator
  const handleTaskClick = (taskId) => {
    dispatch(toggleTaskAsync(taskId));
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(filterText.toLowerCase())
  );

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (status === "loading") {
    return <div>Loading tasks...</div>;
  }

  return (
    <div className="task-list">
      {filteredTasks.map((task) => (
        <div
          key={task._id}
          className={`task-item ${task.completed ? "completed" : ""}`}
          onClick={() => handleTaskClick(task._id)}
        >
          {task.title}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
