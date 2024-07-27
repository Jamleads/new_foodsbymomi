import { createSlice } from "@reduxjs/toolkit";

const favSlice = createSlice({
  name: "favourite",
  initialState: [],
  reducers: {
    addFav(state, action) {
      state.push(action.payload);
    },
    removeFav(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    clearFav() {
      return [];
    },
  },
});
export const { addFav, removeFav, clearFav } = favSlice.actions;
export default favSlice.reducer;
