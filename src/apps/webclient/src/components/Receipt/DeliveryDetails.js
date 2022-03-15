import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import moment from 'moment'
import { toTimeRange } from 'utils/deliverySlot'
import css from './DeliveryDetails.css'

export const DeliveryDetails = (props) => {
  const { address, date, slot } = props
  const deliveryDate = moment(date).format('ddd, D MMM')
  const deliveryTime = toTimeRange(slot)

  const shippingDetails = [
    address.get('line1'),
    address.get('line2'),
    address.get('line3'),
    address.get('town'),
    address.get('postcode'),
    `${deliveryDate}, ${deliveryTime}`,
  ]
    .filter(lineItem => !!lineItem)

  return (
    <span
      className={css.content}
      data-hj-masked
    >
      {/* eslint-disable-next-line react/no-array-index-key */}
      {shippingDetails.map((shippingDetail, key) => <span key={key} className={css.shippingDetail}>{shippingDetail}</span>)}
    </span>
  )
}

DeliveryDetails.propTypes = {
  address: PropTypes.instanceOf(Immutable.Map),
  date: PropTypes.string,
  slot: PropTypes.object,
}

DeliveryDetails.defaultProps = {
  address: Immutable.Map({}),
  date: '',
  slot: {}
}
