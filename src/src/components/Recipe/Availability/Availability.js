import React from 'react'
import css from './Availability.css'
import moment from 'moment'
import Immutable from 'immutable'

function getAvailability(availability, cutoffDate) {
	if (availability) {
		const now = moment(cutoffDate)
		const matchedDates = availability.find(dates => {
			const dateFrom = dates.get('from')
			const dateUntil = dates.get('until')

			if (dateFrom[0] !== '-' && dateUntil[0] !== '-') {
				try {
					const start = moment(dateFrom)
					const end = moment(dateUntil)

					return (now.isSameOrAfter(start) && now.isSameOrBefore(end))
				} catch (err) {
					return false
				}
			}

			return false
		})

		if (matchedDates) {
			return matchedDates.toJS()
		}
	}

	return false
}

const Availability = ({ availability, cutoffDate }) => {
	if (cutoffDate) {
		const dates = getAvailability(availability, cutoffDate)
		if (dates) {
			const startDate = moment(dates.from)
			const endDate = moment(dates.until)
			let displayDate
			if (endDate.month() === startDate.month()) {
				displayDate = `${startDate.date()} - ${endDate.date()} ${endDate.format('MMM')}`
			} else {
				displayDate = `${startDate.date()} ${startDate.format('MMM')} - ${endDate.date()} ${endDate.format('MMM')}`
			}

			return (
				<div>
					<span className={css.icon}></span><span className={css.description}>&nbsp;Available to order {displayDate}</span>
				</div>
			)
		}
	}

	return <span />
}

Availability.propTypes = {
	availability: React.PropTypes.instanceOf(Immutable.List),
	cutoffDate: React.PropTypes.string,
}

export default Availability
