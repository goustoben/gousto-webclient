import React, { useEffect, useState } from 'react'

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

import {
  ALL_PRODUCTS_CATEGORY_NAME,
  ALL_PRODUCTS_CATEGORY_ID,
  OCCASIONS_CATEGORY_NAME,
  OCCASIONS_CATEGORY_ID,
} from '../../constants/categories'
import { ProductNavBarProvider } from '../../context/productsNavBarContext'
import { useIsBundlesEnabled } from '../../hooks/useBundlesExperiment.hook'
import { getBundles } from '../../productBundles/utils'
import { getOrderWhenStartDateFormatted } from '../../selectors/orderDetails'
import type { Category, FilteredProducts, NavCategories, NavCategory } from '../../types'
import { MarketPresentation } from './Market.presentation'

interface Props {
  ageVerified: boolean
  toggleAgeVerificationPopUp: () => void
}

const Market = (props: Props) => {
  const dispatch = useDispatch()

  const [filteredProducts, setFilteredProducts] = useState<FilteredProducts | null>(null)
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState<boolean>(false)
  const [trackingCategoryTitle, setTrackingCategoryTitle] = useState<string>(
    ALL_PRODUCTS_CATEGORY_NAME,
  )
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const isOrderConfirmation = true

  const bundlesExperimentEnabled = useIsBundlesEnabled()
  const [experimentCategories, setExperimentCategories] = useState<NavCategories | undefined>(
    undefined,
  )

  const [bundlesProducts, setBundlesProducts] = useState<any>(null)

  const basket = useSelector(getBasket)
  const categoriesForNavBar: NavCategories = useSelector(getCategoriesForNavBar)
  const products = useSelector(getProductsForMarket)
  const productsCategories = useSelector(getProductCategories)
  const productsLoadError = useSelector(getProductsLoadError)
  const basketSaveError = useSelector(getBasketSaveError)
  const basketSaveRequired = useSelector(getBasketSaveRequired)
  const basketSavePending = useSelector(getBasketSavePending)
  const order = useSelector(getBasketOrderDetails)
  const orderWhenStartDate = useSelector(getOrderWhenStartDateFormatted)

  useEffect(() => {
    if (bundlesExperimentEnabled !== null) setIsLoading(false)
    if (bundlesExperimentEnabled) {
      const productBundles = getBundles(orderWhenStartDate)
      if (productBundles.length > 0) {
        const occasions: NavCategories = {
          occasions: {
            id: OCCASIONS_CATEGORY_ID,
            label: OCCASIONS_CATEGORY_NAME,
            count: productBundles.length,
          },
        }
        setExperimentCategories({ ...occasions, ...categoriesForNavBar })
        setTrackingCategoryTitle(OCCASIONS_CATEGORY_NAME)
        setBundlesProducts(productBundles)
      }
    }
  }, [bundlesExperimentEnabled, categoriesForNavBar, orderWhenStartDate])

  const toggleOrderSummary = () => {
    setIsOrderSummaryOpen(!isOrderSummaryOpen)
  }

  const onOrderSave = () => {
    dispatch(basketUpdateProducts(isOrderConfirmation))
  }

  const getFilteredProducts = (categoryId: string) => {
    const selectedFilterCategory: NavCategory = experimentCategories
      ? experimentCategories[categoryId]
      : categoriesForNavBar[categoryId]

    if (!Object.keys(products).length || !selectedFilterCategory) return

    let chosenCategoryProducts: FilteredProducts = {}

    setTrackingCategoryTitle(selectedFilterCategory.label)

    if (categoryId === ALL_PRODUCTS_CATEGORY_ID) {
      chosenCategoryProducts = products
    } else {
      Object.keys(products).forEach((productId) => {
        const productCategories = products[productId].categories

        if (productCategories) {
          productCategories.forEach((category: Category) => {
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
    <ProductNavBarProvider>
      <MarketPresentation
        ageVerified={ageVerified}
        basket={basket}
        categoriesForNavBar={experimentCategories || categoriesForNavBar}
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
        bundlesProducts={bundlesProducts}
        trackingCategory={trackingCategoryTitle}
        isLoading={isLoading}
      />
    </ProductNavBarProvider>
  )
}

export { Market }
