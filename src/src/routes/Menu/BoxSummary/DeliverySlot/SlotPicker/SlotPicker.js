import PropTypes from 'prop-types'
import React from 'react'
import { Button, Segment } from 'goustouicomponents'
import classnames from 'classnames'

import css from './SlotPicker.css'

const SlotPicker = ({ slots, date, slotId, onClick }) => (
  <Button color="quaternary" width="full">
    {slots[date] && slots[date].map(slot => (
      <Segment
        key={slot.value}
        fill={slot.value === slotId && !slot.disabled}
        onClick={() => { slot.disabled ? null : onClick(slot.value) }}
        className={classnames(
          {[css.disabled]: slot.disabled },
          {[css.enabled]: !slot.disabled },
          {[css.selected]: slot.value === slotId },
          {[css.compact]: (slots[date].length > 2)}
        )}
        noHover={slot.disabled}
        disabled={slot.disabled}
      >
        <span className={css.fullWidth}>
          {slot.disabled ? <div className={(slots[date].length > 2) ? css.disabledLine1 : css.bigDisabledLine1 } /> : null}
          {slot.disabled ? <div className={(slots[date].length > 2) ? css.disabledLine2 : css.bigDisabledLine2 } /> : null}
          <span className={(slots[date].length > 2) ? css.blockLabel : css.label}>{slot.label}</span>
          <span className={(slots[date].length > 2) ? css.blockLabel : css.inlineLabel}>{slot.subLabel}</span>
        </span>
      </Segment>
    ))}
  </Button>
)

SlotPicker.propTypes = {
  slots: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  slotId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export { SlotPicker }
