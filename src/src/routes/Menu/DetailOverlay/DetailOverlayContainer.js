import { connect } from 'react-redux'
import { getBrowserType } from 'selectors/browser'
import { getRecipePosition } from 'selectors/collections'
import { getMenuRecipeIdForDetails } from '../selectors/menuRecipeDetails'
import { getRecipeOutOfStock } from '../selectors/recipe'
import { DetailOverlay } from './DetailOverlay'

const mapStateToProps = (state, ownProps) => ({
  recipesStore: state.recipes,
  numPortions: state.basket.get('numPortions'),
  showOverlay: (Boolean(getMenuRecipeIdForDetails(state)) && ownProps.showOverlay),
  position: getRecipePosition(state, getMenuRecipeIdForDetails(state)),
  browserType: getBrowserType(state),
  menuRecipeDetailShow: getMenuRecipeIdForDetails(state),
  isOutOfStock: getRecipeOutOfStock(state, { recipeId: getMenuRecipeIdForDetails(state)}),
})

const DetailOverlayContainer = connect(mapStateToProps, {})(DetailOverlay)

export { DetailOverlayContainer }
