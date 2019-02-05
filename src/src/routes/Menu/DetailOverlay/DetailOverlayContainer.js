import { connect } from 'react-redux'
import { getRecipePosition } from 'selectors/collections'
import DetailOverlay from './DetailOverlay'

const mapStateToProps = (state, ownProps) => ({
  recipesStore: state.recipes,
  numPortions: state.basket.get('numPortions'),
  stock: state.menuRecipeStock,
  showOverlay: (!!ownProps.menuRecipeDetailShow && state.recipes.has(ownProps.menuRecipeDetailShow) && ownProps.showOverlay),
  position: getRecipePosition(state, ownProps.menuRecipeDetailShow),
})

const DetailOverlayContainer = connect(mapStateToProps, {})(DetailOverlay)

export default DetailOverlayContainer
