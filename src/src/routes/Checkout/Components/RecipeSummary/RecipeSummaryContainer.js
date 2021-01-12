import { connect } from 'react-redux'
import { getIsCheckoutOverhaulEnabled } from 'selectors/features'
import { RecipeSummary } from './RecipeSummary'

function mapStateToProps(state) {
  return {
    numPortions: state.basket.get('numPortions'),
    recipes: state.basket.get('recipes'),
    menuRecipesStore: state.recipes,
    menuRecipeStock: state.menuRecipeStock,
    menuBoxPrices: state.menuBoxPrices,
    isCheckoutOverhaulEnabled: getIsCheckoutOverhaulEnabled(state),
  }
}

export const RecipeSummaryContainer = connect(mapStateToProps, {})(RecipeSummary)
