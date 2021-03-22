import * as actionType from '../actions/actionTypes'
const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.CATEGORIES:
      return { ...state, ...action.categories }
    default:
      return state
  }
}
