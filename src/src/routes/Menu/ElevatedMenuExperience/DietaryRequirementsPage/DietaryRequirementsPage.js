import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { CategoriesHeaderContainer } from '../CategoriesHeader'
import { CategoryCarouselContainer } from '../CategoryCarousel'
import { DetailOverlayContainer } from '../../DetailOverlay'
import { VariantRecipeListModalContainer } from '../VariantRecipeListModal'
import Loading from '../../Loading'
import css from './DietaryRequirements.css'

export const DietaryRequirementsPage = (props) => {
  const { recipesForCollections, isMenuLoading } = props

  if (isMenuLoading) {
    return <Loading loading={isMenuLoading} />
  }

  return (
    <div className={css.dietaryContainer}>
      <CategoriesHeaderContainer categoryTitle="Dietary requirements" />
      {recipesForCollections.map(({ collection }) => (
        collection ? <CategoryCarouselContainer key={collection.get('id')} category={collection} /> : null
      ))}
      <DetailOverlayContainer showOverlay />
      <VariantRecipeListModalContainer />
    </div>
  )
}

DietaryRequirementsPage.propTypes = {
  isMenuLoading: PropTypes.bool.isRequired,
  recipesForCollections: PropTypes.arrayOf(
    PropTypes.shape({
      recipeList: PropTypes.shape({
        recipes: ImmutablePropTypes.list
      }),
      collection: ImmutablePropTypes.map
    })
  ).isRequired
}
