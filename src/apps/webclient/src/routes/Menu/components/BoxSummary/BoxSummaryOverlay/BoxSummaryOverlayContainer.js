import { connect } from 'react-redux'
import { actionTypes } from 'actions/actionTypes'
import { getBasketDate, getNumPortions, getBasketRecipes } from 'selectors/basket'
import { getFullScreenBoxSummary } from 'selectors/features'
import { BoxSummaryOverlay } from './BoxSummaryOverlay'

const mapStateToProps = (state) => ({
  date: getBasketDate(state),
  numPortions: getNumPortions(state),
  recipes: getBasketRecipes(state),
  orderSaveError: state.error.get(actionTypes.ORDER_SAVE),
  shouldDisplayFullScreenBoxSummary: getFullScreenBoxSummary(state),
})

const BoxSummaryOverlayContainer = connect(mapStateToProps)(BoxSummaryOverlay)

export { BoxSummaryOverlayContainer }
