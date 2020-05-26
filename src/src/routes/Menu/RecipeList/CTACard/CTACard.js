import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import { CTAToAllRecipesContainer } from '../../Recipe/CTAToAllRecipes/CTAToAllRecipesContainer'
import { CTAThematic } from '../../Recipe/CTAThematic'

const propTypes = {
  isCurrentCollectionRecommendation: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  thematicName: PropTypes.string,
  deliveryDate: PropTypes.string,
}

const defaultProps = {
  isCurrentCollectionRecommendation: false,
  thematicName: null,
  deliveryDate: null,
}

const CTACard = ({ isCurrentCollectionRecommendation, thematicName, deliveryDate }) => {
  if (thematicName) {
    // earliest possible delivery date is 3 days in future, so set to that if none provided
    const selectedDate = deliveryDate || moment().add(3, 'days').toISOString()

    return <CTAThematic name={thematicName} selectedDate={selectedDate} />
  }

  if (isCurrentCollectionRecommendation) {
    return <CTAToAllRecipesContainer />
  }

  return null
}

CTACard.propTypes = propTypes
CTACard.defaultProps = defaultProps

export { CTACard }
