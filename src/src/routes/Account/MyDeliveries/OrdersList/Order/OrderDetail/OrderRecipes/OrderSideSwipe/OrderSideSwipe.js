import PropTypes from 'prop-types'
import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Immutable from 'immutable'
import placeholderSrc from 'media/images/recipe-placeholder.png'

import css from './OrderSideSwipe.css'
import OrderRecipe from '../../../../../../AccountComponents/OrderRecipe'

const OrderSideSwipe = ({
  recipes,
  orderState,
  portionsCount,
}) => {
  const maxRecipes = ['confirmed', 'dispatched'].indexOf(orderState) > -1 ? recipes.size : 4
  const recipesRendered = []
  for (let i = 0; i < maxRecipes; i++) {
    const recipeId = recipes.getIn([i, 'id'], null)
    recipesRendered.push(
      <OrderRecipe
        recipeImage={recipeId ? recipes.getIn([i, 'image'], placeholderSrc) : ''}
        recipeTitle={recipes.getIn([i, 'title'], '')}
        key={recipeId || i}
        servings={recipeId ? `${portionsCount} servings` : ''}
      />
    )
  }

  return (
    <div className={css.horizontalScrollWrapper}>
      {recipesRendered}
    </div>
  )
}

OrderSideSwipe.propTypes = {
  recipes: ImmutablePropTypes.listOf(
    ImmutablePropTypes.contains({
      recipeImage: PropTypes.string,
      recipeTitle: PropTypes.string,
    })
  ),
  orderState: PropTypes.string,
  portionsCount: PropTypes.string,
}

OrderSideSwipe.defaultProps = {
  recipes: Immutable.List([]),
  orderState: '',
  portionsCount: '',
}

export default OrderSideSwipe
