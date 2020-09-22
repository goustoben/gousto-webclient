import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Navbar } from './Navbar'
import { CategoryCarousel } from '../CategoryCarousel'
import { DetailOverlayContainer } from '../../DetailOverlay'
import Loading from '../../Loading'

export const DietaryRequirementsPage = (props) => {
  const { recipesForCollections, isMenuLoading } = props

  if (isMenuLoading) {
    return <Loading loading={isMenuLoading} />
  }

  return (
    <div>
      <Navbar title="Dietary requirements" />
      {recipesForCollections.map(({ recipeList, collection }) => (
        recipeList && collection ? <CategoryCarousel key={collection.get('id')} recipes={recipeList.recipes} category={collection} /> : null
      ))}
      <DetailOverlayContainer showOverlay />
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
