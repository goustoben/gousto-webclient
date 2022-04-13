import React from 'react'
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { showDetailRecipe } from '../../actions/menuRecipeDetails'
import { RecipeList } from './RecipeList'
import { useCurrentCollectionId } from '../../domains/collections'
import { useMenu } from '../../domains/menu'

const RecipeListWrapper = (ownProps) => {
  const dispatch = useDispatch()
  const currentCollectionId = useCurrentCollectionId()
  const { getRecipesForCollectionId } = useMenu()

  const isDietaryCollectionLinksEnabled = useIsOptimizelyFeatureEnabled(
    'kales_dietary_category_links'
  )

  const { recipes } = getRecipesForCollectionId(currentCollectionId)

  const actionDispatchers = bindActionCreators(
    {
      showDetailRecipe,
    },
    dispatch
  )

  return (
    <RecipeList
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...ownProps}
      currentCollectionId={currentCollectionId}
      recipes={recipes}
      showDetailRecipe={actionDispatchers.showDetailRecipe}
      isDietaryCollectionLinksEnabled={isDietaryCollectionLinksEnabled}
    />
  )
}

export { RecipeListWrapper }
