import { push } from 'react-router-redux'
import moment from 'moment'

import {
  fetchProduct,
  fetchRandomProducts,
  fetchProductCategories,
  fetchProductStock,
  fetchProducts,
  fetchRecipePairingsProducts,
} from 'apis/products'
import { getProductsByCutoff, sortProductsByPrice } from 'utils/products'
import logger from 'utils/logger'
import { getActiveMenuIdForOrderDate } from 'routes/Menu/selectors/menu'
import { getAccessToken, getAuthUserId } from '../selectors/auth'
import { actionTypes } from './actionTypes'
import statusActions from './status'

export const productDetailVisibilityChange = (productId = false) => (
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

export const productsLoadCategories = (forceRefresh = false) => (
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

function getProductParameters(state, props = {}) {
  const accessToken = getAccessToken(state)
  const authUserId = getAuthUserId(state)
  const menuId = getActiveMenuIdForOrderDate(state, props)

  return {
    accessToken,
    authUserId,
    menuId
  }
}

export const productsLoadProducts = (cutoffDate, periodId, {reload = false} = {}, menus) => (
  async (dispatch, getState) => {
    const {
      basket,
      products,
      productsStock,
      error,
      features,
    } = getState()
    const currentProductsInBasket = basket.get('products')
    const isProductsLargerThanBasket = products.size <= currentProductsInBasket.size
    const sort = 'position'
    const reqData = {
      sort,
    }

    const { accessToken, authUserId, menuId } = getProductParameters(getState(), { cutoffDate, menus })

    if (periodId) {
      reqData.period_id = periodId
    }

    if ((isProductsLargerThanBasket || reload)
      || (cutoffDate && !getProductsByCutoff(cutoffDate, products).size)) {
      dispatch(statusActions.pending(actionTypes.PRODUCTS_RECEIVE, true))
      try {
        const { data: productsFromApi } = await fetchProducts(accessToken, cutoffDate, reqData, authUserId, menuId)
        const productsToDisplay = productsFromApi.reduce((productsForSaleAccumulator, product) => {
          if (product.isForSale) {
            productsForSaleAccumulator.push({
              ...product,
              stock: productsStock.get(product.id),
            })
          }

          return productsForSaleAccumulator
        }, [])

        const shouldSortByPrice = features.getIn(['sortMarketProducts', 'value'], false)
        const productsToStore = shouldSortByPrice ? sortProductsByPrice(productsToDisplay) : productsToDisplay

        dispatch({
          type: actionTypes.PRODUCTS_RECEIVE,
          products: productsToStore,
          cutoffDate,
          reload
        })
        if (error[actionTypes.PRODUCTS_RECEIVE]) {
          dispatch(statusActions.error(actionTypes.PRODUCTS_RECEIVE, null))
        }
      } catch (err) {
        dispatch(statusActions.error(actionTypes.PRODUCTS_RECEIVE, err.message))
        logger.error(err)
      } finally {
        dispatch(statusActions.pending(actionTypes.PRODUCTS_RECEIVE, false))
      }
    }
  }
)

export const productsLoadRandomProducts = (limit, imageSizes) => (
  async (dispatch, getState) => {
    const { accessToken, authUserId, menuId } = getProductParameters(getState())

    if (!getState().randomProducts.size) {
      dispatch(statusActions.pending(actionTypes.PRODUCTS_RANDOM_RECEIVE, true))
      dispatch(statusActions.error(actionTypes.PRODUCTS_RANDOM_RECEIVE, null))
      try {
        const { data: products } = await fetchRandomProducts(accessToken, limit, imageSizes, authUserId, menuId)
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

export const productsLoadProductsById = (productIds = []) => (
  async (dispatch, getState) => {
    const newProductIds = productIds.filter(productId => !getState().products.has(productId)).sort()
    const { accessToken, authUserId, menuId } = getProductParameters(getState())

    if (newProductIds.length) {
      dispatch(statusActions.pending(actionTypes.PRODUCTS_RECEIVE, true))
      try {
        const productPromises = newProductIds.map(async productId => {
          const { data } = await fetchProduct(accessToken, productId, authUserId, menuId)

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

export const productsLoadStock = (forceRefresh = false) => (
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

export const productsLoadRecipePairings = (recipeIds, menuStartDate) => (
  async (dispatch, getState) => {
    if (Array.isArray(recipeIds) && recipeIds.length > 0 && moment(menuStartDate, 'YYYY-MM-DD').isValid()) {
      dispatch(statusActions.pending(actionTypes.PRODUCTS_RECIPE_PAIRINGS_RECIEVE, true))
      try {
        const { data: recipePairings, meta: { total: totalProducts } } = await fetchRecipePairingsProducts(getState().auth.get('accessToken'), recipeIds, menuStartDate)
        dispatch({ type: actionTypes.PRODUCTS_RECIPE_PAIRINGS_RECIEVE, recipePairings })
        dispatch({ type: actionTypes.PRODUCTS_RECIPE_PAIRINGS_UPDATE_TOTAL_PRODUCTS, totalProducts })
      } catch (err) {
        dispatch(statusActions.error(actionTypes.PRODUCTS_RECIPE_PAIRINGS_RECIEVE, err.message))
        logger.error(err)
      } finally {
        dispatch(statusActions.pending(actionTypes.PRODUCTS_RECIPE_PAIRINGS_RECIEVE, false))
      }
    }
  }
)

export const trackProductFiltering = (eventName, eventAction, eventType, primaryCategory, productsPerCategory) => ({
  type: actionTypes.PRODUCTS_FILTER_TRACKING,
  trackingData: {
    actionType: eventName,
    eventName,
    eventAction,
    eventType,
    eventProperties: {
      categoryProperties: { primaryCategory, productsPerCategory }
    }
  }
})

export const productsActions = {
  productDetailVisibilityChange,
  productsLoadCategories,
  productsLoadProducts,
  productsLoadRandomProducts,
  productsLoadProductsById,
  productsLoadStock,
  productsLoadRecipePairings,
  trackProductFiltering,
}

export default productsActions
