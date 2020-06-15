import React from 'react'
import PropTypes from 'prop-types'
import css from './VariantHeader.css'

const VariantHeader = ({ recipeVariants, isOutOfStock }) => {
  if (!recipeVariants || recipeVariants.length === 0 || isOutOfStock) {
    return null
  }

  return (
    <div className={css.variantHeader}>
      {recipeVariants.length + 1}
      {' '}
      options available
    </div>
  )
}

VariantHeader.propTypes = {
  recipeVariants: PropTypes.arrayOf(PropTypes.shape),
  isOutOfStock: PropTypes.bool,
}

VariantHeader.defaultProps = {
  recipeVariants: [],
  isOutOfStock: false
}
export { VariantHeader }
