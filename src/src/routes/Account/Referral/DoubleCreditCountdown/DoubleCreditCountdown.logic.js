import React from 'react'
import PropTypes from 'prop-types'
import { DoubleCreditCountdownPresentation } from './DoubleCreditCountdown.presentation'

const propTypes = {
  description: PropTypes.string.isRequired,
  expiry: PropTypes.string.isRequired,
}

const DoubleCreditCountdown = ({description, expiry}) => {

  return <DoubleCreditCountdownPresentation title={description} days={12} hours={4} minutes={12}/>
}

DoubleCreditCountdown.propTypes = propTypes

export { DoubleCreditCountdown }