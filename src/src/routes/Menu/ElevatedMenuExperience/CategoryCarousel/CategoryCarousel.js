import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import Link from 'Link'
import css from './CategoryCarousel.css'
import { EMERecipeTileContainer } from '../RecipeTile/EMERecipeTile'

const CategoryCarousel = ({ category, recipes }) => {
  if (!recipes.size) return null

  const viewAllPath = `/menu?collection=${category.get('slug')}`
  const viewAllLabel = `View (${recipes.size})`

  return (
    <div className={css.categoryCarousel}>
      <div className={css.categoryDetails}>
        <div className={css.categoryTitle}>{category.get('shortTitle')}</div>
        <Link className={css.categoryViewAllLink} to={viewAllPath} clientRouted>
          {viewAllLabel}
        </Link>
      </div>
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
  category: PropTypes.instanceOf(Immutable.Map).isRequired,
  recipes: PropTypes.instanceOf(Immutable.List).isRequired
}

export { CategoryCarousel }
