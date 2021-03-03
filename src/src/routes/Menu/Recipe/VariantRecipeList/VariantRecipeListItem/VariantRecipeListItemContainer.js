import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { getRecipes } from 'selectors/root'
import { getDietaryTags } from 'utils/recipe'
import { getNumPortions } from '../../../../../selectors/basket'
import { getRecipeOutOfStock, getRecipeSurcharge, getRecipeIdFromProps } from '../../../selectors/recipe'
import { VariantRecipeListItem } from './VariantRecipeListItem'

const mapStateToProps = (state, ownProps) => {
  const surcharge = getRecipeSurcharge(state, ownProps)

  const getRecipeAllergenInformation = createSelector(
    [getRecipeIdFromProps, getRecipes],
    (recipeId, recipes) => {
      const recipe = recipes.get(recipeId)
      const dietaryTags = getDietaryTags(recipe)
      const hasGlutenOrDairyAllergens = !dietaryTags.some((slug => slug === 'dairy-free') || (slug => slug === 'gluten-free'))

      return { containsGlutenOrDairy: hasGlutenOrDairyAllergens }
    }
  )

  return {
    isOutOfStock: getRecipeOutOfStock(state, ownProps),
    numPortions: getNumPortions(state),
    surcharge,
    allergenInfo: getRecipeAllergenInformation(state, ownProps)
  }
}

const VariantRecipeListItemContainer = connect(mapStateToProps)(VariantRecipeListItem)

export { VariantRecipeListItemContainer }
