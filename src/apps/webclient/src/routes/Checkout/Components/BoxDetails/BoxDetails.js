import React from 'react'

import Link from 'Link'
import Immutable from 'immutable'
import moment from 'moment'
import PropTypes from 'prop-types'

import routes from 'config/routes'
import { getSlotTimes } from 'utils/deliveries'

import { RecipeSummary } from '../RecipeSummary'

import css from './BoxDetails.css'

export const BoxDetails = ({ numPortions, date, deliveryDays, slotId }) => {
  const deliveryDate = moment(date).format('dddd Do MMMM')
  const deliveryTime = getSlotTimes({ date, deliveryDays, slotId })

  return (
    <div className={css.container} data-testing="checkoutBoxDetailsSection">
      <div className={css.headerWrapper}>
        <h3 className={css.header}>{`Your box (${numPortions} people)`}</h3>
        <span className={css.editOrder}>
          <Link to={routes.client.menu} clientRouted>
            Edit order
          </Link>
        </span>
      </div>

      <RecipeSummary />

      <div className={css.separator} />
      <div className={css.headerWrapper}>
        <h3 className={css.header}>Delivery date</h3>
      </div>
      <p className={css.deliveryDate}>{deliveryDate}</p>
      <p className={css.deliveryTime}>{deliveryTime}</p>
    </div>
  )
}

BoxDetails.propTypes = {
  numPortions: PropTypes.number,
  deliveryDays: PropTypes.instanceOf(Immutable.Map).isRequired,
  slotId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
}

BoxDetails.defaultProps = {
  numPortions: 0,
}
