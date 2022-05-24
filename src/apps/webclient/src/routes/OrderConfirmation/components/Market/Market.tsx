import { filterProductCategory } from 'actions/filters'
import { productsLoadRecipePairings } from 'actions/products'
import { trackPairingsData } from 'actions/tracking'
import { marketCategory } from 'actions/trackingKeys'
import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { List, Map } from 'immutable'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { basketUpdateProducts } from 'routes/Menu/actions/basket'
import { useIsBundlesEnabled } from 'routes/OrderConfirmation/hooks/useBundlesExperiment.hook'
import { getBasketOrderDetails, getBasketSaveRequired } from 'selectors/basket'
import {
  getCategoriesForNavBar,
  getProductsForMarket,
  getProductsLoadError,
} from 'selectors/products'
import { getBasket, getMenuRecipeIds, getProductCategories } from 'selectors/root'
import {
  getBasketSaveError,
  getBasketSavePending,
  getProductRecipePairingsPending,
} from 'selectors/status'
import {
  getProductsRecipePairingsWithStock,
  getProductRecipePairingsTotalProducts,
} from '../../selectors/recipePairings'
import type {
  Category,
  FilteredProducts,
  NavCategories,
  NavCategory,
  Order,
  Product,
  ProductRecipePairing,
  ProductRecipePairings,
  RecipeItem,
} from '../../types'
import {
  ALL_PRODUCTS_CATEGORY_NAME,
  ALL_PRODUCTS_CATEGORY_ID,
  PAIRINGS_CATEGORY_NAME,
  PAIRINGS_CATEGORY_ID,
  OCCASIONS_CATEGORY_NAME,
  OCCASIONS_CATEGORY_ID,
} from '../../constants/categories'
import { MarketPresentation } from './Market.presentation'

interface Props {
  ageVerified: boolean
  toggleAgeVerificationPopUp: () => void
}

export const getProductRecipePairings = (
  order: Order,
  productRecipePairings: ProductRecipePairings,
) => {
  const productRecipePairingsData = order
    .getIn(['recipeItems'], List([]))
    .map((recipeItem: RecipeItem) => {
      const productRecipePairing: Map<string, ProductRecipePairing> | undefined =
        productRecipePairings.get(recipeItem.get('recipeId') as unknown as string) as
          | Map<string, ProductRecipePairing>
          | undefined

      if (!productRecipePairing) {
        return false
      }

      const products: List<Product[]> =
        (productRecipePairing.get('products') as unknown as List<Product[]>) || List([])

      if (products.size <= 0) {
        return false
      }

      return {
        recipeId: recipeItem.get('recipeId'),
        title: recipeItem.get('title'),
        media: recipeItem.get('media'),
        products,
      }
    })
    .filter(Boolean)

  return productRecipePairingsData
}

const Market: FC<Props> = (props) => {
  const dispatch = useDispatch()

  const [filteredProducts, setFilteredProducts] = useState<FilteredProducts | Product[] | null>(
    null,
  )
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const isOrderConfirmation = true
  const [productRecipePairingData, setProductRecipePairingData] = useState(List([]))
  const bundlesExperimentEnabled = useIsBundlesEnabled()

  // Pairing experiment
  const [experimentCategories, setExperimentCategories] = useState<NavCategories | undefined>(
    undefined,
  )
  const [userHasPairings, setUserHasPairings] = useState<boolean | undefined>(undefined)

  const basket = useSelector(getBasket)
  const categoriesForNavBar: NavCategories = useSelector(getCategoriesForNavBar)
  const products = useSelector(getProductsForMarket)
  const productsCategories = useSelector(getProductCategories)
  const productsLoadError = useSelector(getProductsLoadError)
  const basketSaveError = useSelector(getBasketSaveError)
  const basketSaveRequired = useSelector(getBasketSaveRequired)
  const basketSavePending = useSelector(getBasketSavePending)
  const order = useSelector(getBasketOrderDetails)
  const productRecipePairings = useSelector(getProductsRecipePairingsWithStock)
  const productRecipePairingsTotalProducts = useSelector(getProductRecipePairingsTotalProducts)
  const productRecipePairingsPending = useSelector(getProductRecipePairingsPending)
  const menuRecipeIds = useSelector(getMenuRecipeIds)

  const pairingsExperimentEnabled = useIsOptimizelyFeatureEnabled(
    userHasPairings ? 'etm_market_orderconfirmation_addingpairings_web_apr22' : null,
  )

  const [trackingCategoryTitle, setTrackingCategoryTitle] = useState<string>(
    ALL_PRODUCTS_CATEGORY_NAME,
  )

  useEffect(() => {
    if (menuRecipeIds.size > 0 && order !== false) {
      const menuStartDate = order.getIn(['period', 'whenStart']) as string | undefined
      dispatch(productsLoadRecipePairings(menuRecipeIds.toJS(), menuStartDate))
    }
  }, [menuRecipeIds, order, dispatch])

  useEffect(() => {
    if (
      productRecipePairingsPending === false &&
      Map.isMap(productRecipePairings) &&
      order !== false
    ) {
      if (productRecipePairings.size > 0) {
        setUserHasPairings(true)
      } else {
        setUserHasPairings(false)
      }
    } else {
      setUserHasPairings(false)
    }
  }, [productRecipePairings, productRecipePairingsPending, order])

  useEffect(() => {
    if (pairingsExperimentEnabled === true) {
      setProductRecipePairingData(getProductRecipePairings(order, productRecipePairings))

      if (productRecipePairingData.size > 0 && productRecipePairingsTotalProducts > 0) {
        dispatch(
          trackPairingsData(productRecipePairingsTotalProducts, productRecipePairingData.size),
        )

        const pairings: NavCategories = {
          pairings: {
            id: PAIRINGS_CATEGORY_ID,
            label: PAIRINGS_CATEGORY_NAME,
            count: productRecipePairingsTotalProducts,
          },
        }
        setExperimentCategories({ ...pairings, ...categoriesForNavBar })
      }
    }
  }, [
    pairingsExperimentEnabled,
    productRecipePairings,
    order,
    productRecipePairingsTotalProducts,
    categoriesForNavBar,
    productRecipePairingData?.size,
    dispatch,
  ])

  useEffect(() => {
    if (pairingsExperimentEnabled === false) {
      setIsLoading(false)
    } else if (
      pairingsExperimentEnabled === true &&
      userHasPairings === true &&
      productRecipePairingsTotalProducts > 0
    ) {
      setTrackingCategoryTitle(PAIRINGS_CATEGORY_NAME)
      setIsLoading(false)
    } else if (
      (pairingsExperimentEnabled === true || pairingsExperimentEnabled === null) &&
      (userHasPairings === true || userHasPairings === false)
    ) {
      setIsLoading(false)
    }
  }, [productRecipePairingsTotalProducts, pairingsExperimentEnabled, userHasPairings])

  useEffect(() => {
    if (bundlesExperimentEnabled && pairingsExperimentEnabled === false) {
      const occasions: NavCategories = {
        occasions: { id: OCCASIONS_CATEGORY_ID, label: OCCASIONS_CATEGORY_NAME, count: 3 },
      }
      setExperimentCategories({ ...occasions, ...categoriesForNavBar })
      setTrackingCategoryTitle(OCCASIONS_CATEGORY_NAME)
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
      trackingCategory={trackingCategoryTitle}
      productRecipePairings={productRecipePairingData}
      isLoading={isLoading}
    />
  )
}

export { Market }
