import React from "react";
import { useDispatch } from "react-redux";
import { setFilterText } from "../../features/todo/todoSlice";

const FilterTask = () => {
  const dispatch = useDispatch();

  return (
    <div className="filter-task">
      <input
        type="text"
        onChange={(e) => dispatch(setFilterText(e.target.value))}
        placeholder="Filter tasks..."
      />
    </div>
  );
};

export default FilterTask;
