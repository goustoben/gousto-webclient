export const getTempCutoffDate = state => state.temp.get('cutoffDateTime')
export const getTempProductId = state => state.temp.get('productId')
export const getTempAddProduct = state => state.temp.get('addProduct')
export const getTempPromoCode = state => state.temp.get('promoCode', '')

export default {
  getTempCutoffDate,
}
