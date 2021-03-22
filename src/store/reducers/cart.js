import * as actionType from '../actions/actionTypes'
const initialState = {
  
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.INITIATE_CART:
      return { ...state, ...action.cart }
    // case actionType.ADD_TO_CART:
    //   return {
    //       ...state,
    //      [state.]
    //      }

    default:
      return state
  }
}
