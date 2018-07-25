import React from 'react'
import moment from 'moment'
import css from './Calendar.css'
import Title from './Title'
import Day from './Day'

const dateToDayNo = date => (
	parseInt(moment(date, 'YYYY-MM-DD').format('E'), 10)
)

const dayNoToDayName = dayNo => (
	moment(dayNo, 'E').format('ddd')
)

const bump = num => (num + 1) % 7

const getFistDayOfTheWeek = (a, b) => bump(parseInt(a, 10)) - bump(parseInt(b, 10))

const getCalendarGrid = (dates) => {
	const dateGrid = {}
	const weekNos = []
	const dayNos = []

	const bumpedIds = []

	dates.forEach((date) => {
		let weekNo = moment(date.date).format('GGGGWW')
		const dayNo = dateToDayNo(date.date)
		if (dayNo > bump(dayNo)) {
			bumpedIds.push(`${weekNo}${dayNo}`)
			weekNo++
			if (parseInt((`${weekNo}`).substr(-2, 2), 10) > 52) {
				weekNo = weekNo - 52 + 100
			}
		}
		const id = `${weekNo}${dayNo}`
		if (weekNos.indexOf(weekNo) === -1) {
			weekNos.push(weekNo)
		}
		if (dayNos.indexOf(dayNo) === -1) {
			dayNos.push(dayNo)
		}

		dateGrid[id] = { ...date, id, weekNo, dayNo }
	})

	const rows = {}

	weekNos.forEach((weekNo) => {
		const week = {}

		dayNos.forEach((dayNo) => {
			week[dayNo] = dateGrid[`${weekNo}${dayNo}`]
		})

		rows[weekNo] = week
	})

	const columns = {}

	dayNos.forEach((dayNo) => {
		const days = {}

		weekNos.forEach((weekNo) => {
			days[weekNo] = dateGrid[`${weekNo}${dayNo}`]
		})

		columns[dayNo] = days
	})

	const header = {}
	dayNos.forEach((dayNo) => {
		header[dayNo] = dayNoToDayName(dayNo)
	})

	return { header, rows, columns, bumpedIds }
}

const minusOneWeek = (originalWeekNo) => {
	let weekNo = originalWeekNo - 1
	if (parseInt((`${weekNo}`).substr(-2, 2), 10) <= 0) {
		weekNo = weekNo + 52 - 100
	}

	return weekNo
}

function dateToDay(columns, weekNo, dayNo, selected, onClick) {
	const date = columns[dayNo][weekNo]

	return {
		weekNo: `${weekNo}`,
		dayNo: `${dayNo}`,
		onClick,
		key: `${weekNo}-${dayNo}`,
		date: date ? date.date : null,
		disabled: date ? date.disabled : true,
		selected: date ? date.date === selected : false,
		icon: date ? date.icon : null,
		orderId: date ? date.orderId : null,
		orderEmpty: date ? date.orderEmpty : null,
	}
}

const noEmptyWeeks = (weekNo, columns) => (
	Object.keys(columns)
		.map(dayNo => columns[dayNo][weekNo])
		.filter(day => Boolean(day) && !day.disabled)
		.length > 0
)

const Calendar = ({ dates, selected, onClick }) => {
	const { header, columns, bumpedIds } = getCalendarGrid(dates)

	return (
		<div className={css.calendar}>
			<Title dates={dates} />
			<div className={css.grid}>
				{Object.keys(header).sort(getFistDayOfTheWeek).map(dayNo =>
					(<div key={dayNo} className={css.column}>
						<div className={css.dayName}>{header[dayNo]}</div>
						{Object.keys(columns[dayNo]).filter(weekNo => noEmptyWeeks(weekNo, columns)).map((weekNo) => {
							const weekNoToUse = (bumpedIds.indexOf(`${weekNo}${dayNo}`) !== -1 && !columns[dayNo][weekNo]) ? minusOneWeek(weekNo) : weekNo
							const day = dateToDay(columns, weekNoToUse, dayNo, selected, onClick)

							return <Day {...day} className={css.day} />
						})}
					</div>),
				)}
			</div>
		</div>)
}

Calendar.propTypes = {
	dates: React.PropTypes.array.isRequired,
	selected: React.PropTypes.string,
	onClick: React.PropTypes.func.isRequired,
}

export default Calendar
