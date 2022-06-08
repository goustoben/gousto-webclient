import React, { useCallback } from 'react'

import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { trackUTMAndPromoCode } from 'actions/tracking'
import { dismissRecipesInBasketProgress } from 'actions/trackingKeys'

import { useBasket } from '../../domains/basket'
import { RecipesInBasketProgressPresentation } from './RecipesInBasketProgress.presentation'

const propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isActionBarRedesignEnabled: PropTypes.bool.isRequired,
}

function useTracking() {
  const { recipeCount } = useBasket()
  const dispatch = useDispatch()
  const dispatchTrackUTMAndPromoCode = useCallback(
    (maxRecipes, percentage) => {
      dispatch(
        trackUTMAndPromoCode(dismissRecipesInBasketProgress, {
          num_recipes: recipeCount,
          max_recipes: maxRecipes,
          percentage_complete: percentage,
        }),
      )
    },
    [recipeCount, dispatch],
  )

  return { dispatchTrackUTMAndPromoCode, recipeCount }
}

const RecipesInBasketProgress = ({ isAuthenticated, isActionBarRedesignEnabled }) => {
  const { dispatchTrackUTMAndPromoCode, recipeCount } = useTracking()

  return isActionBarRedesignEnabled ? null : (
    <RecipesInBasketProgressPresentation
      isAuthenticated={isAuthenticated}
      selectedRecipesCount={recipeCount}
      onClose={dispatchTrackUTMAndPromoCode}
    />
  )
}

RecipesInBasketProgress.propTypes = propTypes

export { RecipesInBasketProgress }
