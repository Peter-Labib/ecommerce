import * as actionType from './actionTypes'
import { commerce } from '../../lib/commerce'

const addProducts = (products) => {
  return {
    type: actionType.ADD_PRODUCTS,
    products,
  }
}

export const fetchProducts = () => (dispatch) => {
  return commerce.products
    .list()
    .then(({ data }) => dispatch(addProducts(data)))
    .catch(e=>console.log(e))
}
