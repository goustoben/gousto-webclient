import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'/* eslint-disable new-cap */
import Item from 'Item'

const ProductItem = (props) => (
  <Item
    disclaimerKey={props.disclaimerKey}
    type="product"
    media={props.images.toList()}
    title={props.title}
    quantity={props.quantity}
    onImageClick={props.onImageClick}
    onRemove={props.onRemove}
    available={props.available}
    gift={props.gift}
    url={props.url}
  />
)

ProductItem.propTypes = {
  disclaimerKey: PropTypes.string,
  images: PropTypes.instanceOf(Immutable.Map).isRequired,
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
}

export default ProductItem
