import PropTypes from 'prop-types'
import React from 'react'

import css from './DropdownArrow.css'
import { VariantRecipeListContainer } from '../../VariantRecipeList/VariantRecipeList'

const DropdownArrow = ({ recipeId, originalId, recipeVariants, showDropdown, recipeVariantDropdownExpanded, isInCarousel }) => {
  if (!recipeVariants || recipeVariants.length === 0) {
    return null
  }

  const onClick = (e) => {
    e.stopPropagation()
    const recipeToExpand = showDropdown ? null : recipeId
    recipeVariantDropdownExpanded(recipeToExpand)
  }

  return (
    <button className={css.arrowContainer} type="button" onClick={onClick}>
      <div className="test" />
      <span className={showDropdown ? css.arrowUp : css.arrowDown} />
      {showDropdown
        && (
          <div className={isInCarousel ? css.carouselDropdownListContainer : css.dropdownListContainer}>
            <VariantRecipeListContainer recipeId={recipeId} originalId={originalId} />
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
}

DropdownArrow.defaultProps = {
  recipeVariants: [],
  isInCarousel: false,
}

export { DropdownArrow }
