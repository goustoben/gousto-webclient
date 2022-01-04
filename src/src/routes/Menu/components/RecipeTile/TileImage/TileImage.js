import PropTypes from 'prop-types'
import React from 'react'
import { CookingTimeIcon } from '../../Recipe/CookingTimeIcon'
import { SoldOutOverlay } from '../../../Recipe/SoldOutOverlay'
import { VariantHeader } from '../../../Recipe/VariantHeader'

import css from './TileImage.css'
import { Image } from '../../Recipe'

const TileImage = ({
  recipeId,
  categoryId,
  originalId,
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

      <CookingTimeIcon />
    </div>

    {showVariantHeader && <VariantHeader recipeId={recipeId} categoryId={categoryId} originalId={originalId} />}
  </button>
)

TileImage.propTypes = {
  recipeId: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  originalId: PropTypes.string.isRequired,
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
