import PropTypes from 'prop-types'
import React from 'react'
import { useDeviceType, DeviceType } from 'hooks/useDeviceType'
import { SoldOutOverlay } from '../../Recipe/SoldOutOverlay'

import { Image, CookingTimeIcon } from '../../Recipe'
import { VariantHeader } from '../VariantHeader'
import css from './TileImage.css'

const isOnBiggerScreen = (deviceType: string) =>
  deviceType === DeviceType.DESKTOP || deviceType === DeviceType.TABLET

export const TileImage: React.FC<{
  categoryId: string
  originalId: string
}> = ({ categoryId, originalId }) => {
  const deviceType = useDeviceType()
  const showVariantHeader = isOnBiggerScreen(deviceType)

  return (
    <button type="button" className={css.imageWrapper}>
      <SoldOutOverlay />

      <div className={css.recipeImageAndCookingTimeWrapper}>
        <Image lazy className={css.imageStyle} />

        <CookingTimeIcon />
      </div>

      {showVariantHeader && <VariantHeader categoryId={categoryId} originalId={originalId} />}
    </button>
  )
}

TileImage.propTypes = {
  categoryId: PropTypes.string.isRequired,
  originalId: PropTypes.string.isRequired,
}
