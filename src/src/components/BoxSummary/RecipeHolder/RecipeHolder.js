import PropTypes from 'prop-types'
import React from 'react'
import css from './RecipeHolder.css'
import Image from 'Image'
import classnames from 'classnames'
import Immutable from 'immutable'/* eslint-disable new-cap */

const RecipeHolder = ({ recipe, view, onClick }) => (
	<span
		className={classnames(
			css[view],
			{ [css.borderNone]: recipe.size > 0 },
			{ [css.placeHolder]: recipe.size < 1 },
			{ [css.recipeImg]: view !== 'mobile' },
			{ [css.widthMobile]: view === 'mobile' }
		)}
		onClick={onClick}
	>
		{(recipe.size > 0) ?
			<Image
				media={recipe.getIn(['media', 'images', 0, 'urls'], '')}
				className={classnames(
					{ [css.recipeImg]: view !== 'mobile' },
					{ [css.imgMobile]: view === 'mobile' }
				)}
			/>
		: 'Add Recipe'}
	</span>
)

RecipeHolder.propTypes = {
	recipe: PropTypes.instanceOf(Immutable.Map),
	view: PropTypes.string,
	onClick: PropTypes.func,
}

RecipeHolder.defaultProps = {
	recipe: Immutable.Map({}),
	view: 'desktop',
}

export default RecipeHolder
