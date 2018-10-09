import Helmet from 'react-helmet'
import React, { PureComponent, PropTypes } from 'react'

import css from './GetHelp.css'

class GetHelp extends PureComponent {
	static propTypes = {
		location: PropTypes.shape({
			query: PropTypes.shape({
				orderId: PropTypes.string,
			}),
		}),
		children: PropTypes.node.isRequired,
	}

	componentDidMount() {
		const { query } = this.props.location

		if (query && query.orderId) {
			this.props.storeGetHelpOrderId(query.orderId)
		}
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
