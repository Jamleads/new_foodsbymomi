import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
  user: user ?? null,
  token: token ?? "",
  authFormOpen: false,
  isAuthenticated: (!!token && !!user) ?? false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setAuthFormOpen(state, action) {
      state.authFormOpen = action.payload;
    },
  },
});

export const { setToken, setUser, setAuthFormOpen } = authSlice.actions;
export default authSlice.reducer;
