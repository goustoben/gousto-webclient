import { connect } from 'react-redux'
import actionTypes from 'actions/actionTypes'
import { BoxSummaryOverlay } from './BoxSummaryOverlay'

const mapStateToProps = (state) => ({
  date: state.basket.get('date'),
  numPortions: state.basket.get('numPortions'),
  recipes: state.basket.get('recipes'),
  orderSaveError: state.error.get(actionTypes.ORDER_SAVE),
})

const BoxSummaryOverlayContainer = connect(mapStateToProps)(BoxSummaryOverlay)

export { BoxSummaryOverlayContainer }
