import { connect } from 'react-redux'
import { getBrowserType } from 'selectors/browser'
import { RecipeTilePurchaseInfo } from './RecipeTilePurchaseInfo'
import { getRecipeSurcharge, getRecipeOutOfStock, getRecipeIsFineDineIn } from '../../../selectors/recipe'

const mapStateToProps = (state, ownProps) => ({
  isOutOfStock: getRecipeOutOfStock(state, ownProps),
  surcharge: getRecipeSurcharge(state, ownProps),
  isFineDineIn: getRecipeIsFineDineIn(state, ownProps),
  browserType: getBrowserType(state),
})

export const RecipeTilePurchaseInfoContainer = connect(mapStateToProps)(RecipeTilePurchaseInfo)
