import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import moment from 'moment'
import { getSlot } from 'utils/deliveries'
import { Button, Segment } from 'goustouicomponents'

import css from '../Details.css'

const slotTimes = (props) => {
  const { date, deliveryDays, slotId } = props
  const chosenSlot = getSlot(deliveryDays, date, slotId)
  let slotText = ''
  if (chosenSlot) {
    slotText = `${moment(`${date} ${chosenSlot.get('deliveryStartTime')}`).format('ha')} - ${moment(`${date} ${chosenSlot.get('deliveryEndTime')}`).format('ha')} `
  }

  return slotText
}

const DateHeader = (props) => {
  const {
    orderId,
    date,
    deliveryDays,
    slotId,
    clearSlot
  } = props

  if (orderId) {
    return (
      <div className={css.row}>
        <p className={css.deliverySlotText}>
          Edit recipes for your upcoming box. To change date or cancel box, visit &apos;My Deliveries&apos;
        </p>
        <p className={css.dateText}>{`${moment(date).format('ddd Do MMM')}, ${slotTimes({ date, deliveryDays, slotId })}`}</p>
      </div>
    )
  }
  const text = `${moment(date).format('ddd Do MMM')}, ${slotTimes({ date, deliveryDays, slotId })}`

  return (
    <div className={css.rowSMMargin}>
      <Button fill={false} width="full">
        <Segment onClick={clearSlot} fill={false}>
          <span className={text.length > 21 ? css.limitedLengthPadding : css.limitedLength}>{text}</span>
          <span className={css.clear}>
            <span className={css.clearIcon}></span>
            edit
          </span>
        </Segment>
      </Button>
    </div>
  )
}

DateHeader.propTypes = {
  orderId: PropTypes.string,
  date: PropTypes.string,
  clearSlot: PropTypes.func,
  deliveryDays: PropTypes.instanceOf(Immutable.Map),
  slotId: PropTypes.string,
}

export { DateHeader }
