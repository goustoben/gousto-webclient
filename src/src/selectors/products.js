import { createSelector } from 'reselect'
import { actionTypes } from 'actions/actionTypes'
import { getCategoriesFromProducts } from 'utils/products'

export const getProducts = state => state.products

export const getProductsLoadError = state => (
  Boolean(state.error.get(actionTypes.PRODUCTS_RECEIVE, null))
)

export const getCategoriesForNavBar = createSelector(
  getProducts,
  products => getCategoriesFromProducts(products)
)

export const getProductsInStock = createSelector(
  getProducts,
  products => products.filter(product => product.get('stock') > 0)
)

export const getProductsOutOfStock = createSelector(
  getProducts,
  products => products.filter(product => product.get('stock') <= 0)
)

export const getProductsForMarket = createSelector(
  [getProductsInStock, getProductsOutOfStock],
  (inStockProducts, outOfStockProducts) => (
    inStockProducts.concat(outOfStockProducts).toJS()
  )
)
