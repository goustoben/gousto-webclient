/* eslint-disable no-param-reassign */
import React from 'react'
import create from 'zustand'
import produce from 'immer'
import { usePostSides, updateProducts } from 'routes/Menu/apis/sides.hook'
import { ResourceType } from 'routes/Menu/constants/resources'
import { SIDES, MAX_PRODUCTS_PER_BOX, LimitType } from '../../constants/products'
import {
  trackSidesContinueClicked,
  trackAddSide,
  trackCloseSidesAllergens,
  trackViewSidesAllergens,
} from './tracking'

// Setup basket store
const useSidesBasketStore = create(set => ({
  products: {},
  resetProducts: (products) => set({ products }),
  addProduct: (id) => set(produce(state => {
    state.products[id] = (state.products[id] || 0) + 1
  })),
  removeProduct: (id) => set(produce(state => {
    state.products[id] = (state.products[id] || 0) - 1
    if (state.products[id] === 0) {
      delete state.products[id]
    }
  })),
})
)

const sum = (total, value) => total + value

const getProductsInOrder = (order) => {
  const components = order.relationships.components.data

  return components
    .filter(({ type }) => type === ResourceType.Product)
    .reduce(
      (products, { id, meta: { quantity } }) => ({
        ...products,
        [id]: (products[id] || 0 ) + quantity
      }), {})
}

const getTotal = (sides, selectedProducts) =>
  sides
    .map(({ id, list_price: listPrice }) => listPrice * (selectedProducts[id] || 0))
    .reduce(sum, 0)

const getLimitsForProduct = (quantity, side, totalQuantityOfProducts, totalQuantityOfSides, maxProductsPerBox) => {
  const sideLimit = side.box_limit
  const category = side.categories.find(c => c.title === SIDES) || {}
  const categoryLimit = category.box_limit || 0

  if (totalQuantityOfSides >= categoryLimit) {
    return { type: LimitType.Category, value: SIDES}
  }

  if (totalQuantityOfProducts >= maxProductsPerBox) {
    return { type: LimitType.Box, value: SIDES}
  }

  if (quantity >= sideLimit) {
    return { type: LimitType.Item, value: SIDES}
  }

  return false
}

const getProductsForUpdateProductsV1 = (state) => {
  const productData = Object.entries(state.products).map(([id, quantity]) => ({
    id,
    quantity,
    type: 'Product',
  }))

  return {
    item_choices: productData,
    restrict: 'Product',
  }
}

export const useSidesBasketModal = ({
  order,
  onSubmitCallback,
  isOpen,
}) => {
  const selectedProducts = useSidesBasketStore((state) => state.products)
  const resetProducts = useSidesBasketStore((state) => state.resetProducts)
  const productsInOrder = React.useMemo(() => getProductsInOrder(order), [order])
  const productsToUpdateV1 = useSidesBasketStore(getProductsForUpdateProductsV1)
  const [isSubmitting, setSubmitting] = React.useState(false)
  const { data } = usePostSides({
    order,
    makeRequest: isOpen
  }, {
    onError: () => onSubmitCallback('sides-modal-without-sides', null),
    onSuccess: (request) => {
      const sides = request.data
      // If no sides are returned selected sides
      if (sides.length === 0) {
        onSubmitCallback('sides-modal-without-sides', null)
      }
    }
  })
  const sides = data ? data.data : []
  const totalQuantityOfSides = sides
    .map(({ id }) => (selectedProducts[id] || 0))
    .reduce(sum, 0)
  const total = getTotal(sides, selectedProducts)

  const onSubmit = async (e) => {
    e.preventDefault()

    if (isSubmitting) return

    setSubmitting(true)

    const sidesIds = sides
      .map(({ id }) => id)
      .filter((id) => Boolean(selectedProducts[id]))

    try {
      await updateProducts(
        order.id,
        productsToUpdateV1,
      )
      trackSidesContinueClicked(sidesIds, total, totalQuantityOfSides)
      onSubmitCallback('sides-modal-with-sides', selectedProducts)
    } catch (e) {
      onSubmitCallback('sides-modal-failed-to-save-sides', null)
    }
  }

  React.useEffect(() => {
    if (!isOpen && isSubmitting) {
      setSubmitting(false)
    }
  }, [isOpen, isSubmitting, setSubmitting])

  React.useEffect(() => {
    if (isOpen) {
      resetProducts(productsInOrder)
    }
  }, [isOpen, productsInOrder, resetProducts])

  return {
    sides,
    hasSides: Boolean(sides.length),
    total,
    onSubmit,
    isSubmitting,
  }
}

export const useSidesBasketForSidesContent = (order) => {
  const { data } = usePostSides({ order })
  const sides = data ? data.data : []
  const selectedProducts = useSidesBasketStore((state) => state.products)
  const addProduct = useSidesBasketStore((state) => state.addProduct)
  const removeSide = useSidesBasketStore((state) => state.removeProduct)
  const productsInOrder = React.useMemo(() => getProductsInOrder(order), [order])
  const getQuantityForSidesBasket = (id) => selectedProducts[id] || 0
  const addSide = (id) => {
    trackAddSide(id, order.id)
    addProduct(id)
  }

  // Limits and Stock
  const totalQuantityOfProducts = Object.values(selectedProducts).reduce(sum, 0)
  const totalQuantityOfSides = sides
    .map(({ id }) => (selectedProducts[id] || 0))
    .reduce(sum, 0)
  const maxProductsPerBox = data ? data.meta.max_products_per_box : MAX_PRODUCTS_PER_BOX
  const getSide = (id) => sides.find((s) => s.id === id)

  const isOutOfStock = (id) => {
    const quantityForOrder = productsInOrder[id] || 0
    const quantityForBasket = getQuantityForSidesBasket(id)
    const quantityRequiringStock = quantityForBasket - quantityForOrder
    const { stock } = getSide(id)

    return quantityRequiringStock >= stock
  }

  const getLimit = (id) => getLimitsForProduct(
    getQuantityForSidesBasket(id),
    getSide(id),
    totalQuantityOfProducts,
    totalQuantityOfSides,
    maxProductsPerBox
  )

  return {
    addSide,
    getLimit,
    getQuantityForSidesBasket,
    isOutOfStock,
    removeSide,
    sides,
  }
}

export const useAllergenAndNutritionControl = (isOpen) => {
  const [show, setShow] = React.useState(false)
  const toggle = () => {
    if (show) {
      trackCloseSidesAllergens()
      setShow(false)
    } else {
      trackViewSidesAllergens()
      setShow(true)
    }
  }

  React.useEffect(() => {
    if (!isOpen && show) {
      setShow(false)
    }
  }, [show, setShow, isOpen])

  return [show, toggle]
}
