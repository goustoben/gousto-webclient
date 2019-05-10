import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import Immutable from 'immutable'/* eslint-disable new-cap */
import GoustoImage from 'Image'
import { capitalizeFirstLetter } from 'utils/text'
import css from './Item.css'

const Item = ({ available, disclaimerKey, type, media, title, quantity, onImageClick, onRemove, url, gift, showLine }) => (
  <div>
    <div className={available ? css.item : css.itemUnavailable}>
        <GoustoImage onClick={onImageClick} media={media} title={title} className={classnames(css.img, { [css.pointer]: !!onImageClick })} />

        <div className={css.details}>
          <p className={css.title}>{title}</p>
          {(!gift || quantity > 1) &&
            <p className={css.quantity}>
              {quantity} {type === 'product' ? 'item' : 'serving'}{quantity !== 1 ? 's' : ''}{disclaimerKey !== undefined ? ` ${disclaimerKey}` : ''}
            </p>
          }
          {gift && <p className={css.freeGift}>Free Gift!</p>}
          {url &&
            <p className={css.url}>
              <a className={css.view} href={url}>
                View {capitalizeFirstLetter(type)} <i className="fa fa-chevron-right" aria-hidden="true"></i>
              </a>
            </p>
          }
        </div>
        {(available && onRemove) ? <span className={css.minusIcon} onClick={onRemove} /> : null}
    </div>
    {showLine ? <div className={css.horizontalLine} /> : null}
  </div>
)

Item.propTypes = {
  disclaimerKey: PropTypes.string,
  type: PropTypes.oneOf(['product', 'recipe']),
  media: PropTypes.oneOfType([
    PropTypes.instanceOf(Immutable.List),
    PropTypes.instanceOf(Immutable.Map),
  ]).isRequired,
  title: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  onImageClick: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.oneOf([false]),
  ]),
  onRemove: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.oneOf([false]),
  ]),
  available: PropTypes.bool,
  gift: PropTypes.bool,
  url: PropTypes.string,
  showLine: PropTypes.bool,
}

Item.defaultProps = {
  showLine: false,
}

export default Item
