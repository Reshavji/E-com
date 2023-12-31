export const initialState = {
  user: null,
  cart: [],
  apiData: null,
  // Other initial state variables
};

export const actionTypes = {
  SET_USER: "SET_USER",
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART", // New action type
  SET_API_DATA: "SET_API_DATA",
  // Other action types
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.item],
      };
    case actionTypes.REMOVE_FROM_CART: // New case for removing from cart
      const updatedCart = state.cart.filter(item => item.id !== action.id);
      return {
        ...state,
        cart: updatedCart,
      };
    case actionTypes.SET_API_DATA:
      return {
        ...state,
        apiData: action.data,
      };
    // Other cases for different actions
    default:
      return state;
  }
};

export default reducer;
