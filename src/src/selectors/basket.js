export const getBasketOrderId = state => state.basket.get('orderId')
export const getBasketRecipes = state => state.basket.get('recipes')
export const getNumPortions = state => state.basket.get('numPortions')
export const getPromoCode = state => state.basket.get('promoCode', false)
export const getSignupChosenCollection = state => state.basket.get('collection')
export const getBasketOrderDetails = state => state.basket.get('orderDetails', false)
export const getBasketOrderDetailId = state => state.basket.getIn(['orderDetails', 'id'])
export const getBasketOrderPrices = state => state.basket.getIn(['orderDetails', 'prices'], null)
export const getBasketOrderTotal = state => state.basket.getIn(['orderDetails', 'prices', 'total'])
export const getBasketOrderPromoCode = state => state.basket.getIn(['orderDetails', 'prices', 'promoCode'])
export const getBasketDate = ({ basket }) => basket.get('date')

export const getShortlistLimitReached = ({basket}) => basket.getIn(['shortlist', 'shortlistLimitReached'], null )
