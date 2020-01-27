import { connect } from 'react-redux'

import actions from 'actions'
import { actionTypes } from 'actions/actionTypes'
import { shouldJfyTutorialBeVisible } from 'actions/tutorial'

import Menu from './Menu'

const flattenRecipes = (recipes) => {
  const recipesToJs = recipes.toJS()
  const flattenedRecipes = []

  Object.keys(recipesToJs).forEach(key => {
    for (let i = 0; i < recipesToJs[key]; i++) {
      flattenedRecipes.push(key)
    }
  })

  return flattenedRecipes
}

function mapStateToProps(state, ownProps) {
  const query = ownProps.location && ownProps.location.query

  return {
    boxSummaryShow: state.boxSummaryShow.get('show'),
    menuCollectionRecipes: state.menuCollectionRecipes,
    menuBrowseCTAShow: state.menuBrowseCTAShow,
    boxSummaryDeliveryDays: state.boxSummaryDeliveryDays,
    query: query || {},
    params: ownProps.params,
    disabled: state.auth.get('isAdmin'),
    isAuthenticated: state.auth.get('isAuthenticated'),
    tariffId: state.basket.get('tariffId'),
    menuLoadingBoxPrices: state.pending.get(actionTypes.MENU_BOX_PRICES_RECEIVE, false),
    menuVariation: state.features.getIn(['menuRecipes', 'value']),
    forceLoad: state.menu.get('forceLoad', false),
    recipesCount: flattenRecipes(state.basket.get('recipes')).length,
    postcode: state.basket.get('postcode'),
  }
}

const mapDispatchToProps = {
  menuLoadBoxPrices: actions.menuLoadBoxPrices,
  boxDetailsVisibilityChange: actions.boxSummaryVisibilityChange,
  menuBrowseCTAVisibilityChange: actions.menuBrowseCTAVisibilityChange,
  basketRestorePreviousValues: actions.basketRestorePreviousValues,
  boxSummaryDeliveryDaysLoad: actions.boxSummaryDeliveryDaysLoad,
  menuLoadDays: actions.menuLoadDays,
  loginVisibilityChange: actions.loginVisibilityChange,
  basketNumPortionChange: actions.basketNumPortionChange,
  shouldJfyTutorialBeVisible,
  orderHasAnyProducts: actions.orderHasAnyProducts,
  orderUpdateProducts: actions.orderUpdateProducts,
  orderCheckoutAction: actions.orderCheckout,
  selectCurrentCollection: actions.changeCollectionById,
}

const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(Menu)

export {
  flattenRecipes,
  MenuContainer
}
