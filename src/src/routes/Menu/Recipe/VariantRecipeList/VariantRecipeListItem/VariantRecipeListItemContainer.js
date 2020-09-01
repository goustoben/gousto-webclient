import { connect } from 'react-redux'
import { getNumPortions } from '../../../../../selectors/basket'
import { getRecipeOutOfStock, getRecipeSidesSurcharge, getRecipeSurcharge } from '../../../selectors/recipe'
import { VariantRecipeListItem } from './VariantRecipeListItem'

const mapStateToProps = (state, ownProps) => {
  const surcharge = (
    ownProps.hasSides
      ? getRecipeSidesSurcharge(state, ownProps)
      : getRecipeSurcharge(state, ownProps)
  )

  return {
    isOutOfStock: getRecipeOutOfStock(state, ownProps),
    numPortions: getNumPortions(state),
    surcharge
  }
}

const VariantRecipeListItemContainer = connect(mapStateToProps)(VariantRecipeListItem)

export { VariantRecipeListItemContainer }
