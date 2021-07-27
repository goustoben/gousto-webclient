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
import { SidesExperimentProvider, SidesExperimentConsumer } from '../../../../../../Menu/context/sidesExperimentContext'

import css from './OrderProducts.css'

class OrderProducts extends React.PureComponent {
  render() {
    const { products, orderId } = this.props
    const hasProducts = Boolean(products.size)

    return (
      <div className={css.mainContainer}>
        {!hasProducts && (<img className={css.marketImageRight} src={marketPhotoSrc} alt="Gousto Market products" />)}
        <div>
          <div className={css.headerRow}>
            <Content contentKeys="mydeliveries_OrderOrderproductsTitle">
              <span className={css.header}>Gousto Market</span>
            </Content>
            <div>
              {hasProducts && (
              <SidesExperimentProvider>
                <SidesExperimentConsumer>
                  <Link className={css.editSidesLink} to={`${routes.client.orderConfirmationWithSides.replace(':orderId', orderId)}`}>
                    Edit Sides
                  </Link>
                </SidesExperimentConsumer>
              </SidesExperimentProvider>
              )}
              {hasProducts && (
              <Link className={css.editMarketItemsLink} to={routes.client.orderConfirmation.replace(':orderId', orderId)}>
                Edit Market Items
              </Link>
              )}
            </div>
          </div>
          {!hasProducts ? (
            <div className={css.marketPromoContainer}>
              <p className={css.marketPromoText}>Add desserts, drinks, snacks and more to your next box at no extra charge.</p>
              <img className={css.marketImageFull} src={marketPhotoSrc} alt="Gousto Market products" />
              <SidesExperimentProvider>
                <SidesExperimentConsumer>
                  <div>
                    <Link to={`${routes.client.orderConfirmationWithSides.replace(':orderId', orderId)}`}>
                      <Button className={css.addSidesButton} color="secondary" width="full" noDecoration>
                        Add sides
                      </Button>
                    </Link>
                  </div>
                </SidesExperimentConsumer>
              </SidesExperimentProvider>
              <div>
                <Link to={routes.client.orderConfirmation.replace(':orderId', orderId)}>
                  <Button color="secondary" width="full" noDecoration>
                    Add market items
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div>
              {products.map(product => (
                <div key={product.get('id')} className={css.productContainer}>
                  <div className={css.productImage}>
                    <ProductImage src={product.get('image') || placeholderSrc} alt={product.get('title')} />
                  </div>
                  <div className={css.productInfo}>
                    <div>{product.get('title')}</div>
                    <div>
                      x
                      {' '}
                      {product.get('quantity')}
                    </div>
                    <div className={css.price}>
                      £
                      {product.get('unitPrice').toFixed(2)}
                      {' '}
                      each
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

OrderProducts.propTypes = {
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

OrderProducts.defaultProps = {
  products: Immutable.List([]),
  orderId: '',
}

export default OrderProducts
