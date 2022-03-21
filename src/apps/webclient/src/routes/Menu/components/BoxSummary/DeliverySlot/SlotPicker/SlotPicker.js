import PropTypes from 'prop-types'
import React from 'react'
import { Button, Segment } from 'goustouicomponents'
import classnames from 'classnames'

import { slotsPropType } from '../deliverySlotPropTypes'
import css from './SlotPicker.css'

const SlotPicker = ({ slots, date, slotId, onClick }) => {
  const hasMoreThanTwoSlots = slots[date] && slots[date].length > 2

  return (
    <Button color="quaternary" width="full">
      {slots[date] && slots[date].map(slot => (
        <Segment
          key={slot.value}
          fill={slot.value === slotId && !slot.disabled}
          onClick={() => {
            if (!slot.disabled) {
              onClick(slot.value)
            }
          }}
          className={classnames(
            {[css.disabled]: slot.disabled },
            {[css.enabled]: !slot.disabled },
            {[css.selected]: slot.value === slotId },
            {[css.compact]: hasMoreThanTwoSlots}
          )}
          noHover={slot.disabled}
          disabled={slot.disabled}
        >
          <span className={css.fullWidth}>
            <span
              className={
                classnames(
                  hasMoreThanTwoSlots ? css.blockLabel : css.label,
                  slot.disabled && css.disableLabel,
                )
              }
            >
              {slot.label}
              <span className={hasMoreThanTwoSlots ? css.blockLabel : css.inlineLabel}>{slot.subLabel}</span>
            </span>
          </span>
        </Segment>
      ))}
    </Button>
  )
}

SlotPicker.propTypes = {
  slots: slotsPropType.isRequired,
  date: PropTypes.string.isRequired,
  slotId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export { SlotPicker }
