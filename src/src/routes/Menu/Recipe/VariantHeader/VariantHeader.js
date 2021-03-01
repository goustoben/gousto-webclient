import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import css from './VariantHeader.css'

const getClassForTheme = (theme) => (theme === 'grey' ? css.themeGrey : css.themeBlue)
const getClassForBannerPosition = (bannerPosition) => {
  if (bannerPosition === 'top') {
    return css.positionTop
  }

  if (bannerPosition === 'bottom') {
    return css.positionBottom
  }

  return null
}

const VariantHeader = ({ recipeVariants, isOutOfStock, theme, bannerPosition, textOverride, textAlign }) => {
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
    <div
      className={classnames(
        css.variantHeader,
        getClassForTheme(theme),
        getClassForBannerPosition(bannerPosition),
        {
          [css.textLeft]: textAlign === 'left',
          [css.textRight]: textAlign === 'right'
        }
      )}
    >
      {text}
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
  theme: PropTypes.oneOf(['blue', 'grey']),
  bannerPosition: PropTypes.oneOf(['top', 'bottom']),
  textAlign: PropTypes.oneOf(['left', 'right']),
  textOverride: PropTypes.string
}

VariantHeader.defaultProps = {
  recipeVariants: null,
  isOutOfStock: false,
  theme: 'blue',
  bannerPosition: 'top',
  textAlign: 'left',
  textOverride: null
}
export { VariantHeader }
