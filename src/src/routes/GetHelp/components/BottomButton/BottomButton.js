import React, { PropTypes } from 'react'

import { Button } from 'goustouicomponents'
import Link from 'Link'

import css from './BottomButton.css'

const BottomButton = ({ color, url, clientRouted, children }) => (
	<Button color={color} width="full" className={css.button} areChildrenInSegment>
		<Link
			noDecoration
			className={css.buttonChild}
			clientRouted={clientRouted}
			to={url}
		>
			{children}
		</Link>
	</Button>
)

BottomButton.propTypes = {
	url: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
	clientRouted: PropTypes.bool.isRequired,
	children: PropTypes.node.isRequired,
}

export default BottomButton
