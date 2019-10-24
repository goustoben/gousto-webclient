import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import Recipe from 'containers/menu/Recipe'

const propTypes = {
  isCurrentCollectionRecommendation: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  thematicName: PropTypes.string,
  deliveryDate: PropTypes.string,
  collectionFilterChange: PropTypes.func
}

const CTACard = ({ isCurrentCollectionRecommendation, thematicName, deliveryDate, collectionFilterChange }) => {
  if (thematicName) {
    // if no date is available, add 3 to the current date for the earliest possible delivery date
    const selectedDate = deliveryDate || moment().add(3, 'days').toISOString()

    return (
      <Recipe
        key={'ctaThematic'}
        view={'ctaThematic'}
        thematicName={thematicName}
        selectedDate={selectedDate}
      />
    )
  }

  if (isCurrentCollectionRecommendation) {
    return (
      <Recipe
        key={'ctaAllRecipe'} 
        view={'ctaAllRecipe'} 
        collectionFilterChange={collectionFilterChange}
      />
    )
  }

  return null
}

CTACard.propTypes = propTypes

export { CTACard }
