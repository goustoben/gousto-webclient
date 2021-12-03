import React from 'react'
import PropTypes from 'prop-types'
import css from './CategoriesThumbnail.module.css'

export const CategoriesThumbnail = ({ thumbnail }) => (
  <div className={css.thumbnailContainer}>
    <img src={thumbnail} alt="recipe-from-category" className={css.thumbnail} />
  </div>
)

CategoriesThumbnail.propTypes = {
  thumbnail: PropTypes.string.isRequired,
}

