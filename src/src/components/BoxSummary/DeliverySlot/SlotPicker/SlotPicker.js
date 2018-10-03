import React from 'react'
import { Button, Segment } from 'goustouicomponents'

import css from './SlotPicker.css'

const SlotPicker = ({ slots, date, slotId, onClick }) => (
	<Button color="tertiary" width="full">
		{slots[date] && slots[date].map(slot => (
			<Segment
				key={slot.value}
				fill={slot.value === slotId}
				onClick={() => { onClick(slot.value) }}
				className={(slots[date].length > 2) ? css.compact : ''}
			>
				<span className={css.fullWidth}>
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
