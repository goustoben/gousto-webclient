import Helmet from 'react-helmet'
import React, { PropTypes } from 'react'

import css from './GetHelp.css'

const GetHelp = ({ children }) => (
	<div className={css.getHelpContainer}>
		<Helmet
			style={[{
				cssText: '#react-root { height: 100%; }',
			}]}
		/>
		<div className={css.getHelpContent}>
			{children}
		</div>
	</div>
)

GetHelp.propTypes = {
	children: PropTypes.node.isRequired,
}

export default GetHelp
