import PropTypes from 'prop-types'
import React from 'react'

import css from './BoxInfo.css'
import BoxIcon from '../BoxIcon'

class BoxInfo extends React.PureComponent {
	static propTypes = {
		numPortions: PropTypes.number,
		totalPrice: PropTypes.string,
		pricePerPortion: PropTypes.string,
		numPersons: PropTypes.number,
	}

	render() {
		const { numPortions, pricePerPortion, totalPrice, numPersons } = this.props

		return (
			<div className={css.container}>
				<p className={css.recipes}>{numPortions} Recipes</p>
				<p>
					<span className={css.portionPrice}>&pound;{pricePerPortion}</span>
					<small>per serving</small>
				</p>
				<p>
					<small>Box price</small>
					<span className={css.boxPrice}>&pound;{totalPrice}</span>
				</p>
				<BoxIcon className={css.icon} numPortions={numPortions} numPersons={numPersons} />
			</div>
		)
	}
}

export default BoxInfo
