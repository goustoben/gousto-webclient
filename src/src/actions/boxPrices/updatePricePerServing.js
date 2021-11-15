import { pricePerServing } from "routes/BoxPrices/boxPricesConfig"
import logger from "utils/logger"
import { actionTypes } from "actions/actionTypes"
import { setLowestPricePerPortion } from "actions/boxPricesPricePerPortion/setLowestPricePerPortion"
import { fetchBoxPrices } from "apis/boxPrices/fetchBoxPrices"

export const updatePricePerServing = () => async (dispatch, getState) => {
    let price = pricePerServing
    let lowestPricePerPortion = {}

    try {
        const state = getState()
        const promoCode = state.basket.get('promoCode')
        const orderId = state.basket.get('orderId')
        const tariffId = state.basket.get('tariffId')
        const isAuthenticated = state.auth.get('isAuthenticated')
        const accessToken = state.auth.get('accessToken')
        const reqData = {}

        if (orderId) {
            reqData.order_id = orderId
        } else if (promoCode) {
            reqData.promocode = promoCode
        }

        if (!isAuthenticated && tariffId) {
            reqData.tariff_id = tariffId
        }

        const {data} = await fetchBoxPrices(accessToken, reqData)
        lowestPricePerPortion = setLowestPricePerPortion(data)
        price = data[4][4].gourmet.pricePerPortion
    } catch (err) {
        logger.error(err)
    } finally {
        dispatch({
            type: actionTypes.BOXPRICE_SET_PRICE_PER_SERVING,
            price,
            ...lowestPricePerPortion,
        })
    }
}
