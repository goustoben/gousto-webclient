import PropTypes from 'prop-types'
import React from 'react'

import css from './DropdownArrow.css'
import { VariantRecipeListContainer } from '../../../Recipe/VariantRecipeList/VariantRecipeList'

const DropdownArrow = ({
  recipeId,
  originalId,
  recipeVariants,
  showDropdown,
  recipeVariantDropdownExpanded,
  isInCarousel,
  categoryId,
  browserType,
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
    <button className={css.arrowContainer} type="button" onClick={onClick}>
      <span className={showDropdown ? css.arrowUp : css.arrowDown} />
      {showDropdown && browserType !== 'mobile'
        && (
          <div className={isInCarousel ? css.carouselDropdownListContainer : css.dropdownListContainer}>
            <VariantRecipeListContainer recipeId={recipeId} originalId={originalId} categoryId={categoryId} />
          </div>
        )}
    </button>
  )
}

DropdownArrow.propTypes = {
  recipeId: PropTypes.string.isRequired,
  originalId: PropTypes.string.isRequired,
  recipeVariants: PropTypes.arrayOf(PropTypes.shape),
  showDropdown: PropTypes.bool.isRequired,
  recipeVariantDropdownExpanded: PropTypes.func.isRequired,
  isInCarousel: PropTypes.bool,
  categoryId: PropTypes.string,
  browserType: PropTypes.string.isRequired,
}

DropdownArrow.defaultProps = {
  recipeVariants: [],
  isInCarousel: false,
  categoryId: null
}

export { DropdownArrow }
