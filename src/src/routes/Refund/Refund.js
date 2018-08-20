import Helmet from 'react-helmet'
import React from 'react'

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

export default Refund
