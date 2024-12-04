import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addTodo, fetchTodos, updateTodoStatus } from "../../utils/apiService";

const initialState = {
  tasks: [],
  filterText: "",
  status: "idle",
  error: null,
};

export const fetchTodoThunk = createAsyncThunk("todo/fetchTodos", async () => {
  const response = await fetchTodos();

  if (response.success) {
    return response.data;
  }
  throw new Error("Failed to fetch todos");
});

export const toggleTaskAsync = createAsyncThunk(
  "todo/toggleTaskAsync",
  async (taskId) => {
    console.log("taskId", taskId);
    const response = await updateTodoStatus(taskId);
    if (response.success) {
      console.log("responsesucess", response);
      return taskId;
    }
  }
);

export const addTodoThunk = createAsyncThunk(
  "todos/addTodo",
  async (title, { rejectWithValue }) => {
    try {
      const response = await addTodo(title);

      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to add todo";
      return rejectWithValue(errorMessage);
    }
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action) => {
      //addTodo(action.payload);
      // state.tasks.push({
      //   _id: Date.now(),
      //   title: action.payload,
      //   completed: false,
      // });
    },
    setFilterText: (state, action) => {
      state.filterText = action.payload;
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleTaskAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(toggleTaskAsync.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.tasks = state.tasks.map((task) =>
          task._id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        );
        console.log("state.tasks", state.tasks);
      })
      .addCase(toggleTaskAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchTodoThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodoThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTodoThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTodoThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addTodoThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks.push(action.payload);
      })
      .addCase(addTodoThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { addTask, setFilterText, setTasks } = todoSlice.actions;
export default todoSlice.reducer;
