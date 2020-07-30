import { createSelector } from 'reselect'
import { getProducts } from 'selectors/products'

export const getBasketOrderId = state => state.basket.get('orderId')
export const getBasketRecipes = state => state.basket.get('recipes')
export const getBasketTotalRecipes = state => state.basket.get('recipes').reduce((acc, cur) => acc + cur)
export const getNumPortions = state => state.basket.get('numPortions')
export const getPromoCode = state => state.basket.get('promoCode', false)
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
export const getBasketProductsCost = createSelector(
  [getBasketProducts, getProducts],
  (basketProducts, products) => {
    const basketProductsCost = basketProducts.reduce((totalCost, productQuantity, productId) => {
      if (products.size) {
        const product = products.get(productId)
        const listPrice = parseFloat(product.get('listPrice'))

        totalCost += productQuantity * listPrice
      }

      return totalCost
    }, 0)

    return basketProductsCost.toFixed(2)
  }
)

export const shouldShowBoxSummary = (state) => !getBasketSlotId(state) && !!getBasketPostcode(state)

export const getChosenAddressId = ({ basket }) => (basket.getIn(['chosenAddress', 'id'], null))

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
  getBasketProductsCost,
}
