import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import css from './VariantHeader.css'
import { isMandatoryBucket, isSignpostingBucket, SignpostingExperimentContext } from '../../context/uiSignpostingContext'

const getThemeForBucket = (bucket) => {
  if (!isMandatoryBucket(bucket) && isSignpostingBucket(bucket)) {
    return css.themeGrey
  }

  return css.themeBlue
}
const getBannerPositionForBucket = (bucket) => (isSignpostingBucket(bucket) ? css.positionBottom : css.positionTop)
const getTextAlignForBucket = (bucket, browserType) => {
  if (isSignpostingBucket(bucket) && browserType === 'mobile') {
    return css.textRight
  }

  return css.textLeft
}

const VariantHeader = ({ browserType, recipeVariants, isOutOfStock, textOverride }) => {
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
    <SignpostingExperimentContext.Consumer>
      {
        bucket => (
          <div
            className={classnames(
              css.variantHeader,
              getThemeForBucket(bucket),
              getBannerPositionForBucket(bucket),
              getTextAlignForBucket(bucket, browserType)
            )}
          >
            {text}
          </div>
        )
      }
    </SignpostingExperimentContext.Consumer>
  )
}

VariantHeader.propTypes = {
  browserType: PropTypes.oneOf(['desktop', 'tablet', 'mobile']).isRequired,
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
