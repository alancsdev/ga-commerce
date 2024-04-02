export const addDecimals = (n) => {
  // return (Math.round(n * 100) / 100).toFixed(2);
  return n;
};

export const updateCart = (state) => {
  //Calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.amount, 0)
  );
  //state.itemsPrice.toFixed(2);

  //Calculate shipping price
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  //Calculate tax price - 15%
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

  //Calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};
