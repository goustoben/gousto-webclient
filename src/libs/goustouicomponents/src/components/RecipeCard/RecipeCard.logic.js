import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Rating } from '../Rating'
import { TimeIndicator } from '../TimeIndicator'
import { transformSrcSet } from '../../utils/imageUtils'
import css from './RecipeCard.module.css'

const RecipeCard = ({
  title,
  media,
  isResizable,
  rating,
  cookingTime,
  hasHoverEffect,
  hasMargin,
  hasRectangularImageOnMobile,
  fitHeight,
}) => {
  const { amountOfReviews, average, size } = rating || {}
  const srcSet = transformSrcSet(media)
  const imageSrc = media[media.length - 1].url

  return (
    <div
      className={classNames(css.recipeCard, {
        [css.isResizable]: isResizable,
        [css.hasHoverEffect]: hasHoverEffect,
        [css.hasMargin]: hasMargin,
        [css.fitHeight]: fitHeight,
      })}
    >
      <div
        className={classNames(css.imageContainer, {
          [css.hasRectangularImageOnMobile]: hasRectangularImageOnMobile,
        })}
      >
        <img
          className={css.recipeImage}
          src={imageSrc}
          alt={title}
          srcSet={srcSet}
        />
        <div className={css.timeContainer}>
          <TimeIndicator time={cookingTime} />
        </div>
      </div>
      <div className={css.cardDescription}>
        <p className={css.recipeTitle}>{title}</p>
        {amountOfReviews && average ? (
          <Rating
            amountOfReviews={amountOfReviews}
            average={average}
            size={size}
          />
        ) : null}
      </div>
    </div>
  )
}

RecipeCard.propTypes = {
  title: PropTypes.string.isRequired,
  media: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  rating: PropTypes.shape({
    amountOfReviews: PropTypes.number,
    average: PropTypes.number,
    size: PropTypes.oneOf(['Medium', 'Large']),
  }),
  cookingTime: PropTypes.number.isRequired,
  isResizable: PropTypes.bool.isRequired,
  hasHoverEffect: PropTypes.bool,
  hasMargin: PropTypes.bool,
  hasRectangularImageOnMobile: PropTypes.bool,
  fitHeight: PropTypes.bool,
}

RecipeCard.defaultProps = {
  rating: null,
  hasHoverEffect: false,
  hasMargin: true,
  hasRectangularImageOnMobile: false,
  fitHeight: false,
}

export { RecipeCard }
