import React from 'react'
import classnames from 'classnames'
import { useCollections } from 'routes/Menu/domains/collections'
import { useMenu } from 'routes/Menu/domains/menu'
import { DetailOverlayContainer } from '../../DetailOverlay'

import { RecipeList } from './RecipeList'

import menuCss from '../../Menu.css'
import css from './RecommendationsHighlight.css'

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
    <div className={menuCss.menuContainer}>
      {
        recommendationRecipes.size
        && (
          <React.Fragment>
            <div className={css.headerContainer}>
              <h2 className={css.header}>Chosen for you</h2>

              <p className={css.subtitle}>Handpicked recipes to suit your taste.</p>
            </div>

            <RecipeList collectionId={currentCollectionId} recipes={recommendationRecipes} />

            <div className={css.headerContainer}>
              <hr className={css.divider} />

              <h2 className={classnames(css.header, css.moreRecipes)}>More delicious recipes...</h2>
            </div>
          </React.Fragment>
        )
      }

      <RecipeList collectionId={currentCollectionId} recipes={remainingRecipes} />

      <DetailOverlayContainer showOverlay />
    </div>
  )
}

export { RecommendationsHighlight }
