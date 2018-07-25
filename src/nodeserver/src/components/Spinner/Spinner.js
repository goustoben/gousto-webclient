import React, { PropTypes } from 'react'
import classnames from 'classnames'

import css from './Spinner.css'

const Spinner = ({ color }) => (
	<div className={css.fadingCircle}>
		{(() => {
			const circlesHtml = []
			for (let i = 1; i <= 12; i++) {
				circlesHtml.push(<div key={i} className={classnames(css[`circle${i}`], css[color])} />)
			}

			return circlesHtml
		})()}
	</div>
)

Spinner.propTypes = {
	color: PropTypes.oneOf(['black', 'white', 'bluecheese']),
}

Spinner.defaultProps = {
	color: 'white',
}

export default Spinner
