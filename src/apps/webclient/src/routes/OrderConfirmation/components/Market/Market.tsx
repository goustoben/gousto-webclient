import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { filterProductCategory } from 'actions/filters'
import { trackPairingsData } from 'actions/tracking'
import { marketCategory } from 'actions/trackingKeys'
import { basketUpdateProducts } from 'routes/Menu/actions/basket'
import { useIsBundlesEnabled } from 'routes/OrderConfirmation/hooks/useBundlesExperiment.hook'
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
  PAIRINGS_CATEGORY_NAME,
  PAIRINGS_CATEGORY_ID,
  OCCASIONS_CATEGORY_NAME,
  OCCASIONS_CATEGORY_ID,
} from '../../constants/categories'
import { useIsPairingsEnabled } from '../../hooks/usePairingsExperiment'
import {
  getProductsRecipePairingsWithRecipes,
  getProductRecipePairingsTotalProducts,
} from '../../selectors/recipePairings'
import type { Category, FilteredProducts, NavCategories, NavCategory, Product } from '../../types'
import { MarketPresentation } from './Market.presentation'
import { mockBundlesData } from '../config'

interface Props {
  ageVerified: boolean
  toggleAgeVerificationPopUp: () => void
}

const Market = (props: Props) => {
  const dispatch = useDispatch()

  const [filteredProducts, setFilteredProducts] = useState<FilteredProducts | Product[] | null>(
    null,
  )
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState<boolean>(false)
  const [trackingCategoryTitle, setTrackingCategoryTitle] = useState<string>(
    ALL_PRODUCTS_CATEGORY_NAME,
  )
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const isOrderConfirmation = true

  const pairingsExperimentEnabled = useIsPairingsEnabled()
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
  const productRecipePairings = useSelector(getProductsRecipePairingsWithRecipes)
  const productRecipePairingsTotalProducts = useSelector(getProductRecipePairingsTotalProducts)

  useEffect(() => {
    if (
      pairingsExperimentEnabled === true &&
      productRecipePairings.size > 0 &&
      productRecipePairingsTotalProducts > 0
    ) {
      dispatch(trackPairingsData(productRecipePairingsTotalProducts, productRecipePairings.size))

      const pairings: NavCategories = {
        pairings: {
          id: PAIRINGS_CATEGORY_ID,
          label: PAIRINGS_CATEGORY_NAME,
          count: productRecipePairingsTotalProducts,
        },
      }
      setExperimentCategories({ ...pairings, ...categoriesForNavBar })
    }
  }, [
    pairingsExperimentEnabled,
    productRecipePairingsTotalProducts,
    categoriesForNavBar,
    productRecipePairings?.size,
    dispatch,
  ])

  useEffect(() => {
    if (pairingsExperimentEnabled === true) {
      setTrackingCategoryTitle(PAIRINGS_CATEGORY_NAME)
    }

    if (pairingsExperimentEnabled !== null && bundlesExperimentEnabled !== null) {
      setIsLoading(false)
    }
  }, [pairingsExperimentEnabled, bundlesExperimentEnabled])

  useEffect(() => {
    if (bundlesExperimentEnabled && pairingsExperimentEnabled === false) {
      const occasions: NavCategories = {
        occasions: { id: OCCASIONS_CATEGORY_ID, label: OCCASIONS_CATEGORY_NAME, count: 3 },
      }
      setExperimentCategories({ ...occasions, ...categoriesForNavBar })
      setTrackingCategoryTitle(OCCASIONS_CATEGORY_NAME)
      setBundlesProducts(mockBundlesData)
    }
  }, [bundlesExperimentEnabled, pairingsExperimentEnabled, categoriesForNavBar])

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
    let numOfProducts = 0

    setTrackingCategoryTitle(selectedFilterCategory.label)

    if (categoryId === ALL_PRODUCTS_CATEGORY_ID) {
      chosenCategoryProducts = products
      numOfProducts = Object.keys(products).length
    } else if (categoryId === PAIRINGS_CATEGORY_ID) {
      numOfProducts = productRecipePairingsTotalProducts
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
        numOfProducts = Object.keys(chosenCategoryProducts).length
      })
    }

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
      productRecipePairings={productRecipePairings}
      isLoading={isLoading}
    />
  )
}

export { Market }
