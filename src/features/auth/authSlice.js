import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../api/authService";
import { setToken } from "../../utils/auth";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      setToken(response.access_token);
      return response;
    } catch (err) {
      // Improve error handling
      const errorMessage =
        err.response?.data?.message || err.message || "Login failed";
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState = {
  isLoggedIn: false,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.removeItem("isLoggedIn");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
