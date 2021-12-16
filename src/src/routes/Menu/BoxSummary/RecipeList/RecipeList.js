import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import Immutable from 'immutable'
import { basketSum } from 'utils/basket'
import logger from 'utils/logger'
import { RecipeHolder } from '../RecipeHolder'
import css from './RecipeList.css'
import { useBasketRequiredFeatureEnabled } from '../../hooks/useBasketRequiredFeatureEnabled'

const RecipeList = ({ maxRecipesNum, recipes, view, invisible, menuRecipesStore, detailVisibilityChange, boxDetailsVisibilityChange, browser, boxSummaryVisible }) => {
  const isBasketRequiredFeatureEnabled = useBasketRequiredFeatureEnabled()

  let emptyRecipes
  let recipesNumber
  const isDesktop = view === 'desktop'
  const onClick = (recipeIds = null) => {
    if (browser === 'mobile') {
      !boxSummaryVisible && !isBasketRequiredFeatureEnabled && boxDetailsVisibilityChange(true)
    } else {
      detailVisibilityChange(menuRecipesStore.getIn([recipeIds, 'id']))
    }
  }

  try {
    recipesNumber = basketSum(recipes)
    emptyRecipes = Array(maxRecipesNum - recipesNumber)
  } catch (error) {
    emptyRecipes = []
    logger.error({ message: `Invalid number of recipes: ${recipesNumber}. ${error.message}`, errors: [error] })
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
              onClick={() => onClick(recipeIds)}
              view={view}
              key={index}
              browserType={browser}
            />
          ))
      ))()}

      {emptyRecipes.fill(undefined).map((el, index) => (
        <RecipeHolder view={view} key={index} browserType={browser} />
      ))}
      {isDesktop ? <span className={css.arrowRight} /> : ''}
    </div>
  )
}

RecipeList.propTypes = {
  view: PropTypes.string,
  recipes: PropTypes.instanceOf(Immutable.Map),
  maxRecipesNum: PropTypes.number.isRequired,
  menuRecipesStore: PropTypes.instanceOf(Immutable.Map),
  invisible: PropTypes.bool,
  detailVisibilityChange: PropTypes.func.isRequired,
  boxDetailsVisibilityChange: PropTypes.func.isRequired,
  boxSummaryVisible: PropTypes.bool,
  browser: PropTypes.string
}

RecipeList.defaultProps = {
  view: 'desktop',
  recipes: Immutable.Map({}),
  menuRecipesStore: Immutable.Map({}),
  invisible: false,
  boxSummaryVisible: false,
  browser: 'desktop'
}

export { RecipeList }
