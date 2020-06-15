import { connect } from 'react-redux'
import { getRecipePosition } from 'selectors/collections'
import { getMenuRecipeIdForDetails } from '../selectors/menuRecipeDetails'
import { getRecipeOutOfStock } from '../selectors/recipe'
import { DetailOverlay } from './DetailOverlay'

const mapStateToProps = (state, ownProps) => ({
  recipesStore: state.recipes,
  numPortions: state.basket.get('numPortions'),
  showOverlay: (Boolean(getMenuRecipeIdForDetails(state)) && ownProps.showOverlay),
  position: getRecipePosition(state, getMenuRecipeIdForDetails(state)),
  browserType: state.request.get('browser'),
  menuRecipeDetailShow: getMenuRecipeIdForDetails(state),
  isOutOfStock: getRecipeOutOfStock(state, { recipeId: getMenuRecipeIdForDetails(state)}),
})

const DetailOverlayContainer = connect(mapStateToProps, {})(DetailOverlay)

export { DetailOverlayContainer }
