import PropTypes from 'prop-types'
import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import Immutable from 'immutable'
import classnames from 'classnames'

import { Button } from 'goustouicomponents'
import Link from 'Link'
import ProductImage from 'routes/Account/AccountComponents/ProductImage'
import routes from 'config/routes'
import actions from 'actions/products'
import Content from 'containers/Content'

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
    randomProducts: ImmutablePropTypes.listOf(
      ImmutablePropTypes.mapContains({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        images: ImmutablePropTypes.mapContains({
          [imagesWidth]: ImmutablePropTypes.mapContains({
            src: PropTypes.string.isRequired,
          }),
        }),
      })
    ),
    orderId: PropTypes.string,
  }

  static defaultProps = {
    products: Immutable.List([]),
    randomProducts: Immutable.List([]),
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
    const productsSize = this.props.products.size

    return (
      <div>
        <div className={`${css.header} ${css.hideInMobile}`}>
          <Content contentKeys="mydeliveriesOrderOrderproductsHeader" >
            <span>Fancy something extra?</span>
          </Content>
        </div>
        <div className={`${css.header} ${css.hideInDesktop}`}>
          <Content contentKeys="mydeliveries_OrderOrderproductsTitle" >
            <span>Your extras</span>
          </Content>
        </div>
        {productsSize > 0 ?
          <div>
            {this.props.products.map(product =>
              <div key={product.get('id')} className={css.productContainer}>
                <div className={css.productImage}>
                  <ProductImage src={product.get('image')} alt={product.get('title')} />
                </div>
                <div className={css.productInfo}>
                  <div>{product.get('title')}</div>
                  <div>x {product.get('quantity')}</div>
                  <div className={css.price}>£{product.get('unitPrice').toFixed(2)} each</div>
                </div>
              </div>
            )}
          </div>
          :
          <div className={css.randomProductsContainer}>
            {this.props.randomProducts.map((product, index) =>
              <div key={product.get('id')} className={classnames(css.randomProductImage, { [css.hideInMobile]: index > 3 })}>
                <ProductImage src={product.getIn(['images', imagesWidth, 'src'])} alt={product.get('title')} />
              </div>
            )}
          </div>
        }
        <div className={css.buttonRow}>
          <Link to={routes.client.orderConfirmation.replace(':orderId', this.props.orderId)} clientRouted={false}>
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
