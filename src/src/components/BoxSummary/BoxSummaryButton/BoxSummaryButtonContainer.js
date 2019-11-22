import { connect } from 'react-redux'
import actions from 'actions'
import actionTypes from 'actions/actionTypes'
import { getShortlistUsed } from 'selectors/basket'
import { getCurrentBoxSummaryView } from 'utils/boxSummary'
import BoxSummaryButton from './BoxSummaryButton'

function mapStateToProps(state) {
  return {
    recipes: state.basket.get('recipes'),
    showDetails: state.boxSummaryShow.get('show') && state.boxSummaryShow.get('view') === 'desktop',
    boxSummaryCurrentView: getCurrentBoxSummaryView(state),
    showRecipeCountButton: state.request.get('browser') === 'mobile' && getShortlistUsed(state) && !state.boxSummaryShow.get('show'),
    pricingPending: state.pricing.get('pending', false),
    orderSavePending: state.pending.get('ORDER_SAVE', false),
    basketPreviewOrderChangePending: state.pending.get('BASKET_PREVIEW_ORDER_CHANGE', false),
    checkoutPending: state.pending.get(actionTypes.BASKET_CHECKOUT),
    orderSaveError: state.error.get(actionTypes.ORDER_SAVE),
    menuRecipes: state.menuRecipes,
    stock: state.menuRecipeStock,
    numPortions: state.basket.get('numPortions'),
  }
}

const BoxSummaryButtonContainer = connect(mapStateToProps, {
  boxSummaryNext: actions.boxSummaryNext
})(BoxSummaryButton)

export default BoxSummaryButtonContainer
