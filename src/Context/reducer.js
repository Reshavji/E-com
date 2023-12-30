export const initialState = {
  user: null,
  cart: [],
  apiData: null,
  // Other initial state variables
};

export const actionTypes = {
  SET_USER: "SET_USER",
  ADD_TO_CART: "ADD_TO_CART",
  UPDATE_CART: "UPDATE_CART",
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
      //... previous cases

case 'UPDATE_CART':
  return {
    ...state,
    cart: action.updatedCart,
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
