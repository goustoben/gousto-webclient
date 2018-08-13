import React, { PropTypes } from 'react'

import css from './SimpleRecipe.css'
import Title from '../Title'
import Image from '../Image'
import Rating from '../Rating'
import StockBadge from '../StockBadge'
import { recipePropTypes } from 'Recipe'

const SimpleRecipe = (props) => (
	<div>
		<div className={css.recipeDetails}>
			<div className={css.link} onClick={props.onClick}>
				<Image
					media={props.media}
					alt={props.title}
					view={props.view}
					maxMediaSize={props.maxMediaSize}
				/>
			</div>
			<div className={css.textContainerCenter}>
				<span onClick={props.onClick} className={css.linkUnderlined}>
					<Title
						title={props.title}
						view={props.view}
					/>
				</span>
				<div className={css.simpleTagContainer}>
					<Rating
						average={props.averageRating}
						count={props.ratingCount}
						view={props.view}
					/>
					<StockBadge stock={props.stock} />
				</div>
			</div>
		</div>
	</div>
)

SimpleRecipe.propTypes = {
	...recipePropTypes,
	maxMediaSize: PropTypes.number,
	averageRating: PropTypes.number,
	ratingCount: PropTypes.number,
}

SimpleRecipe.defaultProps = {
	view: 'simple',
	averageRating: 0,
	ratingCount: 0,
}

export default SimpleRecipe
