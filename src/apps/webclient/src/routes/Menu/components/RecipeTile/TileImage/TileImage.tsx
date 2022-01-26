import PropTypes from 'prop-types'
import React from 'react'
import { useStock } from 'routes/Menu/domains/menu'
import { useRecipeField } from 'routes/Menu/context/recipeContext'
import { SoldOutOverlay } from 'routes/Menu/Recipe/SoldOutOverlay'
import { VariantHeader } from 'routes/Menu/Recipe/VariantHeader'
import { useDeviceType, DeviceType } from 'hooks/useDeviceType'

import { Image, CookingTimeIcon } from '../../Recipe'
import css from './TileImage.css'

const isOnBiggerScreen = (deviceType: string) =>
  deviceType === DeviceType.DESKTOP || deviceType === DeviceType.TABLET

export const TileImage: React.FC<{
  categoryId: string
  originalId: string
}> = ({ categoryId, originalId }) => {
  const recipeId = useRecipeField<string>('id', null)
  const { isRecipeOutOfStock } = useStock()
  const isOutOfStock = isRecipeOutOfStock(recipeId)
  const deviceType = useDeviceType()

  const showVariantHeader = isOnBiggerScreen(deviceType)

  return (
    <button type="button" className={css.imageWrapper}>
      <SoldOutOverlay isOutOfStock={isOutOfStock} />

      <div className={css.recipeImageAndCookingTimeWrapper}>
        <Image lazy className={css.imageStyle} />

        <CookingTimeIcon />
      </div>

      {showVariantHeader && (
        <VariantHeader recipeId={recipeId} categoryId={categoryId} originalId={originalId} />
      )}
    </button>
  )
}

TileImage.propTypes = {
  categoryId: PropTypes.string.isRequired,
  originalId: PropTypes.string.isRequired,
}
