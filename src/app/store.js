import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "../features/Location";
import cartSlice from "../features/CartSlice";
import favSlice from "../features/FavSlice";
import singleProductReducer from "../features/SingleProuctSlice";
import categoryProductReducers from "../features/CategoryProductSlice";
import allProductReducers from "../features/AllProductSlice";
import { api } from "../services/api";
import authReducer from "../features/AuthSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    allProducts: allProductReducers,
    [api.reducerPath]: api.reducer,
    location: locationReducer,
    cart: cartSlice,
    fav: favSlice,
    product: singleProductReducer,
    categoryProduct: categoryProductReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
