import PropTypes from 'prop-types'
import React from 'react'
import { Iterable } from 'immutable'

import css from './Chef.css'
import { getMenuRecipeImage } from 'utils/image'

const Chef = ({ chef }) => {
	const chefObj = Iterable.isIterable(chef) && chef.size > 0 ? chef : null

	if (chefObj) {
		const image = chefObj.getIn(['media', 'images']).find((value) => value.get('type') === 'headshot-image')

		return (
			<div className={css.chef}>
				<img src={getMenuRecipeImage(image.get('urls'), 70)} alt={image.get('title')} />
			</div>
		)
	}

	return null
}

Chef.propTypes = {
	chef: PropTypes.shape({
		media: PropTypes.shape({
			images: PropTypes.Array,
		}),
		name: PropTypes.string,
		celebrity: PropTypes.bool,
	}),
}

export default Chef
