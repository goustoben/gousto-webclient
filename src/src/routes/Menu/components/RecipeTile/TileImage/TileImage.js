import PropTypes from 'prop-types'
import React from 'react'
import { CookingTimeIconContainer } from '../CookingTimeIcon'
import { SoldOutOverlay } from '../../../Recipe/SoldOutOverlay'
import { VariantHeaderContainer } from '../../../Recipe/VariantHeader/VariantHeaderContainer'

import css from './TileImage.css'
import { Image } from '../../Recipe'

const TileImage = ({
  recipeId,
  categoryId,
  showVariantHeader,
  title,
  isOutOfStock,
  onClick,
}) => (
  <button
    onClick={onClick}
    type="button"
    className={css.imageWrapper}
  >
    <SoldOutOverlay isOutOfStock={isOutOfStock} />

    <div className={css.recipeImageAndCookingTimeWrapper}>
      <Image lazy title={title} className={css.imageStyle} />

      <CookingTimeIconContainer recipeId={recipeId} />
    </div>

    {showVariantHeader && <VariantHeaderContainer recipeId={recipeId} categoryId={categoryId} isOutOfStock={isOutOfStock} />}
  </button>
)

TileImage.propTypes = {
  recipeId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  title: PropTypes.string,
  isOutOfStock: PropTypes.bool,
  onClick: PropTypes.func,
  showVariantHeader: PropTypes.bool.isRequired,
}

TileImage.defaultProps = {
  title: '',
  onClick: () => { },
  isOutOfStock: false,
}

export { TileImage }
