/* eslint-disable camelcase */
import React from 'react'
import { FormSection } from 'redux-form'
import * as deliveryUtils from 'routes/Checkout/utils/delivery'
import globals from 'config/globals'
import scrollIntoView from 'scroll-into-view'

import css from './Delivery.css'
import DeliveryDetails from './DeliveryDetails'
import DeliveryAddress from './DeliveryAddress'
import Subscription from 'routes/Checkout/Components/Subscription'

class Delivery extends React.PureComponent {
	static propTypes = {
		onStepChange: React.PropTypes.func,
		formValues: React.PropTypes.object,
		formName: React.PropTypes.string,
		sectionName: React.PropTypes.string,
		nextStepName: React.PropTypes.string,
		clearErrors: React.PropTypes.func,
		manualSubmit: React.PropTypes.func,
		asyncValidate: React.PropTypes.func,
		change: React.PropTypes.func,
		receiveRef: React.PropTypes.func,
	}

	static defaultProps = {
		clearErrors: () => {},
		onStepChange: () => {},
		formValues: {},
		formName: '',
		sectionName: 'delivery',
		change: () => {},
		receiveRef: () => {},
	}

	componentDidMount() {
		// reset error msg
		this.props.clearErrors()
	}

	componentWillReceiveProps(nextProps) {
		if (globals.client && this.container && deliveryUtils.isAddressConfirmed(this.props.formValues) !== deliveryUtils.isAddressConfirmed(nextProps.formValues)) {
			scrollIntoView(this.container, {
				align: {
					topOffset: 30,
				},
			})
		}
	}

	handleAddressEdit = () => {
		const { change, sectionName, formName } = this.props
		change(formName, `${sectionName}.confirmed`, false)
	}

	renderAddress = () => (
		<div>
			<DeliveryAddress
				isDelivery
				asyncValidate={this.props.asyncValidate}
				formName={this.props.formName}
				sectionName={this.props.sectionName}
				formValues={this.props.formValues}
				triggerSubmit={this.props.triggerSubmit}
				receiveRef={this.props.receiveRef}
				scrollToFirstMatchingRef={this.props.scrollToFirstMatchingRef}
			/>
		</div>
	)

	renderDetails = () => (
		<div>
			<DeliveryDetails
				formValues={this.props.formValues[this.props.sectionName]}
				formName={this.props.formName}
				sectionName={this.props.sectionName}
				onAddressEdit={this.handleAddressEdit}
				triggerSubmit={this.props.triggerSubmit}
				receiveRef={this.props.receiveRef}
			/>
		</div>
	)

	render() {
		return (
			<div ref={el => { this.container = el }}>
				<Subscription sectionName={this.props.sectionName} />
				<div className={css.deliveryContainer} data-testing="checkoutDeliverySection">
					<h3 className={css.header}>Delivery details</h3>
					<FormSection name={this.props.sectionName}>
						{deliveryUtils.isAddressConfirmed(this.props.formValues) ? this.renderDetails() : this.renderAddress()}
					</FormSection>
				</div>
			</div>
		)
	}
}

export default Delivery
