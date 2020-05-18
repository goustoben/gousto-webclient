import PropTypes from 'prop-types'
import React from 'react'

import css from './DropdownArrow.css'
import { VariantRecipeListContainer } from '../../VariantRecipeList/VariantRecipeList'

const DropdownArrow = ({ recipeId, originalId, recipeVariants, showDropdown, recipeVariantDropdownExpanded }) => {
  if (!recipeVariants || recipeVariants.length === 0) {
    return null
  }

  const onClick = () => {
    const recipeToExpand = showDropdown ? null : recipeId
    recipeVariantDropdownExpanded(recipeToExpand)
  }

  return (
    <button className={css.arrowContainer} type="button" onClick={onClick}>
      <span className={showDropdown ? css.arrowUp : css.arrowDown} />
      {showDropdown
        && (
          <div className={css.dropdownListContainer}>
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
  recipeVariantDropdownExpanded: PropTypes.func.isRequired
}

DropdownArrow.defaultProps = {
  recipeVariants: [],
}

export { DropdownArrow }
