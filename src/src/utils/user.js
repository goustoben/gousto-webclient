import Immutable from 'immutable' /* eslint-disable no-caps */

export function getUserOrderById(orderId, userOrders = new Immutable.List([])) {
	return userOrders.find(order => order.get('id') === orderId, null, new Immutable.Map({}))
}

export function getUserOrderGiftIds(userOrder = new Immutable.Map({})) {
	return userOrder.get('giftItems', new Immutable.List([])).map(giftItem => giftItem.get('itemableId')).toArray()
}

export function getUserOrderProductIds(userOrder = new Immutable.Map({})) {
	return userOrder.get('productItems', new Immutable.List([])).map(productItem => productItem.get('itemableId')).toArray()
}

export function getUserOrderGiftProductIds(userOrder = new Immutable.Map({})) {
	return userOrder.get('giftItems', new Immutable.List([]))
		.filter(productItem => productItem.get('itemableType') === 'Product')
		.map(productItem => productItem.get('itemableId'))
		.toArray()
}

export function getUserOrderRecipeIds(userOrder = new Immutable.Map({})) {
	return userOrder.get('recipeItems', new Immutable.List([])).map(recipeItem => recipeItem.get('itemableId')).toArray()
}

export default {
	getUserOrderById,
	getUserOrderGiftIds,
	getUserOrderGiftProductIds,
	getUserOrderProductIds,
	getUserOrderRecipeIds,
}
