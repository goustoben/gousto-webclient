import { connect } from 'react-redux'
import { getBrowserType } from 'selectors/browser'
import { getRecipePosition } from 'selectors/collections'
import { getMenuRecipeIdForDetails } from '../selectors/menuRecipeDetails'
import { DetailOverlay } from './DetailOverlay'
import { menuRecipeDetailVisibilityChange } from '../actions/menuRecipeDetails'

const mapStateToProps = (state, ownProps) => {
  const recipeId = getMenuRecipeIdForDetails(state)

  return {
    recipesStore: state.recipes,
    numPortions: state.basket.get('numPortions'),
    showOverlay: (Boolean(getMenuRecipeIdForDetails(state)) && ownProps.showOverlay),
    position: getRecipePosition(state, getMenuRecipeIdForDetails(state)),
    browserType: getBrowserType(state),
    menuRecipeDetailShow: recipeId,
  }
}

const mapDispatchToProps = {
  onCloseOverlay: menuRecipeDetailVisibilityChange,
}

const DetailOverlayContainer = connect(mapStateToProps, mapDispatchToProps)(DetailOverlay)

export { DetailOverlayContainer }
