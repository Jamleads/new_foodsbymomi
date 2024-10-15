import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartList: [],
  },
  reducers: {
    add(state, action) {
      state.cartList.push(action.payload);
    },
    remove(state, action) {
      state.cartList = state.cartList.filter(
        (item) => item.id !== action.payload
      );
    },
    clear(state) {
      state.cartList = [];
    },
    setCartList(state, action) {
      state.cartList = action.payload;
    },
  },
});
export const { add, remove, clear, setCartList } = cartSlice.actions;
export default cartSlice.reducer;
