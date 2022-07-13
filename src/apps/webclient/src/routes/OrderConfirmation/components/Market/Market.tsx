import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { filterProductCategory } from 'actions/filters'
import { marketCategory } from 'actions/trackingKeys'
import { basketUpdateProducts } from 'routes/Menu/actions/basket'
import { getBasketOrderDetails, getBasketSaveRequired } from 'selectors/basket'
import {
  getCategoriesForNavBar,
  getProductsForMarket,
  getProductsLoadError,
} from 'selectors/products'
import { getBasket, getProductCategories } from 'selectors/root'
import { getBasketSaveError, getBasketSavePending } from 'selectors/status'

import { ALL_PRODUCTS_CATEGORY_NAME, ALL_PRODUCTS_CATEGORY_ID } from '../../constants/categories'
import type { NavigationCategory, NavigationCategories } from '../../types/navigationCategory'
import type { ProductCategory } from '../../types/productCategory'
import type { Products } from '../../types/products'
import { MarketPresentation } from './Market.presentation'

type Props = {
  ageVerified: boolean
  toggleAgeVerificationPopUp: () => void
}

const Market = (props: Props) => {
  const dispatch = useDispatch()

  const [filteredProducts, setFilteredProducts] = useState<Products | null>(null)
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState<boolean>(false)
  const [trackingCategoryTitle, setTrackingCategoryTitle] = useState<string>(
    ALL_PRODUCTS_CATEGORY_NAME,
  )

  const basket = useSelector(getBasket)
  const categoriesForNavBar: NavigationCategories = useSelector(getCategoriesForNavBar)
  const products = useSelector(getProductsForMarket)
  const productsCategories = useSelector(getProductCategories)
  const productsLoadError = useSelector(getProductsLoadError)
  const basketSaveError = useSelector(getBasketSaveError)
  const basketSaveRequired = useSelector(getBasketSaveRequired)
  const basketSavePending = useSelector(getBasketSavePending)
  const order = useSelector(getBasketOrderDetails)

  const toggleOrderSummary = () => {
    setIsOrderSummaryOpen(!isOrderSummaryOpen)
  }

  const onOrderSave = () => {
    dispatch(basketUpdateProducts(true))
  }

  const getFilteredProducts = (categoryId: string) => {
    const selectedFilterCategory: NavigationCategory = categoriesForNavBar[categoryId]

    if (!Object.keys(products).length || !selectedFilterCategory) return

    let chosenCategoryProducts: Products = {}

    setTrackingCategoryTitle(selectedFilterCategory.label)

    if (categoryId === ALL_PRODUCTS_CATEGORY_ID) {
      chosenCategoryProducts = products
    } else {
      Object.keys(products).forEach((productId) => {
        const productCategories = products[productId].categories

        if (productCategories) {
          productCategories.forEach((category: ProductCategory) => {
            const productProps = products[productId]

            if (categoryId === category.id) {
              const product = { [productProps.id]: { ...productProps } }
              chosenCategoryProducts = { ...chosenCategoryProducts, ...product }
            }
          })
        }
      })
    }

    const numOfProducts = Object.keys(chosenCategoryProducts).length

    dispatch(
      filterProductCategory(
        marketCategory,
        'clicked',
        'secondary_action',
        selectedFilterCategory.label,
        numOfProducts,
        categoryId,
      ),
    )

    setFilteredProducts(chosenCategoryProducts)
  }

  const { ageVerified, toggleAgeVerificationPopUp } = props

  return (
    <MarketPresentation
      ageVerified={ageVerified}
      basket={basket}
      categoriesForNavBar={categoriesForNavBar}
      filteredProducts={filteredProducts}
      getFilteredProducts={getFilteredProducts}
      isOrderSummaryOpen={isOrderSummaryOpen}
      toggleOrderSummary={toggleOrderSummary}
      onOrderSave={onOrderSave}
      products={products}
      productsCategories={productsCategories}
      productsLoadError={productsLoadError}
      saveError={basketSaveError}
      saveRequired={basketSaveRequired}
      saving={basketSavePending}
      showOrderConfirmationReceipt={!!order}
      toggleAgeVerificationPopUp={toggleAgeVerificationPopUp}
      trackingCategory={trackingCategoryTitle}
    />
  )
}

export { Market }
