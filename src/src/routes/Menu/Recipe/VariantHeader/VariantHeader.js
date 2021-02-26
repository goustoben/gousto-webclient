import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import css from './VariantHeader.css'

const getClassForTheme = (theme) => (theme === 'grey' ? css.themeGrey : css.themeBlue)
const getClassForBannerPosition = (bannerPosition) => (bannerPosition === 'top' ? css.positionTop : css.positionBottom)

const VariantHeader = ({ recipeVariants, isOutOfStock, theme, bannerPosition }) => {
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
    <div className={classnames(css.variantHeader, getClassForTheme(theme), getClassForBannerPosition(bannerPosition))}>
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
  theme: PropTypes.oneOf([ 'blue', 'grey' ]),
  bannerPosition: PropTypes.oneOf([ 'top', 'bottom' ])
}

VariantHeader.defaultProps = {
  recipeVariants: null,
  isOutOfStock: false,
  theme: 'blue',
  bannerPosition: 'top'
}
export { VariantHeader }
