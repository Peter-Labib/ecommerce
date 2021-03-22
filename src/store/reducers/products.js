import * as actionType from '../actions/actionTypes'
const initialState = {
}

export default (state = initialState, action) => {
    switch (action.type) {

    case actionType.ADD_PRODUCTS:
        return { ...state,
             ...action.products }

    default:
        return state
    }
}
