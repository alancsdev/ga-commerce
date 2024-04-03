export const updateCart = (state) => {
  //Calculate items price
  state.itemsPrice = state.cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  //Calculate shipping price
  state.shippingPrice = (state.itemsPrice > 100 ? 0 : 10).toFixed(2);

  //Calculate tax price - 15%
  state.taxPrice = Number((0.15 * state.itemsPrice).toFixed(2));

  //Calculate total price
  state.totalPrice =
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice);

  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};
