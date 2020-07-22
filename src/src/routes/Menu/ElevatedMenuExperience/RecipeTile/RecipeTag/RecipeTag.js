import React from 'react'
import PropTypes from 'prop-types'
import css from './RecipeTag.css'

const getTagStyle = (theme) => ({ ...theme, border: theme.borderColor ? '1px solid' : 'none' })

const RecipeTag = ({ type, brandTag }) => {
  if (!brandTag) {
    return null
  }

  const { theme, text } = brandTag

  return React.createElement(type, { className: css.recipeTag, style: getTagStyle(theme) }, text)
}

RecipeTag.propTypes = {
  type: PropTypes.string,
  brandTag: PropTypes.shape({
    text: PropTypes.string,
    theme: PropTypes.object,
  })
}

RecipeTag.defaultProps = {
  type: 'span',
  brandTag: null
}

export { RecipeTag }
