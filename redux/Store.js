import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./CartReducer";

export default configureStore({
  reducer: {
    cart: cartSlice,
  },
});
