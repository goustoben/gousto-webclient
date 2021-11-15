import { getProductParameters } from "actions/products/getProductParameters"
import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import logger from "utils/logger"
import { fetchRandomProducts } from "apis/products/fetchRandomProducts"

export const productsLoadRandomProducts = (limit, imageSizes) => (
    async (dispatch, getState) => {
        const {accessToken, authUserId, menuId} = getProductParameters(getState())

        if (!getState().randomProducts.size) {
            dispatch(pending(actionTypes.PRODUCTS_RANDOM_RECEIVE, true))
            dispatch(error(actionTypes.PRODUCTS_RANDOM_RECEIVE, null))
            try {
                const {data: products} = await fetchRandomProducts(accessToken, limit, imageSizes, authUserId, menuId)
                dispatch({type: actionTypes.PRODUCTS_RANDOM_RECEIVE, products})
            } catch (err) {
                dispatch(error(actionTypes.PRODUCTS_RANDOM_RECEIVE, err.message))
                logger.error(err)
            } finally {
                dispatch(pending(actionTypes.PRODUCTS_RANDOM_RECEIVE, false))
            }
        }
    }
)
