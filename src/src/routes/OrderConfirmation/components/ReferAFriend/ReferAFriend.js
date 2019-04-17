import React from 'react'
import PropTypes from 'prop-types'
import { Offer } from './Offer'

const propTypes = {
  rafOffer: PropTypes.shape({
    creditFormatted: PropTypes.string,
    firstBoxDiscountFormatted: PropTypes.string,
    firstMonthDiscountFormatted: PropTypes.string,
  })
}

const ReferAFriend = ({ rafOffer }) => {
  const yourOffer = rafOffer.get('creditFormatted')
  const theirBoxOffer = rafOffer.get('firstBoxDiscountFormatted')
  const theirMonthOffer = rafOffer.get('firstMonthDiscountFormatted')

  return (
    <section>
      <h3>Share the Gousto experience</h3>
      <p>Refer a friend - and you both save.</p>
      <Offer isYourOffer offer={yourOffer} />
      <Offer isYourOffer={false} offer={theirBoxOffer} theirMonthOffer={theirMonthOffer} />

    </section>
  )
}

ReferAFriend.propTypes = propTypes

export { ReferAFriend }
