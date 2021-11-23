import React from 'react'
import PropTypes from 'prop-types'
import Svg from 'Svg'
import { WarningExistingOrder } from '../WarningExistingOrder'
import css from '../DeliverySlot.css'

const DeliverySupportingText = ({ hasEmptyOrders, hasFullOrders, doesDateHaveDisabledSlots, showWarning, tempDate }) => {
  let warningMessage
  if (showWarning) {
    warningMessage = (
      <WarningExistingOrder tempDate={tempDate} />
    )
  }
  let deliveryCopy = 'You choose how often you would like to receive boxes after checkout.'
  if (hasFullOrders) {
    deliveryCopy = (
      <div>
        <Svg fileName="icon_Booked-delivery" className={css.upcomingOrder} />
        <span> Upcoming delivery – items chosen</span>
      </div>
    )
  }

  let deliveryCopyEmpty
  if (hasEmptyOrders) {
    deliveryCopyEmpty = (
      <div>
        <Svg fileName="icon_Scheduled-delivery" className={css.upcomingOrder} />
        <span> Upcoming delivery – items not chosen</span>
      </div>
    )
  }

  return (
    <span className={css.supportingText}>
      {warningMessage ? <p className={css.errorText}>{warningMessage}</p> : <p>{deliveryCopy}</p>}
      {!warningMessage && <p>{deliveryCopyEmpty}</p>}
      {doesDateHaveDisabledSlots && (
        <div>
          <Svg fileName="icon_Delivery-unavailable" className={css.iconDisabled} />
          <p className={css.disabledSlotText}> Unavailable due to high demand</p>
        </div>
      )}
    </span>
  )
}

DeliverySupportingText.propTypes = {
  hasEmptyOrders: PropTypes.bool.isRequired,
  hasFullOrders: PropTypes.bool.isRequired,
  doesDateHaveDisabledSlots: PropTypes.bool.isRequired,
  showWarning: PropTypes.bool.isRequired,
  tempDate: PropTypes.string.isRequired,
}
export { DeliverySupportingText }
