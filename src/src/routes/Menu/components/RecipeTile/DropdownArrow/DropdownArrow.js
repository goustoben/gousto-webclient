import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import css from './DropdownArrow.css'
import { VariantRecipeListContainer } from '../../../Recipe/VariantRecipeList/VariantRecipeList'

const getClassForTheme = (theme) => (theme === 'grey' ? css.themeGrey : css.themeBlue)

const DropdownArrow = ({
  recipeId,
  originalId,
  recipeVariants,
  showDropdown,
  recipeVariantDropdownExpanded,
  categoryId,
  browserType,
  theme
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
    <button className={classnames(css.arrowContainer, getClassForTheme(theme))} type="button" onClick={onClick}>
      <span className={showDropdown ? css.arrowUp : css.arrowDown} />
      {showDropdown && browserType !== 'mobile'
        && (
          <div className={css.dropdownListContainer}>
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
  categoryId: PropTypes.string,
  browserType: PropTypes.string.isRequired,
  theme: PropTypes.oneOf([ 'blue', 'grey' ])
}

DropdownArrow.defaultProps = {
  recipeVariants: [],
  categoryId: null,
  theme: 'blue'
}

export { DropdownArrow }
