import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import GoustoImage from 'Image'
import { CookingTimeIconContainer } from '../CookingTimeIcon'
import { SoldOutOverlay } from '../../../Recipe/SoldOutOverlay'

import css from './TileImage.css'

const TileImage = ({ media, title, mouseEnter, mouseLeave, maxMediaSize, isOutOfStock, lazy, onClick, recipeId }) => (
  <button
    onClick={onClick}
    type="button"
    onMouseEnter={mouseEnter}
    onMouseLeave={mouseLeave}
    className={css.imageWrapper}
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

TileImage.propTypes = {
  media: PropTypes.instanceOf(Immutable.List).isRequired,
  title: PropTypes.string,
  mouseEnter: PropTypes.func,
  mouseLeave: PropTypes.func,
  maxMediaSize: PropTypes.number,
  isOutOfStock: PropTypes.bool,
  lazy: PropTypes.bool,
  onClick: PropTypes.func,
  recipeId: PropTypes.string.isRequired,
}

TileImage.defaultProps = {
  title: '',
  mouseEnter: () => {},
  mouseLeave: () => {},
  onClick: () => {},
  isOutOfStock: false,
  maxMediaSize: null,
  lazy: true,
}

export { TileImage }
