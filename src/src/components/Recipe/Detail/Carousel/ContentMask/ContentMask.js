import PropTypes from 'prop-types'
import React from 'react'

import css from './ContentMask.css'

const ContentMask = ({ className, children }) => (
	<div className={className}>
		<div className={css.container}>
			<div className={css.content}>
				{children}
			</div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="100.5 194.1 299 56"
				preserveAspectRatio="xMidYMid meet"
				fill="#E8C776"
			>
				<path d="M100,250 C160,195 340,195 400,250 Z" />
			</svg>
			<div className={css.mask}>
			</div>
		</div>
	</div>
)

ContentMask.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
}

export default ContentMask
