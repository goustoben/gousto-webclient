import PropTypes from 'prop-types'
import React from 'react'
import Immutable from 'immutable' // eslint-disable new-cap
import ImageSelection from 'ImageSelection'
import LinkButton from 'LinkButton'
import SectionHeader from 'SectionHeader'
import css from './List.css'
import config from 'config'

const productsRoute = config.routes.client.orderSummary

const ProductList = ({ orderId, products, number, onProductClick }) => (
	<article className={css.content}>
		<SectionHeader title={'The Gousto Market'} type="minorArticle">
			Here you can add lovely wines, craft beers, delicious desserts, staples, kitchen tools, and treats from artisan suppliers.
		</SectionHeader>
		<ImageSelection
			content={products.slice(0, number).toArray()}
			onImageClick={(itemId) => onProductClick(itemId)}
			onTitleClick={(itemId) => onProductClick(itemId)}
		/>
		<div className={css.button}>
			<LinkButton
				to={productsRoute.replace(':orderId', orderId)}
				clientRouted={false}
			>
				GO TO THE GOUSTO MARKET
			</LinkButton>
		</div>
	</article>
)

ProductList.propTypes = {
	products: PropTypes.instanceOf(Immutable.List),
	onProductClick: PropTypes.func,
	number: PropTypes.number,
	orderId: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
}

ProductList.defaultProps = {
	products: Immutable.List(),
	number: 6,
}

export default ProductList
