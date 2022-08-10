/* eslint-disable react/button-has-type */
import React, { useEffect } from 'react'

import Immutable from 'immutable'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

import { forceMenuLoad } from 'actions/menu'
import { RecipeTileBridge } from 'routes/Menu/components/RecipeTile/RecipeTileBridge'
import { useBasket } from 'routes/Menu/domains/basket'
import fetchData from 'routes/Menu/fetchData'

import { CTAToAllRecipes } from '../CTAToAllRecipes'
import { useTracking } from './useTracking'

import css from './RecipeList.css'

export const buildTracker =
  ({ recipes, currentCollectionId, track }) =>
  () => {
    const recipeIds = recipes.map(({ recipe }) => recipe.get('id'))
    track(currentCollectionId, recipeIds.toJS())
  }

export const RecipeList = ({ recipes, currentCollectionId }) => {
  const track = useTracking()
  const { addRecipe } = useBasket()
  const dispatch = useDispatch()

  useEffect(() => buildTracker({ recipes, currentCollectionId, track })(), [])

  return (
    <div className={css.emeRecipeList}>
      <button
        onClick={async () => {
          // This triggers menu reload from the server
          await dispatch(
            fetchData({ query: {}, params: {} }, true, undefined, undefined, {
              addRecipe,
            }),
          )
        }}
      >
        VPP
      </button>
      {recipes.map((value) => (
        <React.Fragment key={value.reference}>
          <RecipeTileBridge
            recipeReference={value.reference}
            recipe={value.recipe}
            originalId={value.originalId}
            collectionId={currentCollectionId}
          />
        </React.Fragment>
      ))}
      <CTAToAllRecipes />
    </div>
  )
}

RecipeList.propTypes = {
  recipes: PropTypes.instanceOf(Immutable.List).isRequired,
  currentCollectionId: PropTypes.string.isRequired,
}
