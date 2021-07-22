import React from 'react'
import PropTypes from 'prop-types'

import css from './DropdownArrow.css'

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
    <button className={css.arrowContainer} type="button" onClick={onClick}>
      <span className={showDropdown ? css.arrowUp : css.arrowDown} />
    </button>
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
