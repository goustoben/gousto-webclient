import React from 'react'
import PropTypes from 'prop-types'
import { MetaInfo } from '../MetaInfo'
import LocationIcon from '../../design-language/icons/icon-location.svg'

const Cuisine = ({ name }) => (
  <MetaInfo label={name}>
    <LocationIcon alt="location icon" />
  </MetaInfo>
)

Cuisine.propTypes = {
  name: PropTypes.string.isRequired,
}

export { Cuisine }
