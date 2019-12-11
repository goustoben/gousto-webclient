import PropTypes from 'prop-types'
import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Immutable from 'immutable'

import { Button } from 'goustouicomponents'
import Link from 'Link'
import ProductImage from 'routes/Account/AccountComponents/ProductImage'
import routes from 'config/routes'
import Content from 'containers/Content'

import placeholderSrc from 'media/images/recipe-placeholder.png'
import marketPhotoSrc from 'media/photos/market-place-cover-photo.jpg'

import css from './OrderProducts.css'

class OrderProducts extends React.PureComponent {

  static propTypes = {
    products: ImmutablePropTypes.listOf(
      ImmutablePropTypes.mapContains({
        id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        unitPrice: PropTypes.number.isRequired,
      })
    ),
    orderId: PropTypes.string,
  }

  static defaultProps = {
    products: Immutable.List([]),
    orderId: '',
  }

  render() {
    const { products, orderId } = this.props

    return (
      <div className={css.mainContainer}>
        {products.size === 0 ? (<img className={css.marketImageRight} src={marketPhotoSrc} alt="Gousto Market products"/>) : null}
        <div>
          <div className={css.headerRow}>
            <Content contentKeys="mydeliveries_OrderOrderproductsTitle" >
              <span className={css.header}>Gousto Market</span>
            </Content>
            {products.size > 0 ? (
              <Link className={css.editLink} to={routes.client.orderConfirmation.replace(':orderId', orderId)}>
                Edit Items
              </Link>
            ) : null}
          </div>
          {products.size === 0 ? (
            <div className={css.marketPromoContainer}>
              <p className={css.marketPromoText}>Add desserts, drinks, snacks and more to your next box at no extra charge.</p>
              <img className={css.marketImageFull} src={marketPhotoSrc} alt="Gousto Market products"/>
              <Link to={routes.client.orderConfirmation.replace(':orderId', orderId)}>
                <Button color="secondary" width="full" noDecoration>
                  Go to Gousto Market
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              {products.map(product =>
                <div key={product.get('id')} className={css.productContainer}>
                  <div className={css.productImage}>
                    <ProductImage src={product.get('image') || placeholderSrc} alt={product.get('title')} />
                  </div>
                  <div className={css.productInfo}>
                    <div>{product.get('title')}</div>
                    <div>x {product.get('quantity')}</div>
                    <div className={css.price}>£{product.get('unitPrice').toFixed(2)} each</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default OrderProducts
