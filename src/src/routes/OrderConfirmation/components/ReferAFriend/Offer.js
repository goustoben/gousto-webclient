import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  isYourOffer: PropTypes.bool,
  offer: PropTypes.string,
  theirMonthOffer: PropTypes.string,
}

const Offer = ({ isYourOffer, offer, theirMonthOffer }) => {
  const title = isYourOffer ? "You get" : "Your friend gets"
  const description = isYourOffer ? "when your friend gets their first box" : `off their first box + ${theirMonthOffer} off their first month`

  return (
    <section>
      <div>{title}</div>
      <div>{offer}</div>
      <div>{description}</div>
    </section>
  )
}

Offer.propTypes = propTypes

export { Offer }
