import PropTypes from 'prop-types'
import React from 'react'

import config from 'config'
import Button from '../Buttons'

const AddButton = ({ id, inBasket, position, stock, view, buttonText = 'Add Recipe'}) => (
  (stock > config.menu.stockThreshold || stock === null || inBasket)
    ? <Button position={position} recipeId={id} view={view} outOfstock={stock <= config.menu.stockThreshold && stock !== null} stock={stock} buttonText={buttonText} />
    : null
)

AddButton.propTypes = {
  id: PropTypes.string.isRequired,
  inBasket: PropTypes.bool.isRequired,
  position: PropTypes.number,
  stock: PropTypes.number.isRequired,
  buttonText: PropTypes.string,
  view: PropTypes.oneOf(['grid', 'list', 'featured', 'simple', 'chefPrepared', 'fineDineIn', 'fineDineInDetail', 'detail', 'smallGrid']).isRequired,
}

export { AddButton }
