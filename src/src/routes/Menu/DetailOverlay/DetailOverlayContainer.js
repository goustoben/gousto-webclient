import { connect } from 'react-redux'
import { getRecipePosition } from 'selectors/collections'
import { getRecipeIdFromUrl } from 'selectors/recipe'
import DetailOverlay from './DetailOverlay'

const mapStateToProps = (state, ownProps) => ({
  recipesStore: state.recipes,
  numPortions: state.basket.get('numPortions'),
  stock: state.menuRecipeStock,
  showOverlay: (!!getRecipeIdFromUrl(state) && state.recipes.has(getRecipeIdFromUrl(state)) && ownProps.showOverlay),
  position: getRecipePosition(state, getRecipeIdFromUrl(state)),
  browserType: state.request.get('browser'),
  menuRecipeDetailShow: getRecipeIdFromUrl(state),
})

const DetailOverlayContainer = connect(mapStateToProps, {})(DetailOverlay)

export default DetailOverlayContainer
