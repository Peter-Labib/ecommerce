/* eslint-disable no-undef */
import Commerce from '@chec/commerce.js'

export const commerce = new Commerce(
  process.env.REACT_APP_CHEC_PUBLIC_KEY,
  true
)
export const categories = commerce.categories.list()
