import React, { PropTypes } from 'react'

import Button from 'Recipe/Buttons'
import config from 'config'

const AddButton = ({ id, inBasket, position, stock, view, surcharge, score }) => (
  (stock > config.menu.stockThreshold || stock === null || inBasket)
    ? <Button position={position} recipeId={id} view={view} outOfstock={stock <= config.menu.stockThreshold && stock !== null} stock={stock} surcharge={surcharge} score={score} />
    : null
)

AddButton.propTypes = {
  id: React.PropTypes.string.isRequired,
  inBasket: PropTypes.bool,
  position: React.PropTypes.number,
  stock: PropTypes.number,
  view: React.PropTypes.oneOf(['grid', 'gridSmall', 'list', 'featured', 'simple', 'fineDineIn', 'fineDineInDetail', 'detail']).isRequired,
  surcharge: PropTypes.number,
}

export default AddButton
