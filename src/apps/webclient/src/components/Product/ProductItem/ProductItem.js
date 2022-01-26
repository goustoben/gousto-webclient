import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import Item from 'Item'

export const ProductItem = ({ disclaimerKey, images, title, quantity, onImageClick, onRemove, available, gift, url }) => (
  <Item
    disclaimerKey={disclaimerKey}
    type="product"
    media={images ? images.toList() : []}
    title={title}
    quantity={quantity}
    onImageClick={onImageClick}
    onRemove={onRemove}
    available={available}
    gift={gift}
    url={url}
  />
)

ProductItem.propTypes = {
  disclaimerKey: PropTypes.string,
  images: PropTypes.instanceOf(Immutable.Map).isRequired,
  title: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  onImageClick: PropTypes.func,
  onRemove: PropTypes.func,
  available: PropTypes.bool,
  gift: PropTypes.bool,
  url: PropTypes.string,
}

ProductItem.defaultProps = {
  disclaimerKey: null,
  onImageClick: () => {},
  onRemove: () => {},
  available: false,
  gift: false,
  url: null,
}
