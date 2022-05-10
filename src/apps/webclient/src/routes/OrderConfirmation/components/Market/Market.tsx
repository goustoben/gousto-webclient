import { filterProductCategory } from 'actions/filters'
import { productsLoadRecipePairings } from 'actions/products'
import { trackPairingsData } from 'actions/tracking'
import { useIsOptimizelyFeatureEnabled } from 'containers/OptimizelyRollouts'
import { List, Map } from 'immutable'
import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { basketUpdateProducts } from 'routes/Menu/actions/basket'
import { getBasketOrderDetails, getBasketSaveRequired } from 'selectors/basket'
import {
  getCategoriesForNavBar,
  getProductsForMarket,
  getProductsLoadError,
  getProductsRecipePairings,
} from 'selectors/products'
import { getBasket, getMenuRecipeIds, getProductCategories } from 'selectors/root'
import {
  getBasketSaveError,
  getBasketSavePending,
  getProductRecipePairingsPending,
} from 'selectors/status'
import type {
  Category,
  FilteredProducts,
  NavCategories,
  NavCategory,
  Product,
  ProductRecipePairings,
  ProductRecipePairing,
  Order,
  RecipeItem,
} from '../../types'
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

const getProductsFromRecipePairings = (recipePairings: List<ProductRecipePairing>) => {
  const products = recipePairings
    .toArray()
    .reduce(
      (acc: any[], recipePairing: any) => [...acc, ...recipePairing.get('products').toJS()],
      [],
    )

  return products
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

  // Pairing experiment
  const [pairingsExperimentCategories, setPairingsExperimentCategories] = useState<
    NavCategories | undefined
  >(undefined)
  const [pairingsExperimentProducts, setPairingsExperimentProducts] = useState<Product[]>([])
  const [showPairings, setShowPairings] = useState<boolean>(false)
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
  const productRecipePairings = useSelector(getProductsRecipePairings)
  const productRecipePairingsPending = useSelector(getProductRecipePairingsPending)
  const menuRecipeIds = useSelector(getMenuRecipeIds)

  const pairingsExperimentEnabled = useIsOptimizelyFeatureEnabled(
    userHasPairings ? 'etm_market_orderconfirmation_addingpairings_web_apr22' : null,
  )
  const [trackingCategoryTitle, setTrackingCategoryTitle] = useState<string>(
    pairingsExperimentEnabled ? 'Pairings' : 'All Products',
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
      setPairingsExperimentProducts(getProductsFromRecipePairings(productRecipePairings))

      if (productRecipePairingData.size > 0) {
        dispatch(
          trackPairingsData(pairingsExperimentProducts.length, productRecipePairingData.size),
        )

        const pairings: NavCategories = {
          pairings: {
            id: 'pairings',
            label: 'Pairings',
            count: pairingsExperimentProducts.length,
          },
        }
        setPairingsExperimentCategories({ ...pairings, ...categoriesForNavBar })
        setShowPairings(true)
      }
    }
  }, [
    pairingsExperimentEnabled,
    productRecipePairings,
    order,
    pairingsExperimentProducts.length,
    categoriesForNavBar,
    productRecipePairingData?.size,
    dispatch,
  ])

  useEffect(() => {
    if (pairingsExperimentEnabled === false) {
      setIsLoading(false)
    } else if (
      pairingsExperimentEnabled === true &&
      showPairings === true &&
      pairingsExperimentProducts.length > 0
    ) {
      setIsLoading(false)
    } else if (
      (pairingsExperimentEnabled === true || pairingsExperimentEnabled === null) &&
      showPairings === false &&
      (userHasPairings === true || userHasPairings === false)
    ) {
      setIsLoading(false)
    }
  }, [pairingsExperimentProducts.length, pairingsExperimentEnabled, showPairings, userHasPairings])

  const toggleOrderSummary = () => {
    setIsOrderSummaryOpen(!isOrderSummaryOpen)
  }

  const onOrderSave = () => {
    dispatch(basketUpdateProducts(isOrderConfirmation))
  }

  const getFilteredProducts = (categoryId: string) => {
    const selectedFilterCategory: NavCategory = pairingsExperimentCategories
      ? pairingsExperimentCategories[categoryId]
      : categoriesForNavBar[categoryId]

    if (!Object.keys(products).length || !selectedFilterCategory) return

    let chosenCategoryProducts: FilteredProducts | Product[] = {}

    setTrackingCategoryTitle(selectedFilterCategory.label)

    if (categoryId === 'all-products') {
      chosenCategoryProducts = products
      setShowPairings(false)
    } else if (categoryId === 'pairings') {
      chosenCategoryProducts = pairingsExperimentProducts
      setShowPairings(true)
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
      setShowPairings(false)
    }

    const numOfProducts = Object.keys(chosenCategoryProducts).length

    dispatch(
      filterProductCategory(
        'market_category',
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
      categoriesForNavBar={pairingsExperimentCategories || categoriesForNavBar}
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
      showPairings={showPairings}
      trackingCategory={trackingCategoryTitle}
      productRecipePairings={productRecipePairingData}
      isLoading={isLoading}
    />
  )
}

export { Market }
