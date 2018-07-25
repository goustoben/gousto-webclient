export default (store) => {
	let persistentCookies = {
		features: false,
		signup: {
			wizard: {
				steps: false,
			},
		},
		tracking: false,
		promoAgeVerified: false,
	}

	if (!store.basket.get('orderId')) {
		persistentCookies = Object.assign(persistentCookies, {
			/* one layer deep only, add the resulting cookie names
			to CookieGuard.php in underscore form */
			basket: {
				postcode: true,
				date: true,
				address: false,
				numPortions: true,
				slotId: true,
				recipes: false,
				recipesPositions: false,
				previewOrderId: true,
				stepsOrder: false,
				collection: true,
				promoCode: true,
			},
			filters: {
				currentCollectionId: true,
			},
		})
	}

	return persistentCookies
}

export const cookiePrefix = 'goustoStateStore'

export const cookieExpiries = {
	default: 2 / 24,
	features: 7,
	tracking: 30,
}
