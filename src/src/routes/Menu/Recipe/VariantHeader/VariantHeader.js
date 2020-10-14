import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './VariantHeader.css'

const VariantHeader = ({ recipeVariants, isOutOfStock, isInCarousel }) => {
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
      <div className={ classnames(
        { [css.variantHeaderSides]: !isInCarousel },
        { [css.variantHeaderSidesCarousel]: isInCarousel },
      )}
      >
        <div className={css.variantHeaderText}>
          Add a side
        </div>
      </div>
    )
  }

  return (

    <div className={ classnames(
      { [css.variantHeader]: !isInCarousel },
      { [css.variantHeaderCarousel]: isInCarousel },
    )}
    >
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
  isOutOfStock: PropTypes.bool,
  isInCarousel: PropTypes.bool
}

VariantHeader.defaultProps = {
  recipeVariants: null,
  isOutOfStock: false,
  isInCarousel: false
}
export { VariantHeader }
