import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import { Div } from 'Page/Elements'

import css from './Details.css'

const Details = ({ children, style }) => (
	<Div
		className={classNames(
			{
				[css[`${style}Container`]]: style,
			},
		)}
	>
		<Div
			className={classNames(
				css.content,
				{
					[css[`${style}Content`]]: style,
				},
			)}
			margin={{ top: 'Zero', bottom: 'Zero' }}
			padding={{ left: 'MD', right: 'MD' }}
		>
			{children}
		</Div>
	</Div>
)

Details.propTypes = {
	children: PropTypes.node,
	style: PropTypes.string,
}

export default Details
