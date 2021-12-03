import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import classnames from 'classnames'
import GoustoImage from 'Image'
import { SoldOutOverlay } from '../SoldOutOverlay'

import css from './Image.module.css'

const Image = ({ media, title, view, mouseEnter, mouseLeave, maxMediaSize, isOutOfStock, lazy }) => (
  <div
    className={classnames(
      { [css[view]]: ['list', 'fineDineIn'].indexOf(view) !== -1 },
      { [css.grid]: ['list', 'fineDineInDetail'].indexOf(view) === -1 },
      { [css.detail]: view === 'detail' },
      { [css.fineDineInDetail]: view === 'fineDineInDetail' },
      { [css.simple]: view === 'simple' },
      css.placeholder,
    )}
    onMouseEnter={mouseEnter}
    onMouseLeave={mouseLeave}
  >
    {(media.size > 0) && (<SoldOutOverlay isOutOfStock={isOutOfStock} />) }
    {(media.size > 0) && (
      <GoustoImage
        media={media}
        title={title}
        maxMediaSize={maxMediaSize}
        className={css.recipeImg}
        lazy={lazy}
      />
    ) }
  </div>
)

Image.propTypes = {
  media: PropTypes.instanceOf(Immutable.List),
  title: PropTypes.string,
  view: PropTypes.string,
  mouseEnter: PropTypes.func,
  mouseLeave: PropTypes.func,
  maxMediaSize: PropTypes.number,
  isOutOfStock: PropTypes.bool,
  lazy: PropTypes.bool,
}

Image.defaultProps = {
  title: '',
  view: 'grid',
  mouseEnter: () => {},
  mouseLeave: () => {},
  isOutOfStock: false,
  maxMediaSize: null,
  lazy: true
}

export { Image }
