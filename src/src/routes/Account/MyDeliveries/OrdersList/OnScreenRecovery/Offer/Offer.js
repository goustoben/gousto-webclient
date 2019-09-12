import PropTypes from 'prop-types'
import classnames from 'classnames'
import React from 'react'

import css from './Offer.css'

import { ORDER_TYPE, SUBSCRIPTION_TYPE } from '../config'

const propTypesOffer = {
  offer: PropTypes.shape({
    formattedValue: PropTypes.string,
    rawMessage: PropTypes.shape({
      text: PropTypes.string,
      values: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        value: PropTypes.string,
      }))
    })
  }),
  type: PropTypes.oneOf([SUBSCRIPTION_TYPE, ORDER_TYPE])
}

const defaultProps = {
  offer: {}
}

const transformMessage = (text, values) => {
  let formattedText = text

  values.forEach(item => {
    formattedText = formattedText.replace(`{:${item.key}:}`, `<strong>${item.value}</strong>`)
  })

  return formattedText
}

const getDiscountOSRClass = (type) => {
  switch (type) {
  case ORDER_TYPE:
    return 'discountOSROffer'
  case SUBSCRIPTION_TYPE:
    return 'discountOSRSubscription'
  default:
    return 'discountOSROffer'
  }
}

const getMessageDiscountOSRClass = (type) => {
  switch (type) {
  case ORDER_TYPE:
    return 'messageDiscountOSROffer'
  case SUBSCRIPTION_TYPE:
    return 'messageDiscountOSRSubscription'
  default:
    return 'messageDiscountOSROffer'
  }
}

const Offer = ({ offer, type }) => {
  if (!(offer && offer.message)) return null

  let formattedMessage = offer.message
  if (offer.rawMessage && offer.rawMessage.text && offer.rawMessage.values) {
    formattedMessage = transformMessage(offer.rawMessage.text, offer.rawMessage.values)
  }

  return (
    <div className={css.offerWrapper}>
      <div className={classnames(css.discountOSR, css[getDiscountOSRClass(type)])}>
        <div className={css.discountOSR__container}>
          {offer.formattedValue}
          <small className={css.discountOSR__sub}>OFF</small>
        </div>
      </div>
      <div
        className={classnames(css.messageDiscountOSR, css[getMessageDiscountOSRClass(type)])}
        dangerouslySetInnerHTML={{ __html: formattedMessage }} // eslint-disable-line react/no-danger
      />
    </div>
  )
}

Offer.propTypes = propTypesOffer
Offer.defaultProps = defaultProps

export { Offer }
