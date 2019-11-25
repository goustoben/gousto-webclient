import { connect } from 'react-redux'
import { basketSum } from 'utils/basket'
import { getBasketRecipes, getShortlistRecipeIds, getShortlistUsed } from 'selectors/basket'
import { getCurrentBoxSummaryView, boxSummaryViews } from 'utils/boxSummary'
import { getShortlistTutorialFirstStep, getShortlistTutorialSecondStep } from 'selectors/tutorial'
import { getShortlist } from 'selectors/features'
import { isMobile } from 'utils/view'
import { OpenBoxButton } from './OpenBoxButton.logic'

const shouldShortlistTutorialShow = (state) => (
  getShortlistTutorialFirstStep(state) && !getShortlistTutorialSecondStep(state)
)

const mapStateToProp = (state) => {
  const boxSummaryCurrentView = getCurrentBoxSummaryView(state)
  const isDetailsView = (boxSummaryCurrentView === boxSummaryViews.DETAILS)

  return ({
    recipeNumber: basketSum(getBasketRecipes(state)),
    shortlistRecipeNumber: basketSum(getShortlistRecipeIds(state)),
    showTextOnButton: isDetailsView && getShortlist(state),
    showDetails: state.boxSummaryShow.get('show') && isMobile(state.boxSummaryShow.get('view')),
    shouldShowTutorialStep2: shouldShortlistTutorialShow(state),
    shortlistUsed: getShortlistUsed(state)
  })

}
const OpenBoxButtonContainer = connect(mapStateToProp)(OpenBoxButton)

export { OpenBoxButtonContainer }
