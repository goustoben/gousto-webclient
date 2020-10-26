import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import Link from 'Link'
import css from './CategoryCarousel.css'
import { RecipeTileContainer } from '../../components/RecipeTile'
import { CategoryScrollTrackerContainer } from '../CategoryScrollTracker'

const CategoryCarousel = ({ category, recipes, categoryButtonClicked, carouselConfig }) => {
  if (!recipes.size) return null

  const viewAllPath = `/menu?collection=${category.get('slug')}`
  const viewAllLabel = `View (${recipes.size})`
  const categoryId = category.get('id')

  return (
    <div className={css.categoryCarousel} style={{backgroundColor: carouselConfig.theme.backgroundColor, color: carouselConfig.theme.color}}>
      <div className={css.categoryDetails}>
        <div className={css.categoryTitle} style={{color: carouselConfig.theme.titleColor}}>{carouselConfig.title}</div>
        <Link
          className={css.categoryViewAllLink}
          to={viewAllPath}
          clientRouted
          onClick={() => {
            categoryButtonClicked()
            window.scroll(0, 0)
          }}
          style={{
            color: carouselConfig.theme.linkColor
          }}
        >
          {viewAllLabel}
        </Link>
      </div>
      {
        carouselConfig.description
           && (
           <p className={css.categoryDescription}>
             {carouselConfig.description}
           </p>
           )
      }

      <CategoryScrollTrackerContainer
        className={css.categoryCarouselInner}
        categoryId={categoryId}
        scrollDirection="horizontal"
        actionType="scroll_collections"
      >
        <div className={css.categoryCarouselRecipes}>
          {recipes.map((value) => (
            <div key={value.recipe.get('id')} className={css.categoryCarouselRecipeOuter}>
              <RecipeTileContainer recipeId={value.recipe.get('id')} categoryId={categoryId} originalId={value.originalId} isInCarousel fdiStyling={carouselConfig.theme.fdiStyling} />
            </div>
          ))}
        </div>
      </CategoryScrollTrackerContainer>
    </div>
  )
}

CategoryCarousel.propTypes = {
  category: PropTypes.instanceOf(Immutable.Map).isRequired,
  recipes: PropTypes.instanceOf(Immutable.List).isRequired,
  categoryButtonClicked: PropTypes.func.isRequired,
  carouselConfig: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    theme: PropTypes.shape({
      color: PropTypes.string,
      backgroundColor: PropTypes.string,
      linkColor: PropTypes.string,
      titleColor: PropTypes.string,
      fdiStyling: PropTypes.bool
    })
  })
}

CategoryCarousel.defaultProps = {
  carouselConfig: {}
}

export { CategoryCarousel }
