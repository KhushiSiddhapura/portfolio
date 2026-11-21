import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../api/authApi";

export const loginAdmin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const data = await authApi.login({ email, password });
      const { user, token } = data;
      localStorage.setItem("khushi_portfolio_token", token);
      localStorage.setItem("khushi_portfolio_user", JSON.stringify(user));
      return { user, token };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to authenticate admin",
      );
    }
  },
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("khushi_portfolio_token");
      if (!token) throw new Error("No token found");
      const data = await authApi.getMe();
      return { user: data.user, token };
    } catch (error) {
      localStorage.removeItem("khushi_portfolio_token");
      localStorage.removeItem("khushi_portfolio_user");
      return rejectWithValue("Session expired");
    }
  },
);

export const logoutAdmin = createAsyncThunk("auth/logout", async () => {
  try {
    await authApi.logout();
  } catch (err) {
    console.error("Logout error:", err.message);
  } finally {
    localStorage.removeItem("khushi_portfolio_token");
    localStorage.removeItem("khushi_portfolio_user");
  }
});

const initialState = {
  user: JSON.parse(localStorage.getItem("khushi_portfolio_user") || "null"),
  token: localStorage.getItem("khushi_portfolio_token") || null,
  isAuthenticated: Boolean(localStorage.getItem("khushi_portfolio_token")),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
