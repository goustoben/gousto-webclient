import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import GoustoImage from 'Image'
import { CookingTimeIconContainer } from '../CookingTimeIcon'
import { SoldOutOverlay } from '../../../Recipe/SoldOutOverlay'

import css from './TileImage.css'

const TileImage = ({
  media,
  title,
  maxMediaSize,
  isOutOfStock,
  lazy,
  onClick,
  recipeId,
  showVariantHeader,
  isInCarousel,
}) => {
  let tileImageClass = css.imageWrapper

  if (isInCarousel && showVariantHeader) {
    tileImageClass = css.carouselVariantHeaderImageWrapper
  } else if (isInCarousel) {
    tileImageClass = css.carouselImageWrapper
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={tileImageClass}
    >
      {(media.size > 0) && (<SoldOutOverlay isOutOfStock={isOutOfStock} />) }
      {(media.size > 0) && (
      <div>
        <GoustoImage
          media={media}
          title={title}
          maxMediaSize={maxMediaSize}
          className={css.imageStyle}
          lazy={lazy}
        />
        <CookingTimeIconContainer recipeId={recipeId} />
      </div>
      ) }
    </button>
  )
}

TileImage.propTypes = {
  media: PropTypes.instanceOf(Immutable.List).isRequired,
  title: PropTypes.string,
  maxMediaSize: PropTypes.number,
  isOutOfStock: PropTypes.bool,
  lazy: PropTypes.bool,
  onClick: PropTypes.func,
  recipeId: PropTypes.string.isRequired,
  isInCarousel: PropTypes.bool,
  showVariantHeader: PropTypes.bool,
}

TileImage.defaultProps = {
  title: '',
  onClick: () => {},
  isOutOfStock: false,
  maxMediaSize: null,
  lazy: true,
  isInCarousel: false,
  showVariantHeader: false,
}

export { TileImage }
