import React, { PropTypes } from 'react'

import css from './Offer.css'

const propTypes = {
  offer: PropTypes.shape({
    formattedValue: PropTypes.string,
    rawMessage: PropTypes.shape({
      text: PropTypes.string,
      values: PropTypes.array({
        key: PropTypes.string,
        value: PropTypes.string,
      })
    })
  }).isRequired
}

const transformMessage = (text, values) => {
  let formattedText = text

  values.forEach(item => {
    formattedText = formattedText.replace(`{:${item.key}:}`, `<strong>${item.value}</strong>`)
  })

  return formattedText
}

const Offer = ({ offer }) => {
  if (!(offer && offer.message)) return null

  let formattedMessage = offer.message
  if (offer.rawMessage && offer.rawMessage.text && offer.rawMessage.values) {
    formattedMessage = transformMessage(offer.rawMessage.text, offer.rawMessage.values)
  }

  return (
    <div className={css.offerWrapper}>
      <div className={css.discountOSR}>
        <div className={css.discountOSR__container}>
          {offer.formattedValue}
          <small className={css.discountOSR__sub}>OFF</small>
        </div>
      </div>
      <div className={css.messageDiscountOSR} dangerouslySetInnerHTML={{ __html: formattedMessage }} />
    </div>
  )
}

Offer.propTypes = propTypes

export default Offer
