import React from 'react'
import PropTypes from 'prop-types'
import css from './RecipeTagTitle.css'

const getTagStyle = (theme) => ({ color: theme.color })

const RecipeTagTitle = ({ brandTag }) => {
  if (!brandTag) {
    return null
  }

  const { theme, text } = brandTag

  return (<div></div>)
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
