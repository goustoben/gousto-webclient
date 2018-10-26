import React, { PropTypes } from 'react'
import config from 'config/checkout'
import { Alert } from 'goustouicomponents'
import css from './ErrorMessage.css'

const ErrorMessage = ({ errorType }) => (
	errorType ? (
		<div className={css.container}>
			<Alert type="danger">
				{config.errorMessage[errorType] || config.errorMessage.generic}
			</Alert>
		</div>
	) : null
)

ErrorMessage.propTypes = {
	errorType: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]),
}

export default ErrorMessage
