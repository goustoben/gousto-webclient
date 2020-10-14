import React from 'react'
import PropTypes from 'prop-types'
import css from './VariantHeader.css'

const VariantHeader = ({ recipeVariants, isOutOfStock}) => {
  if (!recipeVariants || isOutOfStock) {
    return null
  }

  const alternativesSize = recipeVariants.alternatives ? recipeVariants.alternatives.size : 0
  const sidesSize = recipeVariants.sides ? recipeVariants.sides.size : 0

  if (!alternativesSize && !sidesSize) {
    return null
  }

  if (recipeVariants.type === 'sides') {
    return (
      <div className={css.variantHeaderSides}>
        <div className={css.variantHeaderText}>
          Add a side
        </div>
      </div>
    )
  }

  return (

    <div className={css.variantHeader}>
      <div className={css.variantHeaderText}>
        {recipeVariants.alternatives.size + 1}
        {' '}
        options available
      </div>
    </div>

  )
}

VariantHeader.propTypes = {
  recipeVariants: PropTypes.shape({
    type: PropTypes.string,
    alternatives: PropTypes.arrayOf(PropTypes.shape),
    sides: PropTypes.arrayOf(PropTypes.shape),
  }),
  isOutOfStock: PropTypes.bool
}

VariantHeader.defaultProps = {
  recipeVariants: null,
  isOutOfStock: false,
}
export { VariantHeader }
