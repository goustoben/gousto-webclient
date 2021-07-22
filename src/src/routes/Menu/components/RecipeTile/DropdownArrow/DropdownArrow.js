import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import css from './DropdownArrow.css'
import { isMandatoryBucket, isSignpostingBucket, SignpostingExperimentContext } from '../../../context/uiSignpostingContext'

const getThemeForBucket = (bucket) => {
  if (!isMandatoryBucket(bucket) && isSignpostingBucket(bucket)) {
    return css.themeGrey
  }

  return css.themeBlue
}

const DropdownArrow = ({
  recipeId,
  originalId,
  recipeVariants,
  showDropdown,
  recipeVariantDropdownExpanded,
  categoryId
}) => {
  if (!recipeVariants || recipeVariants.size === 0) {
    return null
  }

  const onClick = (e) => {
    e.stopPropagation()
    const recipeData = showDropdown ? null : { recipeId, originalId, categoryId }
    recipeVariantDropdownExpanded(recipeData)
  }

  return (
    <SignpostingExperimentContext.Consumer>
      {bucket => (
        <button className={classnames(css.arrowContainer, getThemeForBucket(bucket))} type="button" onClick={onClick}>
          <span className={showDropdown ? css.arrowUp : css.arrowDown} />
        </button>
      )}
    </SignpostingExperimentContext.Consumer>
  )
}

DropdownArrow.propTypes = {
  recipeId: PropTypes.string.isRequired,
  originalId: PropTypes.string.isRequired,
  recipeVariants: PropTypes.arrayOf(PropTypes.shape),
  showDropdown: PropTypes.bool.isRequired,
  recipeVariantDropdownExpanded: PropTypes.func.isRequired,
  categoryId: PropTypes.string
}

DropdownArrow.defaultProps = {
  recipeVariants: [],
  categoryId: null
}

export { DropdownArrow }
