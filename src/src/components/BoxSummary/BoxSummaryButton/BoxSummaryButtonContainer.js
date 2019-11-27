import { connect } from 'react-redux'
import actions from 'actions'
import actionTypes from 'actions/actionTypes'
import { getBasketRecipes, getNumPortions } from 'selectors/basket'
import { getCurrentBoxSummaryView } from 'utils/boxSummary'
import BoxSummaryButton from './BoxSummaryButton'

function mapStateToProps(state) {
  return {
    recipes: getBasketRecipes(state),
    showDetails: state.boxSummaryShow.get('show') && state.boxSummaryShow.get('view') === 'desktop',
    boxSummaryCurrentView: getCurrentBoxSummaryView(state),
    pricingPending: state.pricing.get('pending', false),
    orderSavePending: state.pending.get('ORDER_SAVE', false),
    basketPreviewOrderChangePending: state.pending.get('BASKET_PREVIEW_ORDER_CHANGE', false),
    checkoutPending: state.pending.get(actionTypes.BASKET_CHECKOUT),
    orderSaveError: state.error.get(actionTypes.ORDER_SAVE),
    menuRecipes: state.menuRecipes,
    stock: state.menuRecipeStock,
    numPortions: getNumPortions(state)
  }
}

const BoxSummaryButtonContainer = connect(mapStateToProps, {
  boxSummaryNext: actions.boxSummaryNext
})(BoxSummaryButton)

export default BoxSummaryButtonContainer
