/* eslint-disable camelcase */
import React from 'react'
import { showAddress } from 'routes/Checkout/utils/delivery'
import css from "../Delivery.css"
import DeliveryInstruction from './DeliveryInstruction'
import DeliveryPhoneNumber from './DeliveryPhoneNumber'
import DeliveryAddressType from './DeliveryAddressType'
import Svg from 'Svg'

class DeliveryDetails extends React.PureComponent {
	static propTypes = {
	  deliveryAddress: React.PropTypes.object,
	  formValues: React.PropTypes.object,
	  receiveRef: React.PropTypes.func,
	  sectionName: React.PropTypes.string,
	}

	static defaultProps = {
	  deliveryAddress: {},
	  formValues: {},
	  receiveRef: () => {},
	}

	reset = (field, value = '') => {
	  const { change, formName, sectionName, untouch } = this.props
	  const fieldName = `${sectionName}.${field}`

	  untouch(formName, fieldName)
	  change(formName, fieldName, value)
	}

	render() {
	  const { formValues } = this.props

	  return (
			<div className={css.deliveryInfoContainer}>
				<h4>Deliver to</h4>
				<p className={css.textSM}>
					{showAddress(this.props.deliveryAddress)}&nbsp;
					<span onClick={this.props.onAddressEdit} className={css.linkBase}>
						Edit address&nbsp;<span className={css.linkRight} />
					</span>
				</p>
				<DeliveryAddressType
				  value={formValues.addressType}
				  reset={this.reset}
				  receiveRef={this.props.receiveRef}
				  sectionName={this.props.sectionName}
				/>
				<DeliveryInstruction
				  value={formValues.deliveryInstruction}
				  reset={this.reset}
				  receiveRef={this.props.receiveRef}
				  sectionName={this.props.sectionName}
				/>
				<DeliveryPhoneNumber
				  receiveRef={this.props.receiveRef}
				  sectionName={this.props.sectionName}
				/>
				<div className={css.iconDeliverySection}>
					<Svg fileName="icon-delivery" className={css.iconDelivery} />
					<div className={css.iconDeliveryDescription}>
						<p className={css.textSM}>Not going to be home? No problem. Just tell us a safe place to leave your box. Your food will keep cold for 24hrs.</p>
					</div>
				</div>
			</div>
	  )
	}
}

export default DeliveryDetails
