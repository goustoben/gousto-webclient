import { connect } from 'react-redux'
import { basketSum } from 'utils/basket'
import { getBasketRecipes } from 'selectors/basket'
import { getCurrentBoxSummaryView, boxSummaryViews } from 'utils/boxSummary'
import { isMobile } from 'utils/view'
import { OpenBoxButton } from './OpenBoxButton.logic'

const mapStateToProp = (state) => {
  const boxSummaryCurrentView = getCurrentBoxSummaryView(state)
  const isDetailsView = (boxSummaryCurrentView === boxSummaryViews.DETAILS)

  return ({
    recipeNumber: basketSum(getBasketRecipes(state)),
    showTextOnButton: isDetailsView,
    showDetails: state.boxSummaryShow.get('show') && isMobile(state.boxSummaryShow.get('view')),
  })

}
const OpenBoxButtonContainer = connect(mapStateToProp)(OpenBoxButton)

export { OpenBoxButtonContainer }
