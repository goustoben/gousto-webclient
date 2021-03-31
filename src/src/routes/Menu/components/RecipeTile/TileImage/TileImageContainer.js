import { connect } from 'react-redux'
import { TileImage } from './TileImage'
import { getRecipeOutOfStock } from '../../../selectors/recipe'

const mapStateToProps = (state, ownProps) => ({
  isOutOfStock: getRecipeOutOfStock(state, ownProps),
})

const TileImageContainer = connect(mapStateToProps)(TileImage)

export { TileImageContainer }
