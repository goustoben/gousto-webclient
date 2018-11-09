import React, { PropTypes } from 'react'
import Overlay from 'Overlay'
import ProductDetail from 'containers/Product/Detail'

const ProductDetailOverlay = ({ onVisibilityChange, open, productId }) => (
	<Overlay open={open} onClick={() => { onVisibilityChange(false) }}>
		{productId ? <ProductDetail productId={productId} /> : ''}
	</Overlay>
)

ProductDetailOverlay.propTypes = {
  onVisibilityChange: PropTypes.func,
  open: PropTypes.bool.isRequired,
  productId: PropTypes.string,
}

export default ProductDetailOverlay
