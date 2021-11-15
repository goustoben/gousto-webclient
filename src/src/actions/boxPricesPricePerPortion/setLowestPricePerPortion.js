import { actionTypes } from "actions/actionTypes"
import { getLowestPrice } from "actions/boxPricesPricePerPortion/getLowestPrice"

export const setLowestPricePerPortion = (data = {}) => ({
    type: actionTypes.BOXPRICE_SET_PRICE_PER_SERVING,
    lowestPricePerPortion: {
        forTwo: {
            price: getLowestPrice(data, 2, 'pricePerPortion'),
            priceDiscounted: getLowestPrice(data, 2, 'pricePerPortionDiscounted'),
        },
        forFour: {
            price: getLowestPrice(data, 4, 'pricePerPortion'),
            priceDiscounted: getLowestPrice(data, 4, 'pricePerPortionDiscounted'),
        },
    },
})
