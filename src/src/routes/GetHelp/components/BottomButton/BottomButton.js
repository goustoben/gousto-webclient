import React, { PropTypes } from 'react'

import { Button } from 'goustouicomponents'
import Link from 'Link'

import css from './BottomButton.css'

const BottomButton = ({ color, url, clientRouted, children, onClick }) => {
	const linkAsChild = (clientRouted && url)
		? <Link
			noDecoration
			className={css.buttonChild}
			clientRouted={clientRouted}
			to={url}
		>
			{children}
		</Link>
		: null

	return (
		<Button
			color={color}
			width="full"
			onClick={onClick}
			className={css.button}
			areChildrenInSegment
		>
			{linkAsChild || children}
		</Button>
	)
}

BottomButton.propTypes = {
	url: PropTypes.string,
	color: PropTypes.string.isRequired,
	clientRouted: PropTypes.bool,
	children: PropTypes.node.isRequired,
}

export default BottomButton
