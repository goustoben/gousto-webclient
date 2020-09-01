import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'goustouicomponents'
import css from './RecipeSidesModalButtons.css'
import { trackAddSide, trackNoSide } from '../../actions/menuRecipeSidesTracking'

export const RecipeSidesModalButtons = ({
  sidesModalRecipe,
  selectedRecipeSide,
  clearSidesModalRecipe,
  basketRecipeAdd,
  unselectRecipeSide,
}) => {
  const { recipeId, view, position, score } = sidesModalRecipe

  return (
    <div className={css.recipeSidesModalButtons}>
      <Button
        className={css.recipeSidesModalNoSideButton}
        color="secondary"
        onClick={() => {
          basketRecipeAdd(recipeId, view, { position, score })
          unselectRecipeSide(recipeId)
          clearSidesModalRecipe()
          trackNoSide(recipeId)
        }}
      >
        I don&apos;t want a side
      </Button>
      <Button
        className={css.recipeSidesModalAddSideButton}
        color="primary"
        onClick={() => {
          basketRecipeAdd(selectedRecipeSide, view, { position, score }, undefined, recipeId)
          clearSidesModalRecipe()
          trackAddSide(recipeId, selectedRecipeSide)
        }}
        disabled={!selectedRecipeSide}
      >
        Add side
      </Button>
    </div>
  )
}

RecipeSidesModalButtons.propTypes = {
  sidesModalRecipe: PropTypes.shape({
    recipeId: PropTypes.string,
    view: PropTypes.string,
    position: PropTypes.number,
    score: PropTypes.number,
  }).isRequired,
  selectedRecipeSide: PropTypes.string,
  clearSidesModalRecipe: PropTypes.func.isRequired,
  basketRecipeAdd: PropTypes.func.isRequired,
  unselectRecipeSide: PropTypes.func.isRequired,
}

RecipeSidesModalButtons.defaultProps = {
  selectedRecipeSide: null,
}
