import React from 'react'
import classnames from 'classnames'
import { useMenu } from 'routes/Menu/domains/menu'
import { DetailOverlay } from '../../DetailOverlay'

import { RecipeList } from './RecipeList'

import menuCss from '../../Menu.css'
import css from './RecommendationsHighlight.css'

// remove all recipes from `input` that are in `recipesToRemove`
const removeMatchingRecipes = (input, recipesToRemove) => (
  input.filter(recipe =>
    recipe
    && recipe.recipe
    && recipesToRemove.some(other => (
      other
      && other.recipe
      && other.recipe.get('id') === recipe.recipe.get('id')
    )) === false
  )
)

const ALL_RECIPES_ID = 'ca8f71be-63ac-11e6-a693-068306404bab'
const RECOMMENDATIONS_ID = '97270056-cd65-11e8-a2d2-067a72dd5dba'

const RecommendationsHighlight = () => {
  const { getRecipesForCollectionId } = useMenu()

  const { recipes: recommendationRecipes } = getRecipesForCollectionId(RECOMMENDATIONS_ID)
  const { recipes: allRecipes } = getRecipesForCollectionId(ALL_RECIPES_ID)

  const remainingRecipes = removeMatchingRecipes(
    allRecipes,
    recommendationRecipes
  )

  if (remainingRecipes.size === 0) {
    return (
      <div className={menuCss.menuContainer}>
        <RecipeList collectionId={RECOMMENDATIONS_ID} recipes={recommendationRecipes} />

        <DetailOverlay showOverlay />
      </div>
    )
  }

  return (
    <div className={menuCss.menuContainer}>
      {
        Boolean(recommendationRecipes.size)
        && (
          <React.Fragment>
            <div className={css.headerContainer}>
              <h2 className={css.header}>Chosen for you</h2>

              <p className={css.subtitle}>Handpicked recipes to suit your taste.</p>
            </div>

            <RecipeList collectionId={RECOMMENDATIONS_ID} recipes={recommendationRecipes} />

            <div className={css.headerContainer}>
              <hr className={css.divider} />

              <h2 className={classnames(css.header, css.moreRecipes)}>More delicious recipes...</h2>
            </div>
          </React.Fragment>
        )
      }

      <RecipeList collectionId={ALL_RECIPES_ID} recipes={remainingRecipes} />

      <DetailOverlay showOverlay />
    </div>
  )
}

export { RecommendationsHighlight }
