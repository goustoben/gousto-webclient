import { connect } from 'react-redux'
import { RecipeTilePurchaseInfo } from './RecipeTilePurchaseInfo'
import { getAlternativesForRecipe } from '../../../selectors/variants'
import { getRecipeSurcharge, getRecipeOutOfStock, getRecipeIsFineDineIn } from '../../../selectors/recipe'

const mapStateToProps = (state, ownProps) => ({
  recipeVariants: getAlternativesForRecipe(state, ownProps),
  isOutOfStock: getRecipeOutOfStock(state, ownProps),
  surcharge: getRecipeSurcharge(state, ownProps),
  isFineDineIn: getRecipeIsFineDineIn(state, ownProps)
})

export const RecipeTilePurchaseInfoContainer = connect(mapStateToProps)(RecipeTilePurchaseInfo)
