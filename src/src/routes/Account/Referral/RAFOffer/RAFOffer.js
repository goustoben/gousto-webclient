import React from 'react'
import PropTypes from 'prop-types'
import css from './RAFOffer.css'
import { YouGet } from './YouGet.js'
import { YourFriendGets } from './YourFriendGets.js'

class RAFOffer extends React.Component {
  componentDidMount() {
    const { userFetchReferralOffer } = this.props
    console.log("userFetchReferralOffer", userFetchReferralOffer()) //eslint-disable-line
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

// const RAFOffer = ({ youGetOffer, yourFriendFirstBoxOffer, yourFriendFirstMonthOffer, offerColour }) => {
//   return (
//     <div className={css.rafOffer}>
//       <YouGet youGetOffer={youGetOffer} offerColour={offerColour} />
//       <YourFriendGets yourFriendFirstBoxOffer={yourFriendFirstBoxOffer} yourFriendFirstMonthOffer={yourFriendFirstMonthOffer} />
//     </div>
//   )
// }

const propTypes = {
  youGetOffer: PropTypes.string,
  yourFriendFirstBoxOffer: PropTypes.string,
  yourFriendFirstMonthOffer: PropTypes.string,
  offerColour: PropTypes.string
}

RAFOffer.propTypes = propTypes

export { RAFOffer }
