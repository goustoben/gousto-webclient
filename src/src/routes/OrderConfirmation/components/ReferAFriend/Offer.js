import React from 'react'
import PropTypes from 'prop-types'
import { config } from './config.js'
import css from './ReferAFriend.css'

const propTypes = {
  isYourOffer: PropTypes.bool,
  offer: PropTypes.string,
  theirMonthOffer: PropTypes.string,
}

const Offer = ({ isYourOffer, offer, theirMonthOffer }) => {
  const offerConfig = config(theirMonthOffer)
  const title = isYourOffer ? offerConfig.youGetTitle : offerConfig.yourFriendGetsTitle
  const description = isYourOffer ? offerConfig.youGetDescription : offerConfig.yourFriendGetsDescription

  return (
    <section className={css.offerWrapper}>
      <div className={css.offerTitle}>{title}</div>
      <div className={css.offer}>{offer}</div>
      <div className={css.offerDescription}>{description}</div>
    </section>
  )
}

Offer.propTypes = propTypes

export { Offer }
