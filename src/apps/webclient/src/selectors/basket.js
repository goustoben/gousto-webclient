import Immutable from 'immutable'

const emptyList = Immutable.List([])

export const getBasketOrderId = state => state.basket.get('orderId')
export const isBasketTransactionalOrder = state => !getBasketOrderId(state)
export const getBasketRecipes = state => state.basket.get('recipes', emptyList)
export const getBasketRecipesCount = state => state.basket.get('recipes', emptyList).reduce((sum ,recipeQuantity) => sum + recipeQuantity, 0)
export const getBasketTotalRecipes = state => state.basket.get('recipes').reduce((acc, cur) => acc + cur)
export const getNumPortions = state => state.basket.get('numPortions')
export const getNumRecipes = state => state.basket.get('numRecipes')
export const getPromoCode = state => state.basket.get('promoCode', false)
export const getPreviewOrderId = state => state.basket.get('previewOrderId')
export const getSignupChosenCollection = state => state.basket.get('collection')
export const getBasketOrderDetails = state => state.basket.get('orderDetails', false)
export const getBasketOrderDetailId = state => state.basket.getIn(['orderDetails', 'id'])
export const getBasketOrderDetailDate = state => state.basket.getIn(['orderDetails', 'deliveryDate'])
export const getBasketOrderPrices = state => state.basket.getIn(['orderDetails', 'prices'], null)
export const getBasketOrderTotal = state => state.basket.getIn(['orderDetails', 'prices', 'total'])
export const getBasketOrderPromoCode = state => state.basket.getIn(['orderDetails', 'prices', 'promoCode'])
export const getBasketDate = ({ basket }) => basket.get('date')
export const getBasketLimitReached = ({ basket }) => basket.get('limitReached', false)
export const getBasketSlotId = ({ basket }) => basket.get('slotId')
export const getBasketPostcode = ({ basket }) => basket.get('postcode')
export const getBasketMenuId = ({ basket }) => basket.get('currentMenuId')

export const getBasketProducts = ({ basket }) => basket.get('products')

export const shouldShowBoxSummary = (state) => !getBasketSlotId(state) && !!getBasketPostcode(state)

export const getChosenAddressId = ({ basket }) => (basket.getIn(['chosenAddress', 'id'], null))

export const getBasketTariffId = ({ basket }) => basket.get('tariffId')

export default {
  getBasketOrderId,
  getBasketRecipes,
  getBasketTotalRecipes,
  getNumPortions,
  getPromoCode,
  getSignupChosenCollection,
  getBasketOrderDetails,
  getBasketOrderDetailId,
  getBasketOrderDetailDate,
  getBasketOrderPrices,
  getBasketOrderTotal,
  getBasketOrderPromoCode,
  getBasketDate,
  getBasketLimitReached,
  getBasketSlotId,
  getBasketPostcode,
  getBasketProducts,
  getPreviewOrderId
}
