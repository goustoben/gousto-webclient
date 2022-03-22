import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { trackUTMAndPromoCode } from 'actions/tracking'
import { dismissRecipesInBasketProgress } from 'actions/trackingKeys'
import { RecipesInBasketProgressPresentation } from './RecipesInBasketProgress.presentation'
import { useBasket } from '../../domains/basket'

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
}

const RecipesInBasketProgress = ({ isAuthenticated }) => {
  const { recipeCount } = useBasket()
  const dispatch = useDispatch()

  const handleClose = (maxRecipes, percentage) => {
    dispatch(trackUTMAndPromoCode(dismissRecipesInBasketProgress, {
      num_recipes: recipeCount,
      max_recipes: maxRecipes,
      percentage_complete: percentage,
    }))
  }

  return (
    <RecipesInBasketProgressPresentation
      isAuthenticated={isAuthenticated}
      selectedRecipesCount={recipeCount}
      onClose={handleClose}
    />
  )
}

RecipesInBasketProgress.propTypes = propTypes

export {
  RecipesInBasketProgress
}
