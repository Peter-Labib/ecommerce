import * as actionType from './actionTypes'
import { commerce } from '../../lib/commerce'

const categories = (categories) => {
  return {
    type: actionType.CATEGORIES,
    categories,
  }
}

export const fetchCategories = () => (dispatch) => {
  return commerce.categories
    .list()
    .then(({data}) => {
      dispatch(categories(data))
    })
    .catch((e) => console.log('error', e))
}
