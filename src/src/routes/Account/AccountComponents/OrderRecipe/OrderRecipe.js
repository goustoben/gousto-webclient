import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'

import css from './OrderRecipe.css'

const OrderRecipe = ({
  recipeImage,
  recipeTitle,
  servings,
}) => (
    <div className={css.recipe}>
      {recipeImage ?
        <img className={css.image} src={recipeImage} alt={recipeTitle} />
        :
        <div className={classNames(css.image, css.blankImage)}></div>
      }
      <div className={css.recipeDetails}>
        <div className={css.recipeTitle}>{recipeTitle}</div>
        <div>{servings}</div>
      </div>
    </div>
)

OrderRecipe.propTypes = {
  recipeImage: PropTypes.string,
  recipeTitle: PropTypes.string,
  servings: PropTypes.string,
}

OrderRecipe.defaultProps = {
  recipeImage: '',
  recipeTitle: '',
  servings: '',
}

export default OrderRecipe
