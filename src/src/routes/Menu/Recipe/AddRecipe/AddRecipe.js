import PropTypes from 'prop-types'
import React from 'react'
import Button from '../Buttons'

import css from './AddRecipe.css'
import { DropdownArrowContainer } from './DropdownArrow'

const AddRecipe = ({ id, originalId, view, position, outOfStock, buttonText, isOnDetailScreen }) => {
  if (outOfStock) {
    return null
  }

  return (
    <div className={css.addRecipeWrapper}>
      <Button
        position={position}
        recipeId={id}
        view={view}
        outOfstock={outOfStock}
        buttonText={buttonText}
      />
      {!isOnDetailScreen && <DropdownArrowContainer recipeId={id} originalId={originalId} />}
    </div>

  )
}

AddRecipe.propTypes = {
  id: PropTypes.string.isRequired,
  originalId: PropTypes.string.isRequired,
  outOfStock: PropTypes.bool.isRequired,
  position: PropTypes.number.isRequired,
  buttonText: PropTypes.string,
  view: PropTypes.oneOf(['grid', 'list', 'featured', 'simple', 'chefPrepared', 'fineDineIn', 'fineDineInDetail', 'detail', 'smallGrid']).isRequired,
  isOnDetailScreen: PropTypes.bool
}

AddRecipe.defaultProps = {
  isOnDetailScreen: false,
  buttonText: 'Add Recipe'
}

export { AddRecipe }
