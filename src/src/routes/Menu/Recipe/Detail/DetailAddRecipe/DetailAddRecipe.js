import PropTypes from 'prop-types'
import React from 'react'
import Button from '../../Buttons'

import css from './DetailAddRecipe.css'

const DetailAddRecipe = ({ id, view, position, isOutOfStock, buttonText, closeOnAdd }) => {
  if (isOutOfStock) {
    return null
  }

  return (
    <div className={css.addRecipeWrapper}>
      <Button
        position={position}
        recipeId={id}
        view={view}
        isOutOfStock={isOutOfStock}
        buttonText={buttonText}
        closeOnAdd={closeOnAdd}
      />
    </div>

  )
}

DetailAddRecipe.propTypes = {
  id: PropTypes.string.isRequired,
  isOutOfStock: PropTypes.bool,
  position: PropTypes.number.isRequired,
  buttonText: PropTypes.string,
  view: PropTypes.oneOf(['grid', 'list', 'featured', 'simple', 'chefPrepared', 'fineDineIn', 'fineDineInDetail', 'detail', 'smallGrid']).isRequired,
  closeOnAdd: PropTypes.bool
}

DetailAddRecipe.defaultProps = {
  buttonText: 'Add recipe',
  isOutOfStock: false,
  closeOnAdd: false
}

export { DetailAddRecipe }
