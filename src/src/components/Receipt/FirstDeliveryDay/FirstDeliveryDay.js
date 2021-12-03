import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import moment from 'moment'
import { getSlotTimes } from 'utils/deliveries'
import styles from './FirstDeliveryDay.module.css'

const FirstDeliveryDay = ({ date, deliveryDays, slotId }) => {
  const deliverydate = moment(date).format('ddd D MMM')
  const deliveryTime = getSlotTimes({ date, deliveryDays, slotId })

  return (
    <div className={styles.row}>
      <div className={styles.icon} />
      <div>
        <strong>First delivery: &nbsp;</strong>
        <time className={styles.time}>{`${deliverydate}, ${deliveryTime}`}</time>
      </div>
    </div>
  )
}

FirstDeliveryDay.propTypes = {
  deliveryDays: PropTypes.instanceOf(Immutable.Map).isRequired,
  slotId: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
}

export { FirstDeliveryDay }
