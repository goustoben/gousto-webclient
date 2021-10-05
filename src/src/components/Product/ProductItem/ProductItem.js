import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable'
import Item from 'Item'

const emptyArray = []

const ProductItem = (props) => (
  <Item
    disclaimerKey={props.disclaimerKey}
    type="product"
    media={props.images ? props.images.toList() : emptyArray}
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

export default ProductItem
