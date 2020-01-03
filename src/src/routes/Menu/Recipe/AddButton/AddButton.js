import PropTypes from 'prop-types'
import React from 'react'

import Button from 'routes/Menu/Recipe/Buttons'
import config from 'config'

const AddButton = ({ id, inBasket, position, stock, view, score }) => (
  (stock > config.menu.stockThreshold || stock === null || inBasket)
    ? <Button position={position} recipeId={id} view={view} outOfstock={stock <= config.menu.stockThreshold && stock !== null} stock={stock} score={score} />
    : null
)

AddButton.propTypes = {
  id: PropTypes.string.isRequired,
  inBasket: PropTypes.bool,
  position: PropTypes.number,
  stock: PropTypes.number,
  view: PropTypes.oneOf(['grid', 'list', 'featured', 'simple', 'fineDineIn', 'fineDineInDetail', 'detail']).isRequired,
  score: PropTypes.number,
}

export default AddButton
