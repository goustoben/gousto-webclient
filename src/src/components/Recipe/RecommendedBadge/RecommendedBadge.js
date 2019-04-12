import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'

import InfoBadge from '../InfoBadge'

const RecommendedBadge = ({ isRecommendedRecipe, features }) => (
  (isRecommendedRecipe && features.getIn(['recommendedBadge', 'value']))
    ? (<InfoBadge recommended>Recommended for you</InfoBadge>)
    : null
)

RecommendedBadge.propTypes = {
  isRecommendedRecipe: PropTypes.bool,
  features: PropTypes.instanceOf(Immutable.Map).isRequired,
}

export default RecommendedBadge
