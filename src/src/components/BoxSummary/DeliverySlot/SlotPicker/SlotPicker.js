import React from 'react'
import { Button, Segment } from 'goustouicomponents'
import classnames from 'classnames'

import css from './SlotPicker.css'

const SlotPicker = ({ slots, date, slotId, onClick }) => (
	<Button color="tertiary" width="full">
		{slots[date] && slots[date].map(slot => (
			<Segment
			  key={slot.value}
			  fill={slot.value === slotId && !slot.disabled}
			  onClick={() => { slot.disabled ? null : onClick(slot.value)}}
			  className={classnames(
			    {[css.disabled]: slot.disabled }, 
			    {[css.compact]: (slots[date].length > 2)}
     		)}
			  noHover={slot.disabled}
			>
				<span className={css.fullWidth}>
					<span className={css.iconDisabled} />
					<span className={(slots[date].length > 2) ? css.blockLabel : css.label}>{slot.label}</span>
					<span className={(slots[date].length > 2) ? css.blockLabel : css.inlineLabel}>{slot.subLabel}</span>
				</span>
			</Segment>
		))}
	</Button>
)

SlotPicker.propTypes = {
  slots: React.PropTypes.object,
  date: React.PropTypes.string,
  slotId: React.PropTypes.string,
  onClick: React.PropTypes.func,
}

export default SlotPicker
