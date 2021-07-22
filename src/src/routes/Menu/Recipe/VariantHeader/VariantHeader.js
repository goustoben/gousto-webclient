import React from 'react'
import PropTypes from 'prop-types'
import css from './VariantHeader.css'

const VariantHeader = ({ recipeVariants, isOutOfStock, textOverride }) => {
  if (!recipeVariants || isOutOfStock) {
    return null
  }

  const alternativesSize = recipeVariants.alternatives ? recipeVariants.alternatives.size : 0

  if (!alternativesSize) {
    return null
  }

  const alternativeCount = recipeVariants.alternatives.size + 1
  const text = textOverride || `${alternativeCount} options available`

  return (
    <div className={css.variantHeader}>{text}</div>
  )
}

VariantHeader.propTypes = {
  recipeVariants: PropTypes.shape({
    type: PropTypes.string,
    alternatives: PropTypes.arrayOf(PropTypes.shape),
    sides: PropTypes.arrayOf(PropTypes.shape),
  }),
  isOutOfStock: PropTypes.bool,
  textOverride: PropTypes.string
}

VariantHeader.defaultProps = {
  recipeVariants: null,
  isOutOfStock: false,
  textOverride: null
}
export { VariantHeader }
