import { getProductParameters } from "actions/products/getProductParameters"
import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import logger from "utils/logger"
import { fetchProduct } from "apis/products/fetchProduct"

export const productsLoadProductsById = (productIds = []) => (
    async (dispatch, getState) => {
        const newProductIds = productIds.filter(productId => !getState().products.has(productId)).sort()
        const {accessToken, authUserId, menuId} = getProductParameters(getState())

        if (newProductIds.length) {
            dispatch(pending(actionTypes.PRODUCTS_RECEIVE, true))
            try {
                const productPromises = newProductIds.map(async productId => {
                    const {data} = await fetchProduct(accessToken, productId, authUserId, menuId)

                    return data
                })
                const products = await Promise.all(productPromises)

                dispatch({type: actionTypes.PRODUCTS_RECEIVE, products})
            } catch (err) {
                dispatch(error(actionTypes.PRODUCTS_RECEIVE, err.message))
                logger.error(err)
            } finally {
                dispatch(pending(actionTypes.PRODUCTS_RECEIVE, false))
            }
        }
    }
)
