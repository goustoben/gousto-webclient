import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

const version = routes.version.recipes

export function fetchRecipes(accessToken, path, reqData) {
	return fetch(accessToken, `${endpoint('recipes', version)}/recipes/${path}`, reqData, 'GET')
}

export function fetchRecipeStock(accessToken, dayId) {
	return fetch(accessToken, `${endpoint('core')}/delivery_day/${dayId}/stock`, {}, 'GET')
}

export function fetchRecipesStockByPeriod(periodId) {
	return fetch(null, `${endpoint('core')}${routes.core.recipesStock}`, { period_id: periodId }, 'GET')
}

export function fetchRecipesStockByDate(reqData) {
	return fetch(null, `${endpoint('orders', routes.version.orders)}${routes.orders.recipesStock}`, reqData, 'GET')
}

export function fetchAvailableDates(accessToken) {
	return fetch(accessToken, `${endpoint('recipes', version)}${routes.recipes.availableDates}`, {}, 'GET')
}
