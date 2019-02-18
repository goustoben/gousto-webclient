import PropTypes from 'prop-types'
import React from 'react'
import CallsToAction from 'containers/SubscriptionPause/callsToAction'

const SubscriptionPauseCallToAction = ({ type, ...passThroughProps }) => {
  const Ele = CallsToAction[type]

  return Ele ? <Ele {...passThroughProps} /> : null
}

SubscriptionPauseCallToAction.propTypes = {
  color: PropTypes.oneOf([
    'primary',
  ]),
  disabled: PropTypes.bool,
  fill: PropTypes.bool,
  pending: PropTypes.bool,
  text: PropTypes.string,
  type: PropTypes.oneOf(Object.keys(CallsToAction)).isRequired,
  width: PropTypes.oneOf([
    'auto',
    'full',
  ]),
}

export default SubscriptionPauseCallToAction
