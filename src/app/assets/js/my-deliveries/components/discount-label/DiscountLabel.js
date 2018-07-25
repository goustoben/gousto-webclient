import React, { PropTypes } from 'react'
import classnames from 'classnames'

class DiscountLabel extends React.Component {

	renderLabel(recipeDiscount, recipeTotal) {
		if (!recipeDiscount) {
			return ''
		}
		if (recipeDiscount === recipeTotal) {
			return 'Free'
		}
		if ((recipeDiscount / recipeTotal).toPrecision(3).endsWith(0)) {
			return `${Math.round(recipeDiscount / recipeTotal * 100)}% off`
		}
		if (recipeDiscount) {
			return `£${Math.round(recipeDiscount) !== recipeDiscount ? recipeDiscount.toFixed(2) : recipeDiscount} off`
		}

		return ''
	}

	render() {
		return (
			<div className={classnames('order-discount-info-label', (this.props.hidden) ? 'hidden' : '')}>
				{this.renderLabel(this.props.recipeDiscount, this.props.recipeTotal)}
			</div>
		)
	}
}

DiscountLabel.propTypes = {
	hidden: PropTypes.bool,
	recipeDiscount: PropTypes.number,
	recipeTotal: PropTypes.number,
}

DiscountLabel.defaultProps = {
	hidden: true,
	recipeDiscount: 0,
	recipeTotal: 0,
}

export default DiscountLabel
