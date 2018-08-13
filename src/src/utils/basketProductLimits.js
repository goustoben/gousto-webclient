import config from 'config'
import { getProductLimitReached, getProductsQtyInCategory } from 'utils/basket'

export function getAllBasketProducts(basket) {
	return basket.get('products').reduce((workingProductsAndGifts, productQty, productId) => {
		const giftProductQty = basket.getIn(['gifts', productId], 0)

		return workingProductsAndGifts.set(productId, giftProductQty + productQty)
	}, basket.get('gifts'))
}

export function getFirstProductCategoryAtLimit(productId, basket, products, productsCategories, includeGiftProducts = true) {
	let categoryAtLimit = false
	const itemCategories = products.getIn([productId, 'categories'], [])

	itemCategories.some(category => {
		const categoryId = category.get('id')
		const categoryLimit = parseInt(productsCategories.getIn([categoryId, 'boxLimit'], 0), 10)
		const qtyInCategory = getProductsQtyInCategory(categoryId, basket, products, productsCategories, includeGiftProducts)

		if (qtyInCategory >= categoryLimit) {
			categoryAtLimit = productsCategories.getIn([categoryId, 'title'])

			return true
		}

		return false
	})

	return categoryAtLimit
}

export function getProductItemLimitReached(productId, basket, products, includeGiftProducts = true) {
	const productItemLimit = parseInt(products.getIn([productId, 'boxLimit'], 0), 10)
	let totalProductQty = basket.getIn(['products', productId], 0)
	if (includeGiftProducts) {
		totalProductQty += basket.getIn(['gifts', productId], 0)
	}

	return totalProductQty >= productItemLimit ? productItemLimit : false
}

export function productCanBeAdded(productId, basket, products, productsStock, productsCategories) {
	return productsStock.get(productId, 0) !== 0 && !getProductLimitReached(productId, basket, products, productsCategories)
}

export function productsOverallLimitReached(basket, includeGiftProducts = true) {
	let boxSum = basket.get('products').reduce((sum, productQty) => sum + productQty, 0)
	if (includeGiftProducts) {
		boxSum += basket.get('gifts').reduce((sum, giftQty) => sum + giftQty, 0)
	}

	return boxSum >= config.basket.maxProductsNum
}
