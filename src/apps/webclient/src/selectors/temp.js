export const getTemp = (state) => state.temp
export const getTempCutoffDate = state => getTemp(state).get('cutoffDateTime')
export const getTempProductId = state => getTemp(state).get('productId')
export const getTempAddProduct = state => getTemp(state).get('addProduct')
export const getTempPromoCode = state => getTemp(state).get('promoCode', '')
