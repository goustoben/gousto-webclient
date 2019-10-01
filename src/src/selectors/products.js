import { createSelector } from 'reselect'
import { getCategoriesFromProducts } from 'utils/products'

export const getProducts = state => state.products
export const getCategoriesForNavBar = createSelector(
  getProducts,
  products => getCategoriesFromProducts(products)
)
