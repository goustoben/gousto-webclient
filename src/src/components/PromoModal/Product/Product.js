import React from 'react'
import Immutable from 'immutable' /* eslint-disable new-cap */
import GoustoImage from 'Image'

import reactnl2br from 'react-nl2br'

import css from './Product.css'

const Product = ({ product }) => (
	<div className={css.container}>
		<div className={css.left}>
			<div>
				<GoustoImage media={product.get('media')} className={css.image} />
			</div>
		</div>
		<div className={css.right}>
			<h3 className={css.title}>{product.get('title')}</h3>
			<p>{reactnl2br(product.get('description'))}</p>
		</div>
	</div>
)

Product.propTypes = {
  product: React.PropTypes.instanceOf(Immutable.Map),
}

export default Product
