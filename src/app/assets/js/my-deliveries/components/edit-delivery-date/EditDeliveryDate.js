import React, { PropTypes } from 'react'
import { formatTime, formatShortDate, formatFullDate } from '../../datetimeFormatter'
import Dropdown from './Dropdown'
import { Button } from '@fe/gousto-generic'
import moment from 'moment'

class EditDeliveryDate extends React.Component {

	static propTypes = {
		error: PropTypes.string,
		days: PropTypes.array.isRequired,
		slots: PropTypes.array.isRequired,
		handleSetDay: PropTypes.func,
		handleSetSlot: PropTypes.func,
		selectedDay: PropTypes.object.isRequired,
		selectedSlot: PropTypes.object.isRequired,
		updateOrderDate: PropTypes.func,
		saving: PropTypes.bool,
		loading: PropTypes.bool,
		takenDates: PropTypes.array,
	}

	static defaultProps = {
		error: null,
		handleSetDay: () => {},
		handleSetSlot: () => {},
		updateOrderDate: () => {},
		saving: false,
		loading: false,
		takenDates: [],
	}

	getDayOptions = () => this.props.days.map(day => ({
		onClick: this.props.handleSetDay(day),
		text: formatShortDate(day.date),
		disabled: this.checkDayTaken(day),
	}))

	getSlotOptions = () => this.props.slots.map(slot => ({
		onClick: this.props.handleSetSlot(slot),
		text: `${formatTime(slot.delivery_start_time)} - ${formatTime(slot.delivery_end_time)}`,
		subtext: parseFloat(slot.delivery_price) > 0 ? `£${parseFloat(slot.delivery_price)}` : '',
		hidden: this.isSlotCutoffBeforeNow(slot),
	}))

	isSlotCutoffBeforeNow = (slot) => moment(slot.when_cutoff).isBefore()

	checkDayTaken = (day) => this.props.takenDates.some((taken) => formatFullDate(taken) === day.date)

	render() {
		return (
			<div>
				<div className="edit-delivery-date-form">
					<Dropdown
						className="day-dropdown"
						btnText={formatShortDate(this.props.selectedDay.date)}
						options={this.getDayOptions()}
						disabled={this.props.loading}
					/>
					<Dropdown
						className="slot-dropdown"
						btnText={`${formatTime(this.props.selectedSlot.delivery_start_time)} - ${formatTime(this.props.selectedSlot.delivery_end_time)}`}
						options={this.getSlotOptions()}
						disabled={this.props.loading}
					/>
					<Button
						className="gbtn-secondary edit-delivery-submit"
						disabled={this.props.loading || this.props.saving}
						loading={this.props.saving}
						onClick={this.props.updateOrderDate}
					>
						SAVE DATE
					</Button>
				</div>
				{this.props.error ? <div className="error">{this.props.error}</div> : ''}
			</div>
		)
	}
}

export default EditDeliveryDate
