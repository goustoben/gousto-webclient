import React from 'react'
import { bindActionCreators } from 'redux'
import { useDispatch } from 'react-redux'
import { trackRecipeOrderDisplayed } from 'actions/tracking'

import { RecipeList } from './RecipeList'
import { useCurrentCollectionId } from '../domains/collections'
import { useMenu } from '../domains/menu'

const RecipeListWrapper = (ownProps) => {
  const dispatch = useDispatch()
  const currentCollectionId = useCurrentCollectionId()
  const { getRecipesForCollectionId } = useMenu()
  const { recipes } = getRecipesForCollectionId(currentCollectionId)

  const actionDispatchers = bindActionCreators({
    trackRecipeOrderDisplayed
  }, dispatch)

  return (
    <RecipeList
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...ownProps}
      currentCollectionId={currentCollectionId}
      recipes={recipes}
      trackRecipeOrderDisplayed={actionDispatchers.trackRecipeOrderDisplayed}
    />
  )
}

export { RecipeListWrapper }
