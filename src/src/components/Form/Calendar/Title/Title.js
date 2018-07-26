import React from 'react'
import css from './Title.css'
import moment from 'moment'

const unique = arr => Array.from(new Set(arr))

const getMonthsFromDates = dates => (
	unique(
		dates
			.map(date => moment(date.date, 'YYYY-MM-DD'))
			.sort((a, b) => a.diff(b))
			.map(date => date.format('MMMM YYYY'))
	)
)

const Title = ({ dates }) => (
	<span className={css.title}>{getMonthsFromDates(dates).join(' / ')}</span>
)

Title.propTypes = {
	dates: React.PropTypes.array.isRequired,
}

export default Title
