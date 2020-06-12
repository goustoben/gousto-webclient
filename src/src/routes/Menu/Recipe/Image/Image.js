import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import classnames from 'classnames'
import GoustoImage from 'Image'
import { SoldOutOverlay } from '../SoldOutOverlay'

import css from './Image.css'

const Image = ({ media, title, view, mouseEnter, mouseLeave, maxMediaSize, outOfStock }) => (
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
    {(media.size > 0) && (<SoldOutOverlay outOfStock={outOfStock} />) }
    {(media.size > 0) && (
    <GoustoImage
      media={media}
      title={title}
      maxMediaSize={maxMediaSize}
      className={css.recipeImg}
      lazy
    />
    ) }
  </div>
)

Image.propTypes = {
  media: PropTypes.instanceOf(Immutable.List).isRequired,
  title: PropTypes.string,
  view: PropTypes.string,
  mouseEnter: PropTypes.func,
  mouseLeave: PropTypes.func,
  maxMediaSize: PropTypes.number,
  outOfStock: PropTypes.bool,
}

Image.defaultProps = {
  title: '',
  view: 'grid',
  mouseEnter: () => {},
  mouseLeave: () => {},
  media: Immutable.List([]),
  outOfStock: false
}

export default Image
