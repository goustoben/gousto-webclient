import React, { memo } from 'react'

import { RecipeOptionPair } from '@library/api-menu-service'

import { RecipeTileBridge } from 'routes/Menu/components/RecipeTile/RecipeTileBridge'

const RecipeListItemRaw = ({
  recipe,
  reference,
  originalId,
  currentCollectionId,
}: {
  recipe: RecipeOptionPair['recipe']
  reference: RecipeOptionPair['reference']
  originalId: RecipeOptionPair['originalId']
  currentCollectionId: string
}) => (
  <React.Fragment>
    <RecipeTileBridge
      recipeReference={reference}
      recipe={recipe}
      originalId={originalId}
      collectionId={currentCollectionId}
    />
  </React.Fragment>
)

export const RecipeListItem = memo(RecipeListItemRaw) as any
