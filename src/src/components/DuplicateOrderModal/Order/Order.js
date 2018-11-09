import React from 'react'
import css from './Order.css'

const Order = ({ date, numPeople, numRecipes }) => (
	<div className={css.order}>
		<div className={css.left}>
			<span className={css.calendar} />
		</div>
		<div className={css.right}>
			<div className={css.infoLine}>Box Scheduled for {date}</div>
			<div className={css.infoLine}>{numRecipes} Recipes for {numPeople} People</div>
		</div>
	</div>
)

Order.propTypes = {
  date: React.PropTypes.string,
  numPeople: React.PropTypes.string,
  numRecipes: React.PropTypes.string,
}

export default Order
