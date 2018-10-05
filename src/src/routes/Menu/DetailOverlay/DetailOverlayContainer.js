import { connect } from 'react-redux'
import DetailOverlay from './DetailOverlay'

const mapStateToProps = (state, ownProps) => ({
  recipesStore: state.recipes,
  numPortions: state.basket.get('numPortions'),
  stock: state.menuRecipeStock,
  showOverlay: (!!ownProps.menuRecipeDetailShow && state.recipes.has(ownProps.menuRecipeDetailShow) && ownProps.showOverlay)
})

const DetailOverlayContainer = connect(mapStateToProps, {})(DetailOverlay)

export default DetailOverlayContainer
