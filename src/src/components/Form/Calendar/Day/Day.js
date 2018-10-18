import PropTypes from 'prop-types'
import React from 'react'
import css from './Day.css'
import classnames from 'classnames'
import moment from 'moment'

const weekNoDayNoToDay = (weekNo, dayNo) => (
	moment(`${weekNo}-${dayNo}`, 'GGGGWW-E').format('DD')
)

const dateToDay = date => (
	moment(date, 'YYYY-MM-DD').format('DD')
)

const Day = ({ date, weekNo, dayNo, selected, disabled, onClick, icon, orderId, className }) => {
	if (date && !disabled) {
		return (
			<div
				className={classnames(selected ? css.currentDay : css.day, className, css.square)}
				onClick={() => { if (!disabled) { onClick(date, orderId) } }}
			>
				<div className={css.content}>
					{icon ? <span className={css[`icon-${icon}`]}><span className={css[`icon-${icon}-child`]} /></span> : null}
					{dateToDay(date)}
				</div>
			</div>
		)
	}

	return (<div key={`${weekNo}-${dayNo}`} className={classnames(css.emptyDay, className, css.square)}>
		<div className={css.content}>
			{icon ? (<span className={css[`icon-${icon}`]}><span className={css[`icon-${icon}-child`]} /></span>) : null}
			{date ? dateToDay(date) : weekNoDayNoToDay(weekNo, dayNo)}
		</div>
	</div>)
}

Day.propTypes = {
	date: PropTypes.string,
	weekNo: PropTypes.string,
	dayNo: PropTypes.string,
	selected: PropTypes.bool,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	icon: PropTypes.string,
	orderId: PropTypes.string,
	className: PropTypes.string,
}

export default Day
