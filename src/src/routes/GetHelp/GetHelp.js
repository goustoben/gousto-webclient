import Helmet from 'react-helmet'
import React, { PureComponent, PropTypes } from 'react'

import css from './GetHelp.css'

class GetHelp extends PureComponent {
	static propTypes = {
		location: PropTypes.shape({
			query: PropTypes.shape({
				orderId: PropTypes.string.isRequired,
			}).isRequired,
		}).isRequired,
		children: PropTypes.node.isRequired,
	}

	componentDidMount() {
		this.props.storeGetHelpOrderId(this.props.location.query.orderId)
	}

	render() {
		const { children } = this.props

		return <div className={css.getHelpContainer}>
			<Helmet
				style={[{
					cssText: '#react-root { height: 100%; }',
				}]}
			/>
			<div className={css.getHelpContent}>
				{children}
			</div>
		</div>
	}
}

export default GetHelp
