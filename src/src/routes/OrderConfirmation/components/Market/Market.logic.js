import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'

import { MarketPresentation } from './Market.presentation'

const propTypes = {
  ageVerified: PropTypes.bool,
  basket: PropTypes.instanceOf(Immutable.Map).isRequired,
  filterProductCategory: PropTypes.func.isRequired,
  isOrderConfirmation: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
  products: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    listPrice: PropTypes.string,
    images: PropTypes.array,
    ageRestricted: PropTypes.bool,
    quantity: PropTypes.number,
  }).isRequired,
  productsCategories: PropTypes.instanceOf(Immutable.Map).isRequired,
  productsLoadError: PropTypes.string,
  saveError: PropTypes.bool,
  saveRequired: PropTypes.bool,
  saving: PropTypes.bool,
  selectedCategory: PropTypes.string.isRequired,
  showOrderConfirmationReceipt: PropTypes.bool.isRequired,
  toggleAgeVerificationPopUp: PropTypes.func.isRequired,
}

const defaultProps = {
  ageVerified: false,
  isOrderConfirmation: false,
  saveError: false,
  saveRequired: false,
  saving: false,
}

class Market extends PureComponent {

  state = {
    filteredProducts: null,
    isOrderSummaryOpen: false,
  }

  getCategories = () => {
    const { products } = this.props
    const uniqueCategories = []
    const allProducts = [{ id: 'all-products', label: 'All Products' }]

    if (!products) return allProducts

    allProducts[0].count = Object.keys(products).length

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

    if (!Object.keys(products).length) return

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

  toggleOrderSummary = () => {
    this.setState(prevState => ({
      isOrderSummaryOpen: !prevState.isOrderSummaryOpen
    }))
  }

  render() {
    const {
      ageVerified,
      basket,
      products,
      productsCategories,
      productsLoadError,
      saveError,
      saveRequired,
      saving,
      selectedCategory,
      showOrderConfirmationReceipt,
      toggleAgeVerificationPopUp,
    } = this.props
    const { filteredProducts, isOrderSummaryOpen } = this.state
    const categories = this.getCategories()

    return (
      <MarketPresentation
        ageVerified={ageVerified}
        basket={basket}
        categories={categories}
        filteredProducts={filteredProducts}
        getFilteredProducts={this.getFilteredProducts}
        isOrderSummaryOpen={isOrderSummaryOpen}
        onOrderSave={this.onOrderSave}
        products={products}
        productsCategories={productsCategories}
        productsLoadError={productsLoadError}
        saveError={saveError}
        saveRequired={saveRequired}
        saving={saving}
        selectedCategory={selectedCategory}
        showOrderConfirmationReceipt={showOrderConfirmationReceipt}
        toggleAgeVerificationPopUp={toggleAgeVerificationPopUp}
        toggleOrderSummary={this.toggleOrderSummary}
      />
    )
  }
}

Market.propTypes = propTypes
Market.defaultProps = defaultProps

export {
  Market
}
