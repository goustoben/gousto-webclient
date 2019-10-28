import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Recipe from 'containers/menu/Recipe'

const propTypes = {
  isCurrentCollectionRecommendation: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]).isRequired,
  thematicName: PropTypes.string.isRequired,
  deliveryDate: PropTypes.string.isRequired,
  collectionFilterChange: PropTypes.func.isRequired
}

const CTACard = ({ isCurrentCollectionRecommendation, thematicName, deliveryDate, collectionFilterChange }) => {
  if (thematicName) {
    // earliest possible delivery date is 3 days in future, so set to that if none provided
    const selectedDate = deliveryDate || moment().add(3, 'days').toISOString()

    return (
      <Recipe
        view={'ctaThematic'}
        thematicName={thematicName}
        selectedDate={selectedDate}
      />
    )
  }

  if (isCurrentCollectionRecommendation) {
    return (
      <Recipe
        view={'ctaAllRecipe'} 
        collectionFilterChange={collectionFilterChange}
      />
    )
  }

  return null
}

CTACard.propTypes = propTypes

export { CTACard }
