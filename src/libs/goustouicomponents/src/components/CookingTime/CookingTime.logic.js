import React from 'react'
import PropTypes from 'prop-types'
import { MetaInfo } from '../MetaInfo'
import ClockIcon from '../../design-language/icons/icon-clock.svg'

const CookingTime = ({ cookingTime }) => (
  <MetaInfo label={`${cookingTime} mins`}>
    <ClockIcon alt="clock" />
  </MetaInfo>
)

CookingTime.propTypes = {
  cookingTime: PropTypes.number.isRequired,
}

export { CookingTime }
