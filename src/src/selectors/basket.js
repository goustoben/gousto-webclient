export const getNumPortions = state => state.basket.get('numPortions')
export const getBasketRecipes = state => state.basket.get('recipes')
export const getSignupChosenCollection = state => state.basket.get('collection')
export const getBasketOrderDetails = state => state.basket.get('orderDetails', false)

export default {
  getNumPortions,
  getBasketRecipes,
  getBasketOrderDetails,
  getSignupChosenCollection,
}
