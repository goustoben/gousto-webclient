import React from 'react'
import PropTypes from 'prop-types'
import { InfoBadgeContainer } from './InfoBadgeContainer'

const InfoBadges = ({ slugs }) => (
  <span>
    {slugs.map(slug => <InfoBadgeContainer key={slug} slug={slug} />)}
  </span>
)

InfoBadges.propTypes = {
  slugs: PropTypes.arrayOf(PropTypes.string).isRequired
}

export { InfoBadges }
