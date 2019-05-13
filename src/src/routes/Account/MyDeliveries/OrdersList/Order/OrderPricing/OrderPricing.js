import PropTypes from 'prop-types'
import React from 'react'

import Immutable from 'immutable'
import css from './OrderPricing.css'
import DiscountBadge from './DiscountBadge'

const OrderPricing = ({ pricing, orderState }) => {
  const grossOrderPrice = pricing.get('grossOrderPrice')
  const netOrderPrice = pricing.get('netOrderPrice')

  return (
    <div className={css.pricingContainer}>
      {['recipes chosen', 'confirmed', 'dispatched', 'cancelled'].indexOf(orderState) > -1 ?
        <div>
          <div className={css.fullPrice}>
            £{parseFloat(grossOrderPrice).toFixed(2)}
          </div>
          <div className={css.total}>
            £{parseFloat(netOrderPrice).toFixed(2)}
          </div>
        </div>
        : null}
      {(orderState === 'menu open' && (pricing.get('flatDiscountAmount') || pricing.get('percentageDiscountAmount'))) ?
        <DiscountBadge flatDiscountAmount={pricing.get('flatDiscountAmount')} percentageDiscountAmount={pricing.get('percentageDiscountAmount')} />
        : null}
    </div>
  )
}

OrderPricing.propTypes = {
  pricing: PropTypes.instanceOf(Immutable.Map),
  orderState: PropTypes.string,
}

OrderPricing.defaultProps = {
  pricing: Immutable.Map([]),
  orderState: '',
}

export default OrderPricing
