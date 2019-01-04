import React from 'react'
import PropTypes from 'prop-types'
import css from './RAFOffer.css'
import { YouGet } from './YouGet.js'
import { YourFriendGets } from './YourFriendGets.js'

class RAFOffer extends React.Component {
  componentDidMount() {
    const { userFetchReferralOffer } = this.props
    userFetchReferralOffer()
  }
  render() {
    const {youGetOffer, offerColour, yourFriendFirstBoxOffer, yourFriendFirstMonthOffer} = this.props

    return (
      <div className={css.rafOffer}>
        <YouGet youGetOffer={youGetOffer} offerColour={offerColour} />
        <YourFriendGets yourFriendFirstBoxOffer={yourFriendFirstBoxOffer} yourFriendFirstMonthOffer={yourFriendFirstMonthOffer} />
      </div>
    )
  }
}

const propTypes = {
  youGetOffer: PropTypes.string,
  yourFriendFirstBoxOffer: PropTypes.string,
  yourFriendFirstMonthOffer: PropTypes.string,
  offerColour: PropTypes.string,
  userFetchReferralOffer: PropTypes.func
}

RAFOffer.propTypes = propTypes

export { RAFOffer }
