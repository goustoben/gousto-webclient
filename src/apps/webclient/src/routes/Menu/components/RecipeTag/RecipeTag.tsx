import React from 'react'

import classnames from 'classnames'
import PropTypes from 'prop-types'

import { useRecipeBrandAvailabilityTag } from 'routes/Menu/context/recipeContext'

import css from './RecipeTag.css'

const getTagStyle = (theme: { borderColor?: string }) => ({
  ...theme,
  border: theme.borderColor ? '1px solid' : 'none',
})

const defaultType = 'span'

export const RecipeTag: React.FC<{ type?: string }> = ({ type = defaultType }) => {
  const brandTag = useRecipeBrandAvailabilityTag()

  if (!brandTag) {
    return null
  }

  const { theme, text } = brandTag

  return React.createElement(
    type,
    { className: classnames(css.recipeTag), style: getTagStyle(theme) },
    text,
  )
}

RecipeTag.propTypes = {
  type: PropTypes.string,
}

RecipeTag.defaultProps = {
  type: defaultType,
}
