import PropTypes from 'prop-types'
import React from 'react'

import css from './DropdownArrow.css'
import { DropdownRecipeListContainer } from '../DropdownRecipeList'

const DropdownArrow = ({ recipeId, recipeVariants, showDropdown, recipeVariantDropdownExpanded }) => {
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
        && <DropdownRecipeListContainer recipeId={recipeId} />}
    </button>
  )
}

DropdownArrow.propTypes = {
  recipeId: PropTypes.string.isRequired,
  recipeVariants: PropTypes.arrayOf(PropTypes.shape),
  showDropdown: PropTypes.bool.isRequired,
  recipeVariantDropdownExpanded: PropTypes.func.isRequired
}

DropdownArrow.defaultProps = {
  recipeVariants: [],
}

export { DropdownArrow }
