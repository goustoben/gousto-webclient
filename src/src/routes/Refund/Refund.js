import Helmet from 'react-helmet'
import React, { PropTypes } from 'react'

import css from './Refund.css'

const Refund = ({ children }) => (
	<div className={css.refundContainer}>
		<Helmet
			style={[{
				cssText: '#react-root { height: 100%; }',
			}]}
		/>
		<div className={css.refundContent}>
			{children}
		</div>
	</div>
)

Refund.propTypes = {
	children: PropTypes.node.isRequired,
}

export default Refund
