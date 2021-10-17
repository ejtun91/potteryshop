import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const item = state.products.find(
        (item) =>
          item.title === action.payload.title &&
          item.size === action.payload.size
      );

      if (item) {
        item.quantity += action.payload.quantity;
        state.total += action.payload.price * action.payload.quantity;
      } else {
        state.products.push(action.payload);
        state.total += action.payload.price * action.payload.quantity;
        state.quantity += 1;
      }
    },
    addProducts: (state, action) => {
      state.products.push(action.payload);
      state.quantity = 2;
      state.total = 250;
    },
    removeProduct: (state, action) => {
      const item = state.products.find(
        (item) =>
          item.title === action.payload.title &&
          item.size === action.payload.size
      );
      if (item) {
        state.quantity -= 1;
        state.products = state.products.filter((element) => element !== item);
        state.total -= action.payload.price * action.payload.quantity;
      }
    },
    removeAllProducts: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    incrementProduct: (state, action) => {
      const item = state.products.find(
        (item) =>
          item.title === action.payload.title &&
          item.size === action.payload.size
      );

      if (item) {
        item.quantity += 1;
        state.total += action.payload.price;
      }
    },
    decrementProduct: (state, action) => {
      const item = state.products.find(
        (item) =>
          item.title === action.payload.title &&
          item.size === action.payload.size
      );

      if (item) {
        item.quantity -= 1;
        state.total -= action.payload.price;
      }
    },
  },
});

export const {
  addProduct,
  addProducts,
  removeProduct,
  removeAllProducts,
  incrementProduct,
  decrementProduct,
} = cartSlice.actions;
export default cartSlice.reducer;
