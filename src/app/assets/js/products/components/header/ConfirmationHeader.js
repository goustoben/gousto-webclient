import React from 'react'

const ConfirmationHeader = (props) => (
	<div className="gousto-market-header-confirmation">
		<div className="col-md-12 wrap">
			<h1>Thank you! Your order has been created.</h1>
			<p>Delivery date: {props.deliveryDate} between {props.deliveryStart} - {props.deliveryEnd}</p>
			<p>Your recipe choices have been saved and we will start picking your box soon.</p>
			<p>You can edit your choices until {props.whenCutoffTime} on {props.whenCutoffDate}</p>
		</div>
	</div>
)

ConfirmationHeader.propTypes = {
	deliveryDate: React.PropTypes.string.isRequired,
	deliveryStart: React.PropTypes.string.isRequired,
	deliveryEnd: React.PropTypes.string.isRequired,
	whenCutoffTime: React.PropTypes.string.isRequired,
	whenCutoffDate: React.PropTypes.string.isRequired,
}

export default ConfirmationHeader
