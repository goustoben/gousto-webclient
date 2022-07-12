import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import Immutable from 'immutable'
import GoustoImage from 'Image'
import { capitalizeFirstLetter } from 'utils/text'
import { onEnter } from 'utils/accessibility'
import css from './Item.css'

const isFunction = (func) => (typeof func === 'function')

const quantityMessage = (gift, quantity, disclaimerKey, type) => {
  if (!gift || quantity > 1) {
    const typeLabel = type === 'product' ? 'item' : 'serving'
    const amountLabel = quantity !== 1 ? 's' : ''

    return (
      <p className={css.quantity}>
        {quantity}
        {' '}
        {typeLabel}
        {amountLabel}
        {disclaimerKey ? ` ${disclaimerKey}` : ''}
      </p>
    )
  }

  return null
}

export const Item = ({
  available,
  disclaimerKey,
  gift,
  media,
  onImageClick,
  onRemove,
  quantity,
  title,
  type,
  url,
}) => (
  <div className={available ? css.item : css.itemUnavailable} data-testing={`item-${type}`}>
    <GoustoImage onClick={onImageClick} media={media} title={title} className={classnames(css.img, { [css.pointer]: isFunction(onImageClick) })} />

    <div className={classnames(css.details, { [css.detailsExtraPadding]: !!onRemove })}>
      <button type="button" className={classnames(css.title, { [css.pointer]: isFunction(onImageClick), [css.clickableTitle]: isFunction(onImageClick) })} onClick={onImageClick}>
        {title}
        {isFunction(onImageClick) && <span className={css.arrowRight} />}
      </button>
      {quantityMessage(gift, quantity, disclaimerKey, type)}
      {gift && <p className={css.freeGift}>Free Gift!</p>}
      {url && (
        <p className={css.url}>
          <a className={css.view} href={url}>
            View
            {' '}
            {capitalizeFirstLetter(type)}
            {' '}
            <i className="fa fa-chevron-right" aria-hidden="true" />
          </a>
        </p>
      )}
    </div>
    {(available && onRemove) ? (
      <span
        className={css.minusIcon}
        onClick={onRemove}
        onKeyDown={onEnter(onRemove)}
        role="button"
        tabIndex="0"
        data-testing={`item-${type}-minus`}
      />
    ) : null}
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
  onImageClick: PropTypes.func,
  onRemove: PropTypes.func,
  available: PropTypes.bool,
  gift: PropTypes.bool,
  url: PropTypes.string,
}

Item.defaultProps = {
  disclaimerKey: null,
  type: 'product',
  onImageClick: null,
  onRemove: null,
  available: false,
  gift: false,
  url: null,
}
