import { connect } from 'react-redux'
import { RecipeTilePurchaseInfo } from './RecipeTilePurchaseInfo'
import { getRecipeSurcharge , getRecipeOutOfStock, getRecipeIsFineDineIn } from '../../../selectors/recipe'

const mapStateToProps = (state, ownProps) => ({
  isOutOfStock: getRecipeOutOfStock(state, ownProps),
  surcharge: getRecipeSurcharge(state, ownProps),
  isFineDineIn: getRecipeIsFineDineIn(state, ownProps),
})

export const RecipeTilePurchaseInfoContainer = connect(mapStateToProps)(RecipeTilePurchaseInfo)
