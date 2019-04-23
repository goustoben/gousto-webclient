import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import { AgeVerificationPopUp } from 'Product/AgeVerification'
import Overlay from 'Overlay'
import { Dropdown } from 'goustouicomponents'
import CloseButton from 'Overlay/CloseButton'
import SaveButton from 'OrderSummary/SaveButton'
import css from './OrderConfirmation.css'
import { OrderConfirmationHeader } from './components/OrderConfirmationHeader'
import { ProductList } from './components/ProductList'
import { Navbar } from './components/Navbar'
import OrderSummaryContainer from './components/OrderSummary/OrderSummaryContainer'
import { ReferAFriend } from './components/ReferAFriend'

const propTypes = {
  showHeader: PropTypes.bool.isRequired,
  showOrderConfirmationReceipt: PropTypes.bool.isRequired,
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
  selectedCategory: PropTypes.string.isRequired,
  filterProductCategory: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  saveRequired: PropTypes.bool,
  onSave: PropTypes.func,
  saveError: PropTypes.bool,
  isOrderConfirmation: PropTypes.bool,
}

const defaultProps = {
  showHeader: false,
  headerDetails: {},
  isOrderConfirmation: true,
}

class OrderConfirmation extends PureComponent {
  constructor() {
    super()
    this.state = {
      showAgeVerification: false,
      hasConfirmedAge: false,
      filteredProducts: null,
      isOrderSummaryOpen: false,
    }
  }

  componentDidMount() {
    const { userFetchReferralOffer } = this.props
    userFetchReferralOffer()
  }

  toggleAgeVerificationPopUp = () => {
    this.setState((prevState) => ({
      showAgeVerification: !prevState.showAgeVerification
    }))
  }

  toggleOrderSummary = () => {
    this.setState((prevState) => ({
      isOrderSummaryOpen: !prevState.isOrderSummaryOpen
    }))
  }

  onAgeConfirmation = (isOver18) => {
    const { userVerifyAge } = this.props
    this.setState({
      hasConfirmedAge: true,
    })
    userVerifyAge(isOver18, true)
  }

  getCategories = () => {
    const { products } = this.props
    const uniqueCategories = []
    const allProducts = [{ id: 'all-products', label: 'All Products' }]

    if (!products) return allProducts

    return Object.keys(products).reduce((categoryProducts, productId) => {
      const productCategories = products[productId].categories

      productCategories && productCategories.map(category => {
        const duplicateCategory = uniqueCategories.includes(category.id)
        if (!category.hidden && !duplicateCategory) {
          const newCategory = {
            id: category.id,
            label: category.title
          }
          categoryProducts.push(newCategory)
          uniqueCategories.push(category.id)
        }
      })

      return categoryProducts
    }, allProducts)
  }

  getFilteredProducts = (chosenCategory) => {
    const { products, filterProductCategory } = this.props

    filterProductCategory(chosenCategory)

    if (!products) return

    let chosenCategoryProducts = null

    if (chosenCategory == 'all-products') {
      chosenCategoryProducts = products
    } else {
      Object.keys(products).map(productKey => {
        const productCategories = products[productKey].categories
        productCategories && productCategories.map(category => {
          const productProps = products[productKey]

          if (chosenCategory == category.id) {
            const product = { [productProps.id]: { ...productProps } }
            chosenCategoryProducts = { ...chosenCategoryProducts, ...product }
          }
        })
      })
    }

    this.setState({
      filteredProducts: chosenCategoryProducts
    })
  }

  onOrderSave = () => {
    const { isOrderConfirmation, onSave } = this.props
    onSave(isOrderConfirmation)
  }

  render() {
    const {
      headerDetails,
      showHeader,
      products,
      ageVerified,
      basket,
      productsCategories,
      selectedCategory,
      showOrderConfirmationReceipt,
      saving,
      saveRequired,
      saveError,
    } = this.props
    const { showAgeVerification, hasConfirmedAge, isOrderSummaryOpen, filteredProducts } = this.state
    const isUnderAge = hasConfirmedAge && !ageVerified
    const categories = this.getCategories()

    return (
      <div>
        {showHeader && <OrderConfirmationHeader
          {...headerDetails}
        />}
        <Overlay open={showAgeVerification} from="top">
          <AgeVerificationPopUp onClose={this.toggleAgeVerificationPopUp} isUnderAge={isUnderAge} onAgeConfirmation={this.onAgeConfirmation} />
        </Overlay>
        <div className={css.mobileShow}>
          <ReferAFriend />
        </div>
        <div className={css.marketPlaceWrapper}>
          <h3 className={css.marketPlaceTitle}>The Gousto Market</h3>
          <div className={css.navbar}>
            <Navbar items={categories} onClick={this.getFilteredProducts} active={selectedCategory} />
          </div>
          <div className={css.dropdown}>
            <Dropdown id={'product-filter'} options={categories} groupedOptions={[]} optionSelected={selectedCategory} onChange={this.getFilteredProducts} />
          </div>
          <div className={css.marketPlaceContent}>
            <section className={css.marketPlaceProducts}>
              <ProductList
                products={filteredProducts || products}
                basket={basket}
                ageVerified={ageVerified}
                productsCategories={productsCategories}
                toggleAgeVerificationPopUp={this.toggleAgeVerificationPopUp}
                selectedCategory={selectedCategory}
              />
            </section>
            {showOrderConfirmationReceipt && (
              <section className={classnames(css.orderDetails, css.mobileHide)}>
                <OrderSummaryContainer onOrderConfirmationMobile />
                <ReferAFriend />
              </section>
            )}
            <section className={classnames(css.orderDetailsMobile, css.mobileShow)}>
              <button className={css.orderDetailsOpenButton} type="button" onClick={() => this.toggleOrderSummary()}>Open Order Summary</button>
              <Overlay open={isOrderSummaryOpen} from="bottom">
                <div className={css.orderDetailsMobileContent}>
                  <div className={css.orderDetailsCloseButton}>
                    <CloseButton onClose={() => this.toggleOrderSummary()} />
                  </div>
                  <OrderSummaryContainer orderSummaryCollapsed={false} onOrderConfirmationMobile />
                </div>

              </Overlay>
              <SaveButton
                onOrderConfirmationMobile
                saving={saving}
                saveRequired={saveRequired}
                onClick={this.onOrderSave}
                error={saveError}
              />
            </section>
          </div>
        </div>
      </div>
    )
  }
}

OrderConfirmation.propTypes = propTypes
OrderConfirmation.defaultProps = defaultProps

export default OrderConfirmation
