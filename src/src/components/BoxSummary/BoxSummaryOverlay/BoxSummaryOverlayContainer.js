import { connect } from 'react-redux'
import actionTypes from 'actions/actionTypes'
import { getBasketDate, getNumPortions, getBasketRecipes } from 'selectors/basket'
import { BoxSummaryOverlay } from './BoxSummaryOverlay'

const mapStateToProps = (state) => ({
  date: getBasketDate(state),
  numPortions: getNumPortions(state),
  recipes: getBasketRecipes(state),
  orderSaveError: state.error.get(actionTypes.ORDER_SAVE),
})

const BoxSummaryOverlayContainer = connect(mapStateToProps)(BoxSummaryOverlay)

export { BoxSummaryOverlayContainer }
