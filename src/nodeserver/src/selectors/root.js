// Root
export const getStock = state => state.menuRecipeStock
export const getBasket = state => state.basket
export const getRecipes = state => state.recipes
export const getMenuRecipes = state => state.menuCollectionRecipes
export const getMenuCollections = state => state.menuCollections
export const getMenuCutoffUntil = state => state.menuCutoffUntil
export const getRecieveMenuPending = state => state.menuRecieveMenuPending
export const getBoxSummaryDeliveryDays = state => state.boxSummaryDeliveryDays

export default {
	getStock,
	getBasket,
	getRecipes,
	getMenuRecipes,
	getMenuCollections,
	getMenuCutoffUntil,
	getRecieveMenuPending,
	getBoxSummaryDeliveryDays,
}
