import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import classnames from 'classnames'
import GoustoImage from 'Image'
import { SoldOutOverlay } from '../SoldOutOverlay'

import css from './Image.css'

const Image = ({ media, title, view, mouseEnter, mouseLeave, maxMediaSize, stock, inBasket }) => (
  <div
    className={classnames(
      { [css[view]]: ['list', 'featured'].indexOf(view) !== -1 },
      { [css.grid]: ['list', 'featured', 'fineDineInDetail'].indexOf(view) === -1 },
      { [css.detail]: view === 'detail' },
      { [css.fineDineInDetail]: view === 'fineDineInDetail' },
      { [css.simple]: view === 'simple' },
      css.placeholder,
    )}
    onMouseEnter={mouseEnter}
    onMouseLeave={mouseLeave}
  >
    {(media.size > 0) && (<SoldOutOverlay stock={stock} inBasket={inBasket} />) }
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
  stock: PropTypes.number.isRequired,
  inBasket: PropTypes.bool.isRequired,
}

Image.defaultProps = {
  title: '',
  view: 'grid',
  mouseEnter: () => {},
  mouseLeave: () => {},
  media: Immutable.List([]),
}

export default Image
