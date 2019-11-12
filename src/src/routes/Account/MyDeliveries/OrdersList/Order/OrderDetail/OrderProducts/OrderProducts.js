import PropTypes from 'prop-types'
import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Immutable from 'immutable'

import { Button } from 'goustouicomponents'
import Link from 'Link'
import ProductImage from 'routes/Account/AccountComponents/ProductImage'
import routes from 'config/routes'
import actions from 'actions/products'
import Content from 'containers/Content'

import placeholderSrc from 'media/images/recipe-placeholder.png'

import css from './OrderProducts.css'

const imagesWidth = '100'
const limit = 7

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

  static contextTypes = {
    store: PropTypes.object.isRequired,
  }

  loadRandomProducts = ({ store }) => {
    store.dispatch(actions.productsLoadRandomProducts(limit, [imagesWidth]))
  }

  componentDidMount() {
    const store = this.context.store
    this.loadRandomProducts({ store })
  }

  render() {
    const { products, orderId } = this.props
    const productsSize = products.size

    return (
      <div>
        <div className={css.header}>
          <Content contentKeys="mydeliveries_OrderOrderproductsTitle" >
            <span>Your extras</span>
          </Content>
        </div>
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
        <div className={css.buttonRow}>
          <Link to={routes.client.orderConfirmation.replace(':orderId', orderId)} clientRouted={false}>
            <Button color={productsSize > 0 ? 'secondary' : 'primary'} noDecoration>
              {productsSize > 0 ? 'Edit extras' : 'Add extras'}
            </Button>
          </Link>
        </div>
      </div>
    )
  }
}

export default OrderProducts
