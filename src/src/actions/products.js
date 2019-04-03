import { push } from 'react-router-redux'
import { fetchProduct, fetchRandomProducts, fetchProductCategories, fetchProductStock, fetchProducts } from 'apis/products'
import { getProductsByCutoff } from 'utils/products'
import logger from 'utils/logger'
import actionTypes from './actionTypes'
import statusActions from './status'

const productDetailVisibilityChange = (productId) => (
  (dispatch, getState) => {
    const prevLoc = getState().routing.locationBeforeTransitions
    const query = { ...prevLoc.query }

    dispatch({
      type: actionTypes.PRODUCT_DETAIL_VISIBILITY_CHANGE,
      trackingData: {
        actionType: actionTypes.PRODUCT_DETAIL_VISIBILITY_CHANGE,
        productId: productId || query.productDetailId,
        show: !!productId,
      },
    })

    if (productId) {
      query.productDetailId = productId
    } else {
      delete query.productDetailId
    }

    const newLoc = { ...prevLoc, query }
    dispatch(push(newLoc))
  }
)

const productsLoadCategories = (forceRefresh = false) => (
  async (dispatch, getState) => {
    if (forceRefresh || !getState().productsCategories.size) {
      dispatch(statusActions.pending(actionTypes.PRODUCT_CATEGORIES_RECEIVE, true))
      try {
        const { data: categories } = await fetchProductCategories(getState().auth.get('accessToken'))
        dispatch({ type: actionTypes.PRODUCT_CATEGORIES_RECEIVE, categories })
      } catch (err) {
        dispatch(statusActions.error(actionTypes.PRODUCT_CATEGORIES_RECEIVE, err.message))
        logger.error(err)
      } finally {
        dispatch(statusActions.pending(actionTypes.PRODUCT_CATEGORIES_RECEIVE, false))
      }
    }
  }
)

const productsLoadProducts = (cutoffDate) => (
  async (dispatch, getState) => {
    if (!getState().products.size ||
      (cutoffDate && !getProductsByCutoff(cutoffDate, getState().products).size)) {
      dispatch(statusActions.pending(actionTypes.PRODUCTS_RECEIVE, true))
      try {
        const { data: products } = await fetchProducts(getState().auth.get('accessToken'), cutoffDate)
        const { productsStock } = getState()
        const productsInStock = products.filter(product => productsStock.get(product.id) > 0 && product.isForSale)
        dispatch({ type: actionTypes.PRODUCTS_RECEIVE, products: productsInStock, cutoffDate })
      } catch (err) {
        dispatch(statusActions.error(actionTypes.PRODUCTS_RECEIVE, err.message))
        logger.error(err)
      } finally {
        dispatch(statusActions.pending(actionTypes.PRODUCTS_RECEIVE, false))
      }
    }
  }
)

const productsLoadRandomProducts = (limit, imageSizes) => (
  async (dispatch, getState) => {
    if (!getState().randomProducts.size) {
      dispatch(statusActions.pending(actionTypes.PRODUCTS_RANDOM_RECEIVE, true))
      dispatch(statusActions.error(actionTypes.PRODUCTS_RANDOM_RECEIVE, null))
      try {
        const { data: products } = await fetchRandomProducts(getState().auth.get('accessToken'), limit, imageSizes)
        dispatch({ type: actionTypes.PRODUCTS_RANDOM_RECEIVE, products })
      } catch (err) {
        dispatch(statusActions.error(actionTypes.PRODUCTS_RANDOM_RECEIVE, err.message))
        logger.error(err)
      } finally {
        dispatch(statusActions.pending(actionTypes.PRODUCTS_RANDOM_RECEIVE, false))
      }
    }
  }
)

const productsLoadProductsById = (productIds = []) => (
  async (dispatch, getState) => {
    const newProductIds = productIds.filter(productId => !getState().products.has(productId)).sort()

    if (newProductIds.length) {
      dispatch(statusActions.pending(actionTypes.PRODUCTS_RECEIVE, true))
      try {
        const productPromises = newProductIds.map(async productId => {
          const { data } = await fetchProduct(getState().auth.get('accessToken'), productId)

          return data
        })
        const products = await Promise.all(productPromises)

        dispatch({ type: actionTypes.PRODUCTS_RECEIVE, products })
      } catch (err) {
        dispatch(statusActions.error(actionTypes.PRODUCTS_RECEIVE, err.message))
        logger.error(err)
      } finally {
        dispatch(statusActions.pending(actionTypes.PRODUCTS_RECEIVE, false))
      }
    }
  }
)

const productsLoadStock = (forceRefresh = false) => (
  async (dispatch, getState) => {
    if (forceRefresh || !getState().productsStock.size) {
      dispatch(statusActions.pending(actionTypes.PRODUCTS_STOCK_CHANGE, true))
      try {
        const { data: stockData } = await fetchProductStock(getState().auth.get('accessToken'))
        const stock = {}

        Object.keys(stockData).forEach(productId => {
          stock[productId] = stockData[productId].number
        })

        dispatch({ type: actionTypes.PRODUCTS_STOCK_CHANGE, stock })
      } catch (err) {
        dispatch(statusActions.error(actionTypes.PRODUCTS_STOCK_CHANGE, err.message))
        logger.error(err)
      } finally {
        dispatch(statusActions.pending(actionTypes.PRODUCTS_STOCK_CHANGE, false))
      }
    }
  }
)

export default {
  productDetailVisibilityChange,
  productsLoadCategories,
  productsLoadProducts,
  productsLoadRandomProducts,
  productsLoadProductsById,
  productsLoadStock,
}
