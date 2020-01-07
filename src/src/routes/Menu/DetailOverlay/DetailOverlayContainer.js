import { connect } from 'react-redux'
import { getRecipePosition } from 'selectors/collections'
import DetailOverlay from './DetailOverlay'

const mapStateToProps = (state, ownProps) => {
  const { locationBeforeTransitions } = state.routing
  const query = locationBeforeTransitions && locationBeforeTransitions.query
  const menuRecipeDetailShow = (query) ? query.recipeDetailId : ''

  return {
    recipesStore: state.recipes,
    numPortions: state.basket.get('numPortions'),
    stock: state.menuRecipeStock,
    showOverlay: (!!menuRecipeDetailShow && state.recipes.has(menuRecipeDetailShow) && ownProps.showOverlay),
    position: getRecipePosition(state, menuRecipeDetailShow),
    browserType: state.request.get('browser'),
    menuRecipeDetailShow,
  }
}

const DetailOverlayContainer = connect(mapStateToProps, {})(DetailOverlay)

export default DetailOverlayContainer
