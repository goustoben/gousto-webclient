import React from 'react'
import PropTypes from 'prop-types'
import css from './ReferAFriend.css'

const propTypes = {
  isYourOffer: PropTypes.bool,
  offer: PropTypes.string,
  theirMonthOffer: PropTypes.string,
}

const Offer = ({ isYourOffer, offer, theirMonthOffer }) => {
  const title = isYourOffer ? "You get" : "Your friend gets"
  const description = isYourOffer ? "when your friend gets their first box" : `off their first box + ${theirMonthOffer} off their first month`

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
