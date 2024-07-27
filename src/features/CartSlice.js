import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartList: [],
  },
  reducers: {
    add(state, action) {
      state.push(action.payload);
    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    clear() {
      return [];
    },
    setCartList(state, action) {
      state.cartList = action.payload;
    },
  },
});
export const { add, remove, clear, setCartList } = cartSlice.actions;
export default cartSlice.reducer;
