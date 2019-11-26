import { createSelector } from 'reselect'
import { getCategoriesFromProducts, getProductsByCategoryId } from 'utils/products'

export const getProducts = state => state.products
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

export const getDesserts = createSelector(
  getProducts,
  products => getProductsByCategoryId(products, 'fec10d0e-bf7d-11e5-90a9-02fada0dd3b9').toJS()
)
