import React, { PropTypes } from 'react'
import DiscountLabel from './DiscountLabel'

class DiscountDeliveryContainer extends React.Component {

	static propTypes = {
		recipeTotal: PropTypes.number,
		recipeDiscount: PropTypes.number,
	}

	state = {
		hidden: (this.props.recipeDiscount === 0),
	}
	render() {
		return (
			<DiscountLabel
				hidden={this.state.hidden}
				recipeTotal={Number(this.props.recipeTotal)}
				recipeDiscount={Number(this.props.recipeDiscount)}
			/>
		)
	}
}

export default DiscountDeliveryContainer
