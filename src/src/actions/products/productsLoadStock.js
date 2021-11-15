import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import logger from "utils/logger"
import { fetchProductStock } from "apis/products/fetchProductStock"

export const productsLoadStock = (forceRefresh = false) => (
    async (dispatch, getState) => {
        if (forceRefresh || !getState().productsStock.size) {
            dispatch(pending(actionTypes.PRODUCTS_STOCK_CHANGE, true))
            try {
                const {data: stockData} = await fetchProductStock(getState().auth.get('accessToken'))
                const stock = {}

                Object.keys(stockData).forEach(productId => {
                    stock[productId] = stockData[productId].number
                })

                dispatch({type: actionTypes.PRODUCTS_STOCK_CHANGE, stock})
            } catch (err) {
                dispatch(error(actionTypes.PRODUCTS_STOCK_CHANGE, err.message))
                logger.error(err)
            } finally {
                dispatch(pending(actionTypes.PRODUCTS_STOCK_CHANGE, false))
            }
        }
    }
)
