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
    variants: false,
    basket: {
    }
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
        subscriptionOption: true,
      },
      filters: {
        currentCollectionId: true,
        recipeGroup: true
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
  basket_date: 7,
  basket_numPortions: 7,
  basket_postcode: 7,
  basket_recipes: 7,
  basket_promoCode: 60,
}
