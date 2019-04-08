import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { getProductLimitReached } from 'utils/basket'
import { AgeVerificationPopUp } from 'Product/AgeVerification'
import Overlay from 'Overlay'
import css from './OrderConfirmation.css'
import { OrderConfirmationHeader } from './OrderConfirmationHeader'
import { ProductList } from './components/ProductList'

const propTypes = {
  showHeader: PropTypes.bool.isRequired,
  headerDetails: PropTypes.oneOfType([
    PropTypes.shape({
      deliveryDate: PropTypes.string,
      deliveryStart: PropTypes.string,
      deliveryEnd: PropTypes.string,
      whenCutoffTime: PropTypes.string,
      whenCutoffDate: PropTypes.string,
    }),
    PropTypes.bool,
  ]),
  basket: PropTypes.instanceOf(Immutable.Map).isRequired,
  productsCategories: PropTypes.instanceOf(Immutable.Map).isRequired,
  products: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    listPrice: PropTypes.string,
    images: PropTypes.array,
    ageRestricted: PropTypes.bool,
    quantity: PropTypes.number,
  }).isRequired,
  ageVerified: PropTypes.bool.isRequired,
  basketProductAdd: PropTypes.func.isRequired,
  basketProductRemove: PropTypes.func.isRequired,
}

const defaultProps = {
  showHeader: false,
  headerDetails: {}
}
class OrderConfirmation extends PureComponent {
  constructor() {
    super()
    this.state = {
      showAgeVerification: false,
      hasConfirmedAge: false,
    }
  }

  isLimitReached = (product) => {
    const { basket, productsCategories, products } = this.props
    const { id } = product
    const limitReachedResult = getProductLimitReached(id, basket, Immutable.fromJS(products), productsCategories)
  }

  toggleAgeVerificationPopUp = () => {
    this.setState((prevState) => ({
      showAgeVerification: !prevState.showAgeVerification
    }))
  }

  onAgeConfirmation = (isOver18) => {
    const { userVerifyAge } = this.props
    this.setState({
      hasConfirmedAge: true,
    })
    userVerifyAge(isOver18, true)
  }

  render() {
    const { products, headerDetails, showHeader, ageVerified } = this.props
    const { showAgeVerification, hasConfirmedAge } = this.state
    const isUnderAge = hasConfirmedAge && !ageVerified

    return (
      <div>
        {showHeader && <OrderConfirmationHeader
          {...headerDetails}
        />}
        <Overlay open={showAgeVerification} from="top">
          <AgeVerificationPopUp onClose={this.toggleAgeVerificationPopUp} isUnderAge={isUnderAge} onAgeConfirmation={this.onAgeConfirmation}/>
        </Overlay>
        <div className={css.marketPlaceWrapper}>
          <h3 className={css.marketPlaceTitle}>The Gousto Market</h3>
          <section className={css.marketPlaceContent}>
            <ProductList
              products={products}
              ageVerified={ageVerified}
              basket={basket}
              productsCategories={productsCategories}
              basketProductAdd={basketProductAdd}
              basketProductRemove={basketProductRemove}
            />
          </section>
        </div>
      </div>
    )
  }
}

OrderConfirmation.propTypes = propTypes
OrderConfirmation.defaultProps = defaultProps

export default OrderConfirmation
