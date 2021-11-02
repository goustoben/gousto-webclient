import React from 'react'
import { useCollections } from 'routes/Menu/domains/collections'
import { useMenu } from 'routes/Menu/domains/menu'
import { DetailOverlayContainer } from '../../DetailOverlay'

import { RecipeList } from './RecipeList'

import css from '../../Menu.css'

// remove all recipes from `input` that are in `recipesToRemove`
const removeMatchingRecipes = (input, recipesToRemove) => (
  input.filter(recipe =>
    recipesToRemove.some(other => other.get('id') === recipe.get('id')) === false
  )
)

const ALL_RECIPES_ID = 'ca8f71be-63ac-11e6-a693-068306404bab'
const RECOMMENDATIONS_ID = '97270056-cd65-11e8-a2d2-067a72dd5dba'

const RecommendationsHighlight = () => {
  const { currentCollectionId } = useCollections()
  const { getRecipesForCollectionId } = useMenu()

  const recommendationRecipes = getRecipesForCollectionId(RECOMMENDATIONS_ID)
  const remainingRecipes = removeMatchingRecipes(
    getRecipesForCollectionId(ALL_RECIPES_ID),
    recommendationRecipes
  )

  return (
    <div className={css.menuContainer}>
      {
        recommendationRecipes.size
        && (
          <React.Fragment>
            <h2 className={css.header}>Chosen for you</h2>
            <p className={css.subtitle}>Handpicked recipes to suit your taste.</p>

            <RecipeList collectionId={currentCollectionId} recipes={recommendationRecipes} />

            <hr className={css.divider} />

            <h2 className={css.header}>More delicious recipes...</h2>
          </React.Fragment>
        )
      }

      <RecipeList collectionId={currentCollectionId} recipes={remainingRecipes} />

      <DetailOverlayContainer showOverlay />
    </div>
  )
}

export { RecommendationsHighlight }
