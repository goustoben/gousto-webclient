import React from 'react'
import { bindActionCreators } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { trackRecipeOrderDisplayed } from 'actions/tracking'

import { RecipeList } from './RecipeList'
import { getRecipeListRecipes } from '../selectors/recipeList'
import { useCollections } from '../domains/collections/useCollections'

const RecipeListWrapper = () => {
  const dispatch = useDispatch()
  const { currentCollectionId } = useCollections()
  const { recipes, originalOrderRecipeIds } = useSelector(getRecipeListRecipes)

  const actionDispatchers = bindActionCreators({
    trackRecipeOrderDisplayed
  }, dispatch)

  return (
    <RecipeList
      currentCollectionId={currentCollectionId}
      recipes={recipes}
      originalOrderRecipeIds={originalOrderRecipeIds}
      trackRecipeOrderDisplayed={actionDispatchers.trackRecipeOrderDisplayed}
    />
  )
}

export { RecipeListWrapper }
