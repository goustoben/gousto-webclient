import React from 'react'
import PropTypes from 'prop-types'
import css from './RecipeTagTitle.css'

const getTagStyle = (theme) => ({ color: theme.backgroundColor })

const RecipeTagTitle = ({ brandTag }) => {
  if (!brandTag) {
    return null
  }

  const { theme, text } = brandTag

  return React.createElement('div', { className: css.recipeTagTitle, style: getTagStyle(theme) }, text)
}

RecipeTagTitle.propTypes = {
  brandTag: PropTypes.shape({
    text: PropTypes.string,
    theme: PropTypes.object,
  })
}

RecipeTagTitle.defaultProps = {
  brandTag: null
}

export { RecipeTagTitle }
