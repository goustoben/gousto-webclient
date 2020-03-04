import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import GoustoImage from 'Image'
import sanitizeText from 'utils/sanitizeText'
import css from './SimpleRecipe.css'
import { SimpleStarRating } from './SimpleStarRating'

const SimpleRecipe = ({media, title, maxMediaSize, averageRating, ratingCount}) => {
  const recipeTitle = sanitizeText.removeDiacritics(title)

  return (
    <div>
      <div className={css.recipeDetails}>
        <div className={css.simple}>
          <GoustoImage
            media={media}
            title={title}
            maxMediaSize={maxMediaSize}
            className={css.recipeImg}
            lazy
          />
        </div>
        <div className={css.textContainerCenter}>
          <h2 className={css.simpleHeading}>
            {recipeTitle}
          </h2>
          <div className={css.simpleTagContainer}>
            <SimpleStarRating
              average={averageRating}
              count={ratingCount}
            />
          </div>
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
}

export { SimpleRecipe }
