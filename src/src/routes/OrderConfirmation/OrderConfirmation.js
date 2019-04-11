import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { AgeVerificationPopUp } from 'Product/AgeVerification'
import Overlay from 'Overlay'
import { Dropdown } from 'goustouicomponents'
import css from './OrderConfirmation.css'
import { OrderConfirmationHeader } from './OrderConfirmationHeader'
import { ProductList } from './components/ProductList'
import { Navbar } from './components/Navbar'

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

  state = {
    selectedCategory: 'All Products'
  }

  getCategories = () => {
    const { products } = this.props
    const uniqueCategories = new Set()
    const categories = [{ id: 'All Products', label: 'All Products' }]

    Object.keys(products).map(productKey => (
      products[productKey].categories.map(category => !category.hidden && uniqueCategories.add(category.title))
    ))

    Array.from(uniqueCategories).map(category => categories.push({ id: category, label: category }))

    return categories
  }

  getChosenCategoryProducts = (chosenCategory) => {
    const { products, productsFilteredByCategory } = this.props

    this.setState({
      selectedCategory: chosenCategory
    })

    let chosenCategoryProducts = []

    if (chosenCategory == 'All Products') {
      chosenCategoryProducts = products
    } else {
      Object.keys(products).map(productKey => (
        products[productKey].categories.map(category => {
          const productProps = products[productKey]
          chosenCategory == category.title && chosenCategoryProducts.push(productProps)
        })
      ))
    }
    productsFilteredByCategory(chosenCategoryProducts)
  }

  render() {
    const {
      headerDetails,
      showHeader,
      products,
      ageVerified,
      basket,
      productsCategories,
      filteredProducts,
      basketProductAdd,
      basketProductRemove,
      productsFilteredByCategory,
    } = this.props
    const { showAgeVerification, hasConfirmedAge } = this.state
    const isUnderAge = hasConfirmedAge && !ageVerified

    const { selectedCategory } = this.state
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
            <Navbar items={categories} onClick={this.getChosenCategoryProducts} active={selectedCategory} />
          </div>
          <div className={css.dropdown}>
            <Dropdown options={categories} groupedOptions={[]} optionSelected={selectedCategory} onChange={this.getChosenCategoryProducts} />
          </div>
          <section className={css.marketPlaceContent}>
            <ProductList
              products={products}
              basket={basket}
              ageVerified={ageVerified}
              productsCategories={productsCategories}
              toggleAgeVerificationPopUp={this.toggleAgeVerificationPopUp}
              filteredProducts={filteredProducts}
              basketProductAdd={basketProductAdd}
              basketProductRemove={basketProductRemove}
              productsFilteredByCategory={productsFilteredByCategory}
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
