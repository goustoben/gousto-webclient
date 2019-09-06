import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import Immutable from 'immutable'
import GoustoImage from 'Image'
import { MoveRecipeButton } from 'MoveRecipeButton'
import { capitalizeFirstLetter } from 'utils/text'
import css from './Item.css'

const isFunction = (func) => (typeof func === 'function')

const quantityMessage = (gift, quantity, disclaimerKey, type) => {
  if (!gift || quantity > 1) {
    const typeLabel = type === 'product' ? 'item' : 'serving'
    const amountLabel = quantity !== 1 ? 's' : ''

    return (
      <p className={css.quantity}>
        {quantity} {typeLabel}{amountLabel}
        {disclaimerKey !== undefined ? ` ${disclaimerKey}` : ''}
      </p>
    )
  }
}

const Item = ({
  available,
  disclaimerKey,
  fromBox,
  gift,
  media,
  onImageClick,
  onRemove,
  quantity,
  recipeId,
  showShortlistButton,
  title,
  type,
  url,
}) => (
  <div className={available ? css.item : css.itemUnavailable}>
    <GoustoImage onClick={onImageClick} media={media} title={title} className={classnames(css.img, { [css.pointer]: isFunction(onImageClick) })} />

    <div className={classnames(css.details, { [css.detailsExtraPadding]: !!onRemove })}>
      <button type='button' className={classnames(css.title, { [css.pointer]: isFunction(onImageClick), [css.clickableTitle]: isFunction(onImageClick) })} onClick={onImageClick}>
        {title}
        {isFunction(onImageClick) && <span className={css.arrowRight} />}
      </button>
      {quantityMessage(gift, quantity, disclaimerKey, type)}
      {gift && <p className={css.freeGift}>Free Gift!</p>}
      {url &&
        <p className={css.url}>
          <a className={css.view} href={url}>
            View {capitalizeFirstLetter(type)} <i className="fa fa-chevron-right" aria-hidden="true"></i>
          </a>
        </p>
      }
      {showShortlistButton && <MoveRecipeButton recipeId={recipeId} fromBox={fromBox} />}
    </div>
    {(available && onRemove) ? <span className={css.minusIcon} onClick={onRemove} /> : null}
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
  showShortlistButton: PropTypes.bool,
  fromBox: PropTypes.bool,
  recipeId: PropTypes.string,
}

Item.defaultProps = {
  showShortlistButton: false,
  fromBox: false,
  recipeId: "",
}

export default Item
