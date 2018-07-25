import React, { PropTypes } from 'react'
import DOMPurify from 'utils/DOMPurify'
import css from './Alert.css'

const Alert = ({ children, type = 'info' }) => (
	<div className={css[type]}>
		<span className={css.icon} />
		{typeof children === 'string' ? (
			<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(children) }} />
		) :
		children}
	</div>
)

Alert.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.string,
	]).isRequired,
	type: PropTypes.oneOf([
		'danger',
		'info',
		'success',
		'warning',
	]),
}

export default Alert
