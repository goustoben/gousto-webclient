import PropTypes from 'prop-types'
import React from 'react'

import Calendar from 'Form/Calendar'
import DropdownInput from 'Form/Dropdown'
import { SlotPicker } from '../SlotPicker'

import css from '../DeliverySlot.css'

const DatePicker = (props) => {
  const {
    slots,
    slotId,
    deliveryDays,
    disableNewDatePicker,
    tempDate,
    tempSlotId,
    tempOrderId,
    setTempSlotId,
    handleDateChange,
    subLabelClassName,
  } = props
  const deliverySlotOptions = slots[tempDate] || []

  return disableNewDatePicker
    ? (
      <div className={css.bsRow}>
        <div className={css.halfLeft}>
          <DropdownInput
            color="secondary"
            uppercase
            options={deliveryDays}
            onChange={handleDateChange}
            value={tempDate}
            className={css.dropdown}
            subLabelClassName={subLabelClassName}
          />
        </div>
        <div className={css.halfRight}>
          <DropdownInput
            color="secondary"
            uppercase
            options={deliverySlotOptions}
            onChange={setTempSlotId}
            value={tempSlotId}
            className={css.dropdown}
          />
        </div>
      </div>
    )
    : (
      <span>
        <div className={css.row}>
          <Calendar dates={deliveryDays} selected={tempDate} onClick={handleDateChange} />
        </div>
        <div className={tempOrderId ? css.disabledRow : css.row}>
          <SlotPicker slots={slots} date={tempDate} slotId={slotId} onClick={setTempSlotId} />
        </div>
      </span>
    )
}

DatePicker.propTypes = {
  slots: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
    coreSlotId: PropTypes.string,
    disabled: PropTypes.bool
  }).isRequired,
  slotId: PropTypes.string.isRequired,
  deliveryDays: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    icon: PropTypes.string,
    orderId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.oneOf([undefined])
    ]),
    orderEmpty: PropTypes.bool
  })).isRequired,
  disableNewDatePicker: PropTypes.bool.isRequired,
  tempDate: PropTypes.string.isRequired,
  tempSlotId: PropTypes.string.isRequired,
  tempOrderId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([undefined])
  ]).isRequired,
  subLabelClassName: PropTypes.string.isRequired,
  setTempSlotId: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired
}
export { DatePicker }
