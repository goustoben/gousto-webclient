import PropTypes from 'prop-types'
import React from 'react'
import { useStock } from '../../../domains/menu'
import Button from '../../../Recipe/Buttons'

import css from './DetailAddRecipe.css'

const DetailAddRecipe = ({ id, view, position, buttonText }) => {
  const { isRecipeOutOfStock } = useStock()
  const isOutOfStock = isRecipeOutOfStock(id)

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
      />
    </div>

  )
}

DetailAddRecipe.propTypes = {
  id: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  buttonText: PropTypes.string,
  view: PropTypes.oneOf(['grid', 'list', 'featured', 'simple', 'chefPrepared', 'fineDineIn', 'fineDineInDetail', 'detail', 'smallGrid']).isRequired,
}

DetailAddRecipe.defaultProps = {
  buttonText: 'Add recipe',
}

export { DetailAddRecipe }
