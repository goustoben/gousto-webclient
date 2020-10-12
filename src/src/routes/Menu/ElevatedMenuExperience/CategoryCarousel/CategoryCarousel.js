import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import Link from 'Link'
import css from './CategoryCarousel.css'
import { EMERecipeTileContainer } from '../RecipeTile/EMERecipeTile'

const CategoryCarousel = ({ category, recipes, categoryButtonClicked }) => {
  if (!recipes.size) return null

  const viewAllPath = `/menu?collection=${category.get('slug')}`
  const viewAllLabel = `View (${recipes.size})`
  const categoryId = category.get('id')

  return (
    <div className={css.categoryCarousel}>
      <div className={css.categoryDetails}>
        <div className={css.categoryTitle}>{category.get('shortTitle')}</div>
        <Link className={css.categoryViewAllLink} to={viewAllPath} clientRouted onClick={categoryButtonClicked}>
          {viewAllLabel}
        </Link>
      </div>
      <div className={css.categoryCarouselInner}>
        <div className={css.categoryCarouselRecipes}>
          {recipes.map((value) => (
            <div key={value.recipe.get('id')} className={css.categoryCarouselRecipeOuter}>
              <EMERecipeTileContainer recipeId={value.recipe.get('id')} categoryId={categoryId} originalId={value.originalId} isInCarousel />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

CategoryCarousel.propTypes = {
  category: PropTypes.instanceOf(Immutable.Map).isRequired,
  recipes: PropTypes.instanceOf(Immutable.List).isRequired,
  categoryButtonClicked: PropTypes.func.isRequired
}

export { CategoryCarousel }
