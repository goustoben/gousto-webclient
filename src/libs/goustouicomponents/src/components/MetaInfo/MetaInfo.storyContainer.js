import React from 'react'
import PropTypes from 'prop-types'
import IconClock from '../../design-language/icons/icon-clock.svg'
import IconLocation from '../../design-language/icons/icon-location.svg'

export const IconChoice = ({ iconName }) => {
  switch (iconName) {
    case 'clock': return <IconClock />
    default: return <IconLocation />
  }
}

IconChoice.propTypes = {
  iconName: PropTypes.oneOf(['clock', 'location']).isRequired,
}
