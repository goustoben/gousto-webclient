import { getProductParameters } from "actions/products/getProductParameters"
import { getProductsByCutoff, sortProductsByPrice } from "utils/products"
import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import logger from "utils/logger"
import { fetchProducts } from "apis/products/fetchProducts"

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

        const {accessToken, authUserId, menuId} = getProductParameters(getState(), {cutoffDate, menus})

        if (periodId) {
            reqData.period_id = periodId
        }

        if ((isProductsLargerThanBasket || reload)
            || (cutoffDate && !getProductsByCutoff(cutoffDate, products).size)) {
            dispatch(pending(actionTypes.PRODUCTS_RECEIVE, true))
            try {
                const {data: productsFromApi} = await fetchProducts(accessToken, cutoffDate, reqData, authUserId, menuId)
                const productsToDisplay = productsFromApi.reduce((productsForSaleAccumulator, product) => {
                    product.stock = productsStock.get(product.id)
                    if (product.isForSale) {
                        productsForSaleAccumulator.push(product)
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
                    dispatch(error(actionTypes.PRODUCTS_RECEIVE, null))
                }
            } catch (err) {
                dispatch(error(actionTypes.PRODUCTS_RECEIVE, err.message))
                logger.error(err)
            } finally {
                dispatch(pending(actionTypes.PRODUCTS_RECEIVE, false))
            }
        }
    }
)
