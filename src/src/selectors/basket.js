export const getNumPortions = state => state.basket.get('numPortions')
export const getBasketRecipes = state => state.basket.get('recipes')
export const getSignupChosenCollection = state => state.basket.get('collection')

export default {
	getNumPortions,
	getBasketRecipes,
	getSignupChosenCollection,
}
