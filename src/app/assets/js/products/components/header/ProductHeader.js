import React from 'react'
import moment from 'moment'
import Gousto from '@fe/gousto-generic'
import ConfirmationHeader from './ConfirmationHeader'

class ProductHeader extends React.Component {

	static propTypes = {
		order: React.PropTypes.shape({
			deliveryDate: React.PropTypes.string,
			deliveryStart: React.PropTypes.string,
			deliveryEnd: React.PropTypes.string,
			whenCutoff: React.PropTypes.string,
		}),
		dateFormat: React.PropTypes.string,
		timeFormat: React.PropTypes.string,
		showConfirmation: React.PropTypes.bool,
	}

	static defaultProps = {
		order: {
			deliveryDate: '1999-12-30T00:00:00+00:00',
			deliveryStart: '00:00:00',
			deliveryEnd: '00:00:00',
			whenCutoff: '1999-12-30T00:00:00+00:00',
		},
		dateFormat: 'dddd Do MMMM',
		timeFormat: 'h a',
		showConfirmation: false,
	}

	formatDate = (date) => moment(date).format(this.props.dateFormat)

	formatTime = (time, format) => Gousto.roundTime(moment(time, format)).format(this.props.timeFormat)

	renderConfirmation() {
		if (!this.props.showConfirmation) {
			return ''
		}
		const order = this.props.order

		return (
			<ConfirmationHeader
				deliveryDate={this.formatDate(order.deliveryDate)}
				deliveryStart={this.formatTime(order.deliveryStart, 'hh:mm:ss')}
				deliveryEnd={this.formatTime(order.deliveryEnd, 'hh:mm:ss')}
				whenCutoffDate={this.formatDate(order.whenCutoff)}
				whenCutoffTime={this.formatTime(order.whenCutoff)}
			/>
		)
	}

	render() {
		return (
			<div>
				{this.renderConfirmation()}
				<div className="gousto-market-header-logo">
					<h3 className="gousto-market-header-logo-label">The Gousto Market</h3>
				</div>
			</div>
		)
	}
}

export default ProductHeader
