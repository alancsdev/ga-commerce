import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

// Get initial cart state from localStorage, or set it to an empty array if not found
const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

// Create a slice for managing the cart state
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      // Check if the item already exists in the cart
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item._id === newItem._id
      );

      if (existingItemIndex !== -1) {
        // If item already exists, replace it with the new item
        state.cartItems[existingItemIndex] = newItem;
      } else {
        // If item doesn't exist, add it to the cart
        state.cartItems.push(newItem);
      }
      updateCart(state);
    },
    removeFromCart: (state, action) => {
      // Filter out the item with the provided ID
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );

      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
