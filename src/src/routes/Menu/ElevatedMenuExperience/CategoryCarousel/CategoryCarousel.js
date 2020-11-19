import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import css from './CategoryCarousel.css'
import { RecipeTileContainer } from '../../components/RecipeTile'
import { CategoryScrollTrackerContainer } from '../CategoryScrollTracker'
import { OptimizelyRolloutsContainer } from '../../../../containers/OptimizelyRollouts'
import { CollectionLinkChangeContainer } from '../../components/CollectionLinkChange'

const CategoryCarousel = ({ category, recipes, categoryButtonClicked, carouselConfig }) => {
  if (!recipes.size) return null

  const viewAllLabel = `View (${recipes.size})`
  const categoryId = category.get('id')

  return (
    <div className={css.categoryCarousel} style={{backgroundColor: carouselConfig.theme.backgroundColor, color: carouselConfig.theme.color}}>
      <div className={css.categoryDetails}>
        <div className={css.categoryTitle} style={{color: carouselConfig.theme.titleColor}}>{carouselConfig.title}</div>
        <CollectionLinkChangeContainer
          className={css.categoryViewAllLink}
          color={carouselConfig.theme.linkColor}
          label={viewAllLabel}
          collectionId={categoryId}
          onClick={() => {
            categoryButtonClicked()
            window.scroll(0, 0)
          }}
        />
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
          <OptimizelyRolloutsContainer featureName="christmas_merchandising_experiment_2020" featureEnabled>
            { carouselConfig.imageUrl
            && (
            <div className={css.categoryCarouselImageContainer}>
              <img className={css.categoryCarouselImage} src={carouselConfig.imageUrl} alt={carouselConfig.title} />
            </div>
            )}
          </OptimizelyRolloutsContainer>
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
    imageUrl: PropTypes.string,
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
