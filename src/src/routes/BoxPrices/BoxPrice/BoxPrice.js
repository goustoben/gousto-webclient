import React, { PropTypes } from 'react'

import Image from 'Image'
import LinkButton from 'LinkButton'
import BoxInfo from '../BoxInfo'
import css from './BoxPrice.css'
import config from 'config/boxprices'

class BoxType extends React.PureComponent {
	static propTypes = {
	  boxInfo: PropTypes.array,
	  numPersons: PropTypes.number,
	}

	render() {
	  const { boxInfo, numPersons } = this.props
	  const boxType = config.boxTypes[numPersons]

	  return (
			<div className={css.container}>
				<h2 className={css.title}>
					{boxType.type} box
				</h2>
				<p>{boxType.description}</p>
				<Image media={boxType.image} size={0} />
				<p>Recipes in your box</p>

				<div className={css.boxInfoList}>
					{boxInfo.map(info => (
						<BoxInfo
						  key={`box-info-${numPersons}-${info.num_portions}`}
						  numPortions={info.num_portions}
						  pricePerPortion={info.price_per_portion}
						  totalPrice={info.total}
						  numPersons={numPersons}
						/>
					))}
				</div>

				<div className={css.link}>
					<p>Delivery is <strong className={css.uppercase}>Free</strong></p>
					<LinkButton to={`menu?num_portions=${numPersons}`}>
						<span className={css.uppercase}>{config.cta}</span>
					</LinkButton>
				</div>
			</div>
	  )
	}
}

export default BoxType
