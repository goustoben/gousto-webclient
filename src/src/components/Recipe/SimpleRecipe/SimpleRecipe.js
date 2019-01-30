import React from 'react'
import PropTypes from 'prop-types'

import { recipePropTypes } from 'Recipe'
import css from './SimpleRecipe.css'
import Title from '../Title'
import Image from '../Image'
import Rating from '../Rating'
import StockBadge from '../StockBadge'

const SimpleRecipe = ({onClick, media, title, view, maxMediaSize, averageRating, ratingCount, stock}) => (
  <div>
    <div className={css.recipeDetails}>
      <div className={css.link} onClick={onClick}>
        <Image
          media={media}
          alt={title}
          view={view}
          maxMediaSize={maxMediaSize}
        />
      </div>
      <div className={css.textContainerCenter}>
        <span onClick={onClick} className={css.linkUnderlined}>
          <Title
            title={title}
            view={view}
          />
        </span>
        <div className={css.simpleTagContainer}>
          <Rating
            average={averageRating}
            count={ratingCount}
            view={view}
          />
          <StockBadge stock={stock} />
        </div>
      </div>
    </div>
  </div>
)

SimpleRecipe.propTypes = {
  ...recipePropTypes,
  maxMediaSize: PropTypes.number,
  averageRating: PropTypes.number,
  ratingCount: PropTypes.number,
}

SimpleRecipe.defaultProps = {
  view: 'simple',
  averageRating: 0,
  ratingCount: 0,
}

export default SimpleRecipe
