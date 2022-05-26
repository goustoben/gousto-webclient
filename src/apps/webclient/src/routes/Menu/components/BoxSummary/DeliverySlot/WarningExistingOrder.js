import React from 'react'

import moment from 'moment'
import PropTypes from 'prop-types'

import css from './DeliverySlot.css'

const WarningExistingOrder = ({ tempDate }) => {
  const date = moment(tempDate, 'YYYY-MM-DD').format('Do MMMM')

  return (
    <span>
      <span className={css.warningTriangle} />
      You have an existing order for
      {date}. Are you sure you want to edit this order?
    </span>
  )
}

WarningExistingOrder.propTypes = {
  tempDate: PropTypes.string.isRequired,
}

export { WarningExistingOrder }
