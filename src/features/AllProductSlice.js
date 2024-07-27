import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  allProducts: [],
};

const allProductSlice = createSlice({
  name: "allData",
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
  },
});

export const { setAllProducts } = allProductSlice.actions;
export default allProductSlice.reducer;
