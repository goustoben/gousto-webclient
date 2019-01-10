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

const RAFOffer = ({youGetOffer, offerColour, yourFriendFirstBoxOffer, yourFriendFirstMonthOffer}) => {

  return (
      <div className={css.rafOffer}>
        <YouGet youGetOffer={youGetOffer} offerColour={offerColour} />
        <YourFriendGets yourFriendFirstBoxOffer={yourFriendFirstBoxOffer} yourFriendFirstMonthOffer={yourFriendFirstMonthOffer} />
      </div>
  )
}

RAFOffer.propTypes = propTypes

export { RAFOffer }
