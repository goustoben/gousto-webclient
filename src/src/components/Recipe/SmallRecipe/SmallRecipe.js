import React, { PropTypes } from 'react'

import css from './SmallRecipe.css'
import Title from '../Title'
import Image from '../Image'
import AddButton from '../AddButton'
import DisabledOverlay from '../DisabledOverlay'
import { recipePropTypes } from 'Recipe'

const SmallRecipe = (props) => (
	<div>
		<div className={css.recipeDetails}>
			<div className={css.link} onClick={props.onClick}>
				<Image
				  media={props.media}
				  alt={props.title}
				  view={props.view}
				/>
			</div>
			<div className={css.textContainer}>
				<span onClick={props.onClick} className={css.linkUnderlined}>
					<Title
					  title={props.title}
					  view={props.view}
					/>
				</span>
				<AddButton id={props.id} stock={props.stock} inBasket={props.inBasket} view={props.view} position={props.position} surcharge={props.surcharge} />
				<DisabledOverlay stock={props.stock} inBasket={props.inBasket} />
			</div>
		</div>
	</div>
)

SmallRecipe.propTypes = {
  ...recipePropTypes,
  id: PropTypes.string.isRequired,
  position: PropTypes.number,
  inBasket: PropTypes.bool,
}

SmallRecipe.defaultProps = {
  view: 'gridSmall',
}

export default SmallRecipe
