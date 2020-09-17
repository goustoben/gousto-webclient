import React from 'react'
import PropTypes from 'prop-types'
import css from './CategoriesThumbnail.css'

export const CategoriesThumbnail = ({ thumbnail }) => (
  <div>
    <img src={thumbnail} alt="recipe-from-category" className={css.thumbnail} />
  </div>
)

CategoriesThumbnail.propTypes = {
  thumbnail: PropTypes.string.isRequired,
}

