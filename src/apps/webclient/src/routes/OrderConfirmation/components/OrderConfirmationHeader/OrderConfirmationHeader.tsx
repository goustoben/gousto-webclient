import React from 'react'

import classnames from 'classnames'

import css from './OrderConfirmationHeader.css'

type Props = {
  deliveryDate: string
  deliveryStart: string
  deliveryEnd: string
  whenCutoffTime: string
  whenCutoffDate: string
}

const OrderConfirmationHeader = ({
  deliveryDate,
  deliveryStart,
  deliveryEnd,
  whenCutoffTime,
  whenCutoffDate,
}: Props) => (
  <div data-testing="orderConfirmationHeader">
    <p className={css.paragraph}>
      Delivery date: {deliveryDate}
      {', '}
      between {deliveryStart} and {deliveryEnd}
    </p>
    <p className={classnames(css.paragraph, css.bold)}>
      You can edit your choices until {whenCutoffTime} on {whenCutoffDate}
    </p>
  </div>
)

export { OrderConfirmationHeader }
