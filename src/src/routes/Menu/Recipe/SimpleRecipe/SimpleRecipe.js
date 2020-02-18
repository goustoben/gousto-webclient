import React from 'react'
import PropTypes from 'prop-types'

import { recipePropTypes } from 'routes/Menu/Recipe'
import css from './SimpleRecipe.css'
import Title from '../Title'
import Image from '../Image'
import Rating from '../Rating'

const SimpleRecipe = ({onClick, media, title, view, maxMediaSize, averageRating, ratingCount, stock, isNew}) => (
  <div>
    <div className={css.recipeDetails}>
      <div className={css.link} onClick={onClick}>
        <Image
          media={media}
          alt={title}
          view={view}
          maxMediaSize={maxMediaSize}
          stock={100 /* always show Simple Recipe as in stock */}
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
            isNew={isNew}
          />
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
  view: PropTypes.string,
}

SimpleRecipe.defaultProps = {
  view: 'simple',
  averageRating: 0,
  ratingCount: 0,
}

export { SimpleRecipe }
