import { connect } from 'react-redux'
import { getCurrentBoxSummaryView } from 'utils/boxSummary'
import { getBasketDate, getBasketOrderId, getNumPortions, getBasketRecipes } from 'selectors/basket'
import { BoxSummaryContent } from './BoxSummaryContent'

function mapStateToProps(state) {
  return {
    date: getBasketDate(state),
    orderId: getBasketOrderId(state),
    numPortions: getNumPortions(state),
    recipes: getBasketRecipes(state),
    boxSummaryCurrentView: getCurrentBoxSummaryView(state),
  }
}

const BoxSummaryContentContainer = connect(mapStateToProps)(BoxSummaryContent)

export { BoxSummaryContentContainer }

