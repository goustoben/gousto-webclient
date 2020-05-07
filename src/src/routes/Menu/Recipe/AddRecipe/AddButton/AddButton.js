import PropTypes from 'prop-types'
import React from 'react'

import Button from '../../Buttons'

const AddButton = ({ recipeId, position, stock, outOfStock, view, buttonText = 'Add Recipe'}) => (
  <Button
    position={position}
    recipeId={recipeId}
    view={view}
    outOfstock={outOfStock}
    stock={stock}
    buttonText={buttonText}
  />
)

AddButton.propTypes = {
  recipeId: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  outOfStock: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
  view: PropTypes.oneOf(['grid', 'list', 'featured', 'simple', 'chefPrepared', 'fineDineIn', 'fineDineInDetail', 'detail', 'smallGrid']).isRequired,
}

export { AddButton }
