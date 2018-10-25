import PropTypes from 'prop-types'
import React from 'react'
import cs from 'classnames'
import css from './Circle.css'

const Circle = ({ top, left, onClick, content, active }) => (
	<span className={css.outer} style={{ top: `${top}%`, left: `${left}%` }} onClick={onClick}>
		<span className={cs({ [css.innerActive]: active, [css.inner]: !active })}>{content}</span>
	</span>
)

Circle.propTypes = {
	content: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	top: PropTypes.number,
	left: PropTypes.number,
	onClick: PropTypes.func,
	active: PropTypes.bool,
}

Circle.defaultProps = {
	onClick: () => {
	},
	active: false,
}

export default Circle
