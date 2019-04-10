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
import { OrderConfirmationHeader } from './OrderConfirmationHeader'
import { ProductList } from './components/ProductList'
import { Navbar } from './components/Navbar'
import ReceiptContainer from './components/Receipt/ReceiptContainer'

const propTypes = {
  showHeader: PropTypes.bool.isRequired,
  showOrderConfirmationRecipt: PropTypes.bool.isRequired,
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
  saving: PropTypes.string, 
  saveRequired: PropTypes.bool, 
  onSave: PropTypes.func, 
  saveError: PropTypes.bool,  
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
      filteredProducts: null,
      isSummaryOpen: false,
    }
  }

  toggleAgeVerificationPopUp = () => {
    this.setState((prevState) => ({
      showAgeVerification: !prevState.showAgeVerification
    }))
  }

  toggleOrderSummary = () => {
    this.setState((prevState) => ({
      isSummaryOpen: !prevState.isSummaryOpen
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

  render() {
    const {
      headerDetails,
      showHeader,
      products,
      ageVerified,
      basket,
      productsCategories,
      selectedCategory,
      showOrderConfirmationRecipt,
      saving, 
      saveRequired, 
      onSave, 
      saveError 
    } = this.props
    const { showAgeVerification, hasConfirmedAge, isSummaryOpen, filteredProducts } = this.state
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
                products={products}
                basket={basket}
                ageVerified={ageVerified}
                productsCategories={productsCategories}
                toggleAgeVerificationPopUp={this.toggleAgeVerificationPopUp}
                selectedCategory={selectedCategory}
              />
            </section>
            <section className={classnames(css.orderDetails, css.mobileHide)}>
              {showOrderConfirmationRecipt && <ReceiptContainer />}
            </section>
            <section className={classnames(css.orderDetailsMobile, css.mobileShow)}>
              <button className={css.orderDetailsOpenButton} type="button" onClick={() => this.toggleOrderSummary()}>Open Order Summary</button>
              <Overlay open={isSummaryOpen} from="bottom">
                <div className={css.orderDetailsMobileContent}> 
                  <CloseButton onClose={() => this.toggleOrderSummary()} />
                  <ReceiptContainer orderSummaryCollapsed={false} />
                </div>
              </Overlay>
              <SaveButton 
                onOrderConfirmationMobile
                saving={saving}
                saveRequired={saveRequired}
                onClick={onSave}
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
