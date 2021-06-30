import React from 'react'
import PropTypes from 'prop-types'
import { Card } from 'goustouicomponents'
import { recipePropType } from '../getHelpPropTypes'
import { GetHelpLayout2 } from '../layouts/GetHelpLayout2'
import { RecipeCardContent } from './RecipeCardContent'
import { RecipeList } from '../components/RecipeList'
import css from './RecipeCards.css'

const propTypes = {
  recipes: PropTypes.arrayOf(recipePropType).isRequired,
  trackRecipeCardClick: PropTypes.func.isRequired,
  trackRecipeCardGetInTouchClick: PropTypes.func.isRequired,
}

const RecipeCards = ({
  recipes,
  trackRecipeCardClick,
  trackRecipeCardGetInTouchClick
}) => (
  <GetHelpLayout2 headingText="Get help with your box">
    <Card>
      <p className={css.copy}>
        Which recipe had a recipe card issue?
      </p>
      <RecipeList recipes={recipes}>
        <RecipeCardContent
          trackRecipeCardClick={trackRecipeCardClick}
          trackRecipeCardGetInTouchClick={trackRecipeCardGetInTouchClick}
        />
      </RecipeList>
    </Card>
  </GetHelpLayout2>
)

RecipeCards.propTypes = propTypes

export {
  RecipeCards
}
