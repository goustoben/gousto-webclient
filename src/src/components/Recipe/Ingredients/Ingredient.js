import React from 'react'
import Image from 'Image'
import Immutable from 'immutable' /* eslint-disable new-cap */
import Svg from 'Svg'
import { getMenuRecipeImage } from 'utils/image'
import css from './Ingredient.css'

const Ingredient = ({ ingredient }) => {
	let src
	const images = ingredient.get('media').get('images')
	if (images.size > 0) {
		const urls = images.first().get('urls')
		src = getMenuRecipeImage(urls, 125)
	}

	return (
		<div className={css.ingredient}>
			<div className={css.imageContainer}>
				{src ? <Image media={src} title={ingredient.get('name')} className={css.image} /> : <Svg fileName="icon-vegs" className={css.placeholder} />}
			</div>
			<div className={css.label}>
				<span>{ingredient.get('label')}{(ingredient.get('allergens', Immutable.List([])).size > 0) ? <span>&#8224;</span> : ''}</span>
			</div>
		</div>
	)
}

Ingredient.propTypes = {
	ingredient: React.PropTypes.instanceOf(Immutable.Map),
	className: React.PropTypes.string,
}

export default Ingredient
