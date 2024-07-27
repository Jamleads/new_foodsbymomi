import { createSlice } from "@reduxjs/toolkit";

const categoryProductSlice = createSlice({
  name: "categoryProduct",
  initialState: {
    products: [],
    allcategories: [],
    selectedCatProduct: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setAllCategories: (state, action) => {
      state.allcategories = action.payload;
    },
    selectedCatProduct: (state, action) => {
      state.selectedCatProduct = action.payload;
    },
  },
});

export const { setProducts, selectedCatProduct, setAllCategories } =
  categoryProductSlice.actions;
export default categoryProductSlice.reducer;
