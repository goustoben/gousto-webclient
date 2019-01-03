import React from 'react'
import PropTypes from 'prop-types'
import css from './RAFOffer.css'
import { YouGet } from './YouGet.js'
import { YourFriendGets } from './YourFriendGets.js'

const RAFOffer = ({ youGetOffer, yourFriendFirstBoxOffer, yourFriendFirstMonthOffer, offerColour }) => {
  return (
    <div className={css.rafOffer}>
      <YouGet youGetOffer={youGetOffer} offerColour={offerColour} />
      <YourFriendGets yourFriendFirstBoxOffer={yourFriendFirstBoxOffer} yourFriendFirstMonthOffer={yourFriendFirstMonthOffer} />
    </div>
  )
}

const propTypes = {
  youGetOffer: PropTypes.string,
  yourFriendFirstBoxOffer: PropTypes.string,
  yourFriendFirstMonthOffer: PropTypes.string,
  offerColour: PropTypes.string
}

RAFOffer.propTypes = propTypes

export { RAFOffer }
