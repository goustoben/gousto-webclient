import * as basketUtils from 'utils/basket'
import * as trackingKeys from 'actions/trackingKeys'

export function basketOrderLoaded(action, state) {
  return {
    type: trackingKeys.loadBasketOrder,
    data: {
      numGifts: basketUtils.basketSum(state.basket.get('gifts')),
      numProducts: basketUtils.basketSum(state.basket.get('products')),
      numRecipes: basketUtils.basketSum(state.basket.get('recipes')),
    },
  }
}

export function menuBoxPricesReceive(action, state) {
  return {
    type: trackingKeys.recieveMenuOrderPrices,
    data: {
      menuBoxPrices: state.menuBoxPrices,
    },
  }
}

export function appliedPromocode(action, state) {
  return {
    type: action.type,
    data: {
      promocodeApplied: state.basket.get('promoCodeApplied'),
    },
  }
}

export function promocodeChange(action, state) {
  return {
    type: action.type,
    data: {
      promocode: state.basket.get('promocode'),
    },
  }
}

export function signupCheckoutStepChange(action, state) {
  return {
    type: action.type,
    data: {
      step: action.step,
      basket: state.basket.toJS(),
    },
  }
}
