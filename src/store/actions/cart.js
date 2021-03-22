import * as actionType from './actionTypes'
import { commerce } from '../../lib/commerce'

export const addToCart = (productId, quantity) => {
  return {
    type: actionType.ADD_TO_CART,
    productId,
    quantity,
  }
}

export const initiateCart = (cart) => {
  return {
    type: actionType.INITIATE_CART,
    cart,
  }
}

export const fetchCart = () => (dispatch) => {
  return commerce.cart
    .retrieve()
    .then((cart) => dispatch(initiateCart(cart)))
    .catch((e) => console.log('error', e))
}
