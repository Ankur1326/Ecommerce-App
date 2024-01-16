import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (!itemPresent) {
        state.cart.push({ ...action.payload, quantity: 1 });
      } else {
        itemPresent.quantity++;
      }
    },
  },
  removeFromCart: (state, action) => {
    state.cart = state.cart.filter((item) => item.id !== action.payload.id);
  },
  incrementQuantity: (state, action) => {
    const itemPresent = state.cart.find(
      (item) => item.id === action.payload.id
    );
    itemPresent.quantity++;
  },
  decrementquantity: () => {
    const itemPresent = state.cart.find(
      (item) => item.id === action.payload.id
    );
    if (itemPresent.quantity === 1) {
      itemPresent.quantity = 0;
      state.cart = state.cart.filter((item) => item.id !== action.payload.id);
    } else {
      itemPresent.quantity--;
    }
  },
  cleanCart: (state) => {
    state.cart = [];
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementquantity,
  cleanCart,
} = cartSlice.actions;

export default cartSlice.reducer
