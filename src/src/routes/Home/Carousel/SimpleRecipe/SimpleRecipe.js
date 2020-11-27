import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classNames from 'classnames'
import GoustoImage from 'Image'
import { TimeIndicator, Rating } from 'goustouicomponents'
import sanitizeText from 'utils/sanitizeText'
import css from './SimpleRecipe.css'

const SimpleRecipe = ({
  media,
  title,
  maxMediaSize,
  averageRating,
  ratingCount,
  cookingTime,
  isHomePageRedesignEnabled,
}) => {
  const recipeTitle = sanitizeText.removeDiacritics(title)

  return (
    <div className={css.recipeDetails}>
      <div className={css.simple}>
        <GoustoImage
          media={media}
          title={title}
          maxMediaSize={maxMediaSize}
          className={css.recipeImg}
          lazy
        />
        {isHomePageRedesignEnabled && (
          <div className={css.cookingTime}>
            <TimeIndicator time={cookingTime} />
          </div>
        )}
      </div>
      <div className={classNames(css.textContainerCenter, { [css.textContainer]: isHomePageRedesignEnabled })}>
        <h2 className={classNames(css.simpleHeading, { [css.recipeTitle]: isHomePageRedesignEnabled })}>
          {recipeTitle}
        </h2>
        <div className={css.simpleTagContainer}>
          {
            ratingCount && averageRating
              ? (
                <Rating
                  amountOfReviews={ratingCount}
                  average={averageRating}
                  size="Medium"
                />
              )
              : null
          }
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
  isHomePageRedesignEnabled: PropTypes.bool,
}

SimpleRecipe.defaultProps = {
  isHomePageRedesignEnabled: false,
}

export { SimpleRecipe }
