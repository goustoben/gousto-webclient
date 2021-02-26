import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import GoustoImage from 'Image'
import { CookingTimeIconContainer } from '../CookingTimeIcon'
import { SoldOutOverlay } from '../../../Recipe/SoldOutOverlay'
import { VariantHeaderContainer } from '../../../Recipe/VariantHeader/VariantHeaderContainer'

import css from './TileImage.css'

const TileImage = ({
  recipeId,
  categoryId,
  media,
  title,
  maxMediaSize,
  isOutOfStock,
  lazy,
  onClick,
  isInCarousel,
}) => {
  let tileImageClass = css.imageWrapper

  if (isInCarousel) {
    tileImageClass = css.carouselImageWrapper
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={tileImageClass}
    >
      {(media.size > 0) && (<SoldOutOverlay isOutOfStock={isOutOfStock} />)}
      {(media.size > 0) && (
        <div className={css.recipeImageAndCookingTimeWrapper}>
          <GoustoImage
            media={media}
            title={title}
            maxMediaSize={maxMediaSize}
            className={css.imageStyle}
            lazy={lazy}
          />
          <CookingTimeIconContainer recipeId={recipeId} />
        </div>
      )}

      <VariantHeaderContainer recipeId={recipeId} categoryId={categoryId} isOutOfStock={isOutOfStock} />
    </button>
  )
}

TileImage.propTypes = {
  recipeId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  media: PropTypes.instanceOf(Immutable.List).isRequired,
  title: PropTypes.string,
  maxMediaSize: PropTypes.number,
  isOutOfStock: PropTypes.bool,
  lazy: PropTypes.bool,
  onClick: PropTypes.func,
  isInCarousel: PropTypes.bool,
}

TileImage.defaultProps = {
  title: '',
  onClick: () => { },
  isOutOfStock: false,
  maxMediaSize: null,
  lazy: true,
  isInCarousel: false,
}

export { TileImage }
