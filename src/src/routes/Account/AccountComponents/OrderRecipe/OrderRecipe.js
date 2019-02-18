import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

import css from './OrderRecipe.css'

const OrderRecipe = ({
  recipeImage,
  recipeTitle,
}) => (
	<div className={css.recipe}>
		{recipeImage ?
			<img className={css.image} src={recipeImage} alt={recipeTitle} />
		  :
			<div className={classNames(css.image, css.blankImage)}></div>
		}
		<div>{recipeTitle}</div>
	</div>
)

OrderRecipe.propTypes = {
  recipeImage: PropTypes.string,
  recipeTitle: PropTypes.string,
}

OrderRecipe.defaultProps = {
  recipeImage: '',
  recipeTitle: '',
}

export default OrderRecipe
