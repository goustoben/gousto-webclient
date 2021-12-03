import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './RecipeTag.module.css'

const getTagStyle = (theme) => ({ ...theme, border: theme.borderColor ? '1px solid' : 'none' })

const RecipeTag = ({ type, brandTag, showVariantHeader, isOnDetailScreen }) => {
  if (!brandTag) {
    return null
  }

  const { theme, text } = brandTag

  return React.createElement(type, { className: classnames(css.recipeTag, {
    [css.recipeTagShowVariantHeader]: showVariantHeader,
    [css.recipeTagDetailScreen]: isOnDetailScreen,
  }),
  style: getTagStyle(theme) }, text)
}

RecipeTag.propTypes = {
  type: PropTypes.string,
  brandTag: PropTypes.shape({
    text: PropTypes.string,
    theme: PropTypes.object,
  }),
  showVariantHeader: PropTypes.bool,
  isOnDetailScreen: PropTypes.bool,
}

RecipeTag.defaultProps = {
  type: 'span',
  brandTag: null,
  showVariantHeader: false,
  isOnDetailScreen: false
}

export { RecipeTag }
