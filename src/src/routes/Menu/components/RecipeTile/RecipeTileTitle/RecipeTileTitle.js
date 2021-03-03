import React from 'react'
import PropTypes from 'prop-types'
import css from './RecipeTileTitle.css'

const RecipeTileTitle = ({ title }) => <h2 className={css.recipeTileTitle}>{title}</h2>

RecipeTileTitle.propTypes = {
  title: PropTypes.string.isRequired,
}

export { RecipeTileTitle }
