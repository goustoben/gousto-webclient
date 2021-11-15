import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import logger from "utils/logger"
import { fetchProductCategories } from "apis/products/fetchProductCategories"

export const productsLoadCategories = (forceRefresh = false) => (
    async (dispatch, getState) => {
        if (forceRefresh || !getState().productsCategories.size) {
            dispatch(pending(actionTypes.PRODUCT_CATEGORIES_RECEIVE, true))
            try {
                const {data: categories} = await fetchProductCategories(getState().auth.get('accessToken'))
                dispatch({type: actionTypes.PRODUCT_CATEGORIES_RECEIVE, categories})
            } catch (err) {
                dispatch(error(actionTypes.PRODUCT_CATEGORIES_RECEIVE, err.message))
                logger.error(err)
            } finally {
                dispatch(pending(actionTypes.PRODUCT_CATEGORIES_RECEIVE, false))
            }
        }
    }
)
