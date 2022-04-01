import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import Immutable from 'immutable'
import { basketSum } from 'utils/basket'
import logger from 'utils/logger'
import { RecipeHolder } from '../RecipeHolder'
import css from './RecipeList.css'

const RecipeList = ({
  maxRecipesNum,
  recipes,
  view,
  invisible,
  menuRecipesStore,
  detailVisibilityChange,
  boxDetailsVisibilityChange,
  browser,
  boxSummaryVisible,
}) => {
  const filledSlots = basketSum(recipes)
  const emptySlots = filledSlots > maxRecipesNum ? 0 : maxRecipesNum - filledSlots
  const isDesktop = view === 'desktop'
  const onClick = (recipeIds = null) => {
    if (browser === 'mobile') {
      if (!boxSummaryVisible) {
        boxDetailsVisibilityChange(true)
      }
    } else {
      detailVisibilityChange(menuRecipesStore.getIn([recipeIds, 'id']))
    }
  }

  if (filledSlots > maxRecipesNum) {
    const e = new Error(`Invalid number of recipes: ${filledSlots}. Invalid Array Length`)
    logger.error({ message: e.message, errors: [e] })
  }

  const classes = classnames(
    { [css.recipeSection]: isDesktop },
    { [css.recipeSectionMobile]: !isDesktop },
    { [css.invisible]: invisible }
  )

  const recipeIds = recipes
    .slice(0, maxRecipesNum)
    .reduce(
      (reducedRecipes, recipeQty, recipeId) =>
        reducedRecipes.concat(Array(recipeQty).fill(recipeId)),
      []
    )

  return (
    <div className={classes}>
      {
        recipeIds
          .map((recipeId, index) => (
            // Since id-s in the recipeIds array can repeat, there's no better
            // key than the index.
            /* eslint-disable react/no-array-index-key */
            <RecipeHolder
              recipe={menuRecipesStore.get(recipeId)}
              onClick={() => onClick(recipeId)}
              view={view}
              key={index}
              browserType={browser}
            />
            /* eslint-enable react/no-array-index-key */
          ))
      }

      {
        Array.from({ length: emptySlots }).map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <RecipeHolder data-testing="empty" view={view} key={index} browserType={browser} />
        ))
      }

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
  browser: PropTypes.string,
}

RecipeList.defaultProps = {
  view: 'desktop',
  recipes: Immutable.Map({}),
  menuRecipesStore: Immutable.Map({}),
  invisible: false,
  boxSummaryVisible: false,
  browser: 'desktop',
}

export { RecipeList }
