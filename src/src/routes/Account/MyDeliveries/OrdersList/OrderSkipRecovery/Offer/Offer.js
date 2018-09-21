import React, { PropTypes } from 'react'

import css from './Offer.css'

const propTypes = {
  offer: PropTypes.shape({
    formatted_value: PropTypes.string,
    raw_message: PropTypes.shape({
      text: PropTypes.string,
      values: PropTypes.shape({
        date: PropTypes.string,
        value: PropTypes.string,
      })
    })
  }).isRequired
}

const transformMessage = (text) => {
  // [firstPart][value][secondPart][date]
  const textSplitByValue = text.split('{:value:}')
  const firstPart = textSplitByValue[0]
  const textSplitByDate = textSplitByValue[1].split('{:date:}')
  const secondPart = textSplitByDate[0]

  return {
    firstPart,
    secondPart
  }
}

const Offer = ({ offer }) => {
	if (!offer) return null

  const offerValue = offer.raw_message.values.value
  const offerDate = offer.raw_message.values.date

  const formattedMessage = transformMessage(offer.raw_message.text, offerValue, offerDate)

  return (
    <div className={css.offerWrapper}>
      <div className={css.discountOSR}><div>{offer.formatted_value} OFF</div></div>
      <div className={css.messageDiscountOSR}>
        {formattedMessage.firstPart}
        <strong>{offerValue} OFF</strong>
        {formattedMessage.secondPart}
        <strong>{offerDate}</strong>
      </div>
    </div>
  )
}

Offer.propTypes = propTypes

export default Offer
