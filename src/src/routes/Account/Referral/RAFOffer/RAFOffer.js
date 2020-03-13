import React from 'react'
import PropTypes from 'prop-types'
import css from './RAFOffer.css'
import { YouGet } from './YouGet.js'
import { YourFriendGets } from './YourFriendGets.js'

const propTypes = {
  youGetOffer: PropTypes.string,
  yourFriendFirstBoxOffer: PropTypes.string,
  yourFriendFirstMonthOffer: PropTypes.string,
  offerColour: PropTypes.string,
}

const defaultProps = {
  youGetOffer: '',
  yourFriendFirstBoxOffer: '',
  yourFriendFirstMonthOffer: '',
  offerColour: '',
}

const RAFOffer = ({youGetOffer, offerColour, yourFriendFirstBoxOffer, yourFriendFirstMonthOffer}) => (
  <div className={css.rafOffer}>
    <YouGet youGetOffer={youGetOffer} offerColour={offerColour} />
    <YourFriendGets yourFriendFirstBoxOffer={yourFriendFirstBoxOffer} yourFriendFirstMonthOffer={yourFriendFirstMonthOffer} />
  </div>
)

RAFOffer.propTypes = propTypes
RAFOffer.defaultProps = defaultProps

export { RAFOffer }
