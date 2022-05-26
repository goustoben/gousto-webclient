import React from 'react'

import GoustoImage from 'Image'
import { TimeIndicator, Rating } from 'goustouicomponents'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

import { removeDiacritics } from 'utils/sanitizeText'

import css from './SimpleRecipe.css'

const SimpleRecipe = ({ media, title, maxMediaSize, averageRating, ratingCount, cookingTime }) => {
  const recipeTitle = removeDiacritics(title)

  return (
    <div className={css.recipeDetails}>
      <div className={css.simple}>
        <GoustoImage media={media} title={title} maxMediaSize={maxMediaSize} lazy />
        <div className={css.cookingTime}>
          <TimeIndicator time={cookingTime} />
        </div>
      </div>
      <div className={css.textContainer}>
        <h2 className={css.recipeTitle}>{recipeTitle}</h2>
        <div className={css.ratingContainer}>
          {ratingCount && averageRating ? (
            <Rating amountOfReviews={ratingCount} average={averageRating} size="Medium" />
          ) : null}
        </div>
      </div>
    </div>
  )
}

SimpleRecipe.propTypes = {
  title: PropTypes.string.isRequired,
  media: PropTypes.instanceOf(Immutable.List).isRequired,
  maxMediaSize: PropTypes.number.isRequired,
  averageRating: PropTypes.number.isRequired,
  ratingCount: PropTypes.number.isRequired,
  cookingTime: PropTypes.number.isRequired,
}

export { SimpleRecipe }
