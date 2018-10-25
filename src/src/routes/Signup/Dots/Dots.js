import PropTypes from 'prop-types'
import React from 'react'
import css from './Dots.css'

const Dots = ({ steps, stepNo }) => (
	<div className={css.dots}>
		{Array.from(Array(steps)).map((s, step) => <div key={step} className={step <= stepNo ? css.filledDot : css.dot}></div>)}
	</div>
)

Dots.propTypes = {
	stepNo: PropTypes.number,
	steps: PropTypes.number,
}

export default Dots
