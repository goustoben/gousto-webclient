import React from 'react'
import Immutable from 'immutable'
import GoustoImage from 'Image'
import classnames from 'classnames'
import { SoldOutOverlay } from '../../Recipe/SoldOutOverlay'
import css from './DetailImage.css'

type DetailImageProps = {
  media: Immutable.List<
    Partial<{
      width: number
      src: string
    }>
  >
  title: string
  view: 'list' | 'fineDineIn' | 'fineDineInDetail' | 'simple' | 'detail' | 'grid'
  mouseEnter: () => void
  mouseLeave: () => void
  maxMediaSize: number | null
  lazy: boolean
}

export const DetailImage = ({
  media,
  title = '',
  view = 'grid',
  mouseEnter = () => {},
  mouseLeave = () => {},
  maxMediaSize = null,
  lazy = true,
}: DetailImageProps) => (
  <div
    className={classnames(
      { [css[view]]: ['list', 'fineDineIn'].indexOf(view) !== -1 },
      { [css.grid]: ['list', 'fineDineInDetail'].indexOf(view) === -1 },
      { [css.detail]: view === 'detail' },
      { [css.fineDineInDetail]: view === 'fineDineInDetail' },
      { [css.simple]: view === 'simple' },
      css.placeholder
    )}
    onMouseEnter={mouseEnter}
    onMouseLeave={mouseLeave}
  >
    {/* Showing SoldOutOverlay when the recipe does not have media is slightly
    misleading. Maybe it is worth bringing special replacer instead? */}
    {media.size > 0 && <SoldOutOverlay />}
    {media.size > 0 && (
      <GoustoImage
        media={media}
        title={title}
        maxMediaSize={maxMediaSize}
        className={css.recipeImg}
        lazy={lazy}
      />
    )}
  </div>
)
