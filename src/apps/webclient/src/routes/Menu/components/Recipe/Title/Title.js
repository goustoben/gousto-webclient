import React from 'react'

import PropTypes from 'prop-types'

import { useRecipeTitle } from 'routes/Menu/context/recipeContext'

const Title = ({ className }) => {
  const title = useRecipeTitle()

  return <h2 className={className}>{title}</h2>
}

Title.propTypes = {
  className: PropTypes.string,
}

Title.defaultProps = {
  className: undefined,
}

export { Title }
