import React, { useEffect, useRef } from 'react'
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { trackRecipeOrderDisplayed } from 'actions/tracking'
import { areEqualArrays } from 'routes/Menu/MenuRecipesPage/RecipeList/utils'
import { showDetailRecipe } from '../../actions/menuRecipeDetails'
import { RecipeList } from './RecipeList'
import { useCurrentCollectionId } from '../../domains/collections'
import { useMenu, useStock } from '../../domains/menu'
import { useTracking } from './useTracking'

const RecipeListWrapper = (ownProps) => {
  const dispatch = useDispatch()
  const currentCollectionId = useCurrentCollectionId()
  const { getRecipesForCollectionId } = useMenu()
  const { getOutOfStockRecipeIds } = useStock()
  const { trackSoldOutRecipes } = useTracking()

  const isDietaryCollectionLinksEnabled = useIsOptimizelyFeatureEnabled(
    'kales_dietary_category_links'
  )

  const actionDispatchers = bindActionCreators(
    {
      trackRecipeOrderDisplayed,
      showDetailRecipe,
    },
    dispatch
  )

  const { recipes } = getRecipesForCollectionId(currentCollectionId)
  const shownRecipeIds = recipes.map(({ recipe }) => recipe.get('id')).toJS()
  const recipesIdsRef = useRef(shownRecipeIds)

  if (!areEqualArrays(recipesIdsRef.current, shownRecipeIds)) {
    recipesIdsRef.current = shownRecipeIds
  }

  // to avoid eslint react-hooks/use-exhaustive-deps rule we have to introduce a new variable
  const recipeIds = recipesIdsRef.current
  useEffect(() => {
    const soldOutRecipes = getOutOfStockRecipeIds(recipeIds)
    trackSoldOutRecipes(soldOutRecipes)
  }, [recipeIds, getOutOfStockRecipeIds, trackSoldOutRecipes])

  return (
    <RecipeList
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...ownProps}
      currentCollectionId={currentCollectionId}
      recipes={recipes}
      trackRecipeOrderDisplayed={actionDispatchers.trackRecipeOrderDisplayed}
      showDetailRecipe={actionDispatchers.showDetailRecipe}
      isDietaryCollectionLinksEnabled={isDietaryCollectionLinksEnabled}
    />
  )
}

export { RecipeListWrapper }
