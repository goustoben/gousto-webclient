import { connect } from 'react-redux'
import { getRecipeOutOfStock } from '../../../selectors/recipe'
import { VariantRecipeListItem } from './VariantRecipeListItem'

const mapStateToProps = (state, ownProps) => ({
  isOutOfStock: getRecipeOutOfStock(state, ownProps)
})

const VariantRecipeListItemContainer = connect(mapStateToProps)(VariantRecipeListItem)

export { VariantRecipeListItemContainer }
