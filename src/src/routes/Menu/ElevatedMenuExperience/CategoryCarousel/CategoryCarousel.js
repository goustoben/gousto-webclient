import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import css from './CategoryCarousel.css'
import { EMERecipeTileContainer } from '../RecipeTile/EMERecipeTile'

const CategoryCarousel = ({ recipes }) => {
  if (!recipes.size) return null

  return (
    <div className={css.categoryCarousel}>
      <div className={css.categoryCarouselInner}>
        <div className={css.categoryCarouselRecipes}>
          {recipes.map((value) => (
            <div key={value.recipe.get('id')} className={css.categoryCarouselRecipeOuter}>
              <EMERecipeTileContainer recipeId={value.recipe.get('id')} isInCarousel />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

CategoryCarousel.propTypes = {
  recipes: PropTypes.instanceOf(Immutable.List()).isRequired
}

export { CategoryCarousel }
