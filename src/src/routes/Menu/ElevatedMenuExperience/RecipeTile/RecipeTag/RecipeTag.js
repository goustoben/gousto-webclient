import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import css from './RecipeTag.css'

const getTagStyle = (theme) => ({ ...theme, border: theme.borderColor ? '1px solid' : 'none' })

const RecipeTag = ({ type, brandTag, showVariantHeader }) => {
  if (!brandTag) {
    return null
  }

  const { theme, text } = brandTag

  return React.createElement(type, { className: classnames(css.recipeTag, {
    [css.recipeTagShowVariantHeader]: showVariantHeader
  }),
  style: getTagStyle(theme) }, text)
}

RecipeTag.propTypes = {
  type: PropTypes.string,
  brandTag: PropTypes.shape({
    text: PropTypes.string,
    theme: PropTypes.object,
  }),
  showVariantHeader: PropTypes.bool
}

RecipeTag.defaultProps = {
  type: 'span',
  brandTag: null,
  showVariantHeader: false
}

export { RecipeTag }
