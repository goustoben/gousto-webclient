import { connect } from 'react-redux'
import { RecipeTilePurchaseInfo } from './RecipeTilePurchaseInfo'
import { getRecipeSurcharge , getRecipeOutOfStock } from '../../../selectors/recipe'

const mapStateToProps = (state, ownProps) => ({
  isOutOfStock: getRecipeOutOfStock(state, ownProps),
  surcharge: getRecipeSurcharge(state, ownProps)

})

export const RecipeTilePurchaseInfoContainer = connect(mapStateToProps)(RecipeTilePurchaseInfo)
