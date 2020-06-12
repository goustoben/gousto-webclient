import React from 'react'
import PropTypes from 'prop-types'
import css from './VariantHeader.css'

const VariantHeader = ({ recipeVariants, outOfStock }) => {
  if (!recipeVariants || recipeVariants.length === 0 || outOfStock) {
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
  outOfStock: PropTypes.bool,
}

VariantHeader.defaultProps = {
  recipeVariants: [],
  outOfStock: false
}
export { VariantHeader }
