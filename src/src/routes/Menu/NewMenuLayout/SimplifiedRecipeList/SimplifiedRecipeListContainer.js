import { connect } from 'react-redux'

import { showDetailRecipe } from 'actions/menu'
import { trackRecipeOrderDisplayed } from 'actions/tracking'
import { getCurrentCollectionId } from 'selectors/filters'
import { getSortedRecipes } from '../../selectors/sorting'

import { SimplifiedRecipeList } from './SimplifiedRecipeList'

const mapStateToProps = (state) => {
  const collectionId = getCurrentCollectionId(state)
  const { recipes, recipeIds } = getSortedRecipes(state)(collectionId)

  return {
    recipeIds,
    recipes,
  }
}
const SimplifiedRecipeListContainer = connect(mapStateToProps, {
  showDetailRecipe,
  trackRecipeOrderDisplayed
})(SimplifiedRecipeList)

export { SimplifiedRecipeListContainer }
