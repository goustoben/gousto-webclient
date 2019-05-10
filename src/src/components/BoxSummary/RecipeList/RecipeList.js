import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import Immutable from 'immutable'/* eslint-disable new-cap */
import RecipeHolder from 'BoxSummary/RecipeHolder'
import { basketSum } from 'utils/basket'
import logger from 'utils/logger'
import css from './RecipeList.css'

const RecipeList = ({ maxRecipesNum, recipes, view, invisible, menuRecipesStore, detailVisibilityChange }) => {
  let emptyRecipes
  let recipesNumber
  const isDesktop = view === 'desktop'

  try {
    recipesNumber = basketSum(recipes)
    emptyRecipes = Array(maxRecipesNum - recipesNumber)
  } catch (error) {
    emptyRecipes = []
    logger.error({message:`Invalid number of recipes: ${recipesNumber}. ${error.message}`, errors: [error]})
  }

  const classes = classnames(
    { [css.recipeSection]: isDesktop },
    { [css.recipeSectionMobile]: !isDesktop },
    { [css.invisible]: invisible },
  )

  return (
    <div className={classes}>
      {(() => (
        recipes.slice(0, maxRecipesNum).reduce((reducedRecipes, recipeQty, recipeId) => (
          reducedRecipes.concat(Array(recipeQty).fill(recipeId))
        ), [])
          .map((recipeIds, index) => (
            <RecipeHolder
              recipe={menuRecipesStore.get(recipeIds)}
              onClick={() => { detailVisibilityChange(menuRecipesStore.getIn([recipeIds, 'id'])) }}
              view={view}
              key={index}
            />
          ))
      ))()}

      {emptyRecipes.fill(undefined).map((el, index) => (
        <RecipeHolder view={view} key={index} />
      ))}
      {isDesktop ? <span className={css.arrowRight} /> : ''}
    </div>
  )
}

RecipeList.propTypes = {
  view: PropTypes.string,
  recipes: PropTypes.instanceOf(Immutable.Map),
  maxRecipesNum: PropTypes.number,
  menuRecipesStore: PropTypes.instanceOf(Immutable.Map),
  invisible: PropTypes.bool,
  detailVisibilityChange: PropTypes.func,
}

RecipeList.defaultProps = {
  view: 'desktop',
  recipes: Immutable.Map({}),
  menuRecipesStore: Immutable.Map({}),
  invisible: false,
}

export default RecipeList
