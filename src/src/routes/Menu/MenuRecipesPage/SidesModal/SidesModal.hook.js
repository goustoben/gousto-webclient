import React from 'react'
import { ResourceType } from 'routes/Menu/constants/resources'
import { SIDES, MAX_PRODUCTS_PER_BOX, LimitType } from '../../constants/products'
import { updateOrderItems } from "apis/orders/updateOrderItems"
import { useSides } from "routes/Menu/apis/sides.hook/useSides"

// Note: this method should be replaced with `Object.fromEntries` when supported
const fromEntriesReduce = (obj, [key, value]) => ({
  ...obj,
  [key]: value,
})

const sum = (total, value) => total + value

// This method remove keys from the object that are null/0/-0/false/undefined/''
const removeFalsyValuesFromObject = (object) => Object
  .entries(object)
  .filter(([, value]) => Boolean(value))
  .reduce(fromEntriesReduce, {})

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

const makeUpdateSidesQuantity = (selectedProducts, setSelectedProducts) =>
  (id, quantity) => {
    const objectWithUpdateSide = { [id]: quantity }
    const updatedSides = removeFalsyValuesFromObject({
      ...selectedProducts,
      ...objectWithUpdateSide,
    })

    setSelectedProducts(updatedSides)
  }

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

const getProductsForUpdateProductsV1 = (selectedProducts) => {
  const productData = Object.entries(selectedProducts).map(([id, quantity]) => ({
    id,
    quantity,
    type: 'Product',
  }))

  return {
    item_choices: productData,
    restrict: 'Product',
  }
}

export const useSidesBasket = ({
  accessToken,
  userId,
  order,
  onSubmitCallback,
  isOpen,
  trackAddSide,
  trackSidesContinueClicked,
}) => {
  const productsInOrder = React.useMemo(() => getProductsInOrder(order), [order])
  const [selectedProducts, setSelectedProducts] = React.useState(productsInOrder)
  const [isSubmitting, setSubmitting] = React.useState(false)
  const { data } = useSides({
    accessToken,
    userId,
    order: { data: order },
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
  const total = getTotal(sides, selectedProducts)
  const getQuantityForSidesBasket = (id) => selectedProducts[id] || 0
  const updateSidesQuantity = makeUpdateSidesQuantity(selectedProducts, setSelectedProducts)
  const addSide = (id) => {
    trackAddSide(id, order.id)
    updateSidesQuantity(id, getQuantityForSidesBasket(id) + 1)
  }
  const removeSide = (id) => updateSidesQuantity(id, getQuantityForSidesBasket(id) - 1)

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

  const onSubmit = async (e) => {
    e.preventDefault()

    if (isSubmitting) return

    setSubmitting(true)

    const sidesIds = sides
      .map(({ id }) => id)
      .filter((id) => Boolean(selectedProducts[id]))

    try {
      await updateOrderItems(
        accessToken,
        order.id,
        getProductsForUpdateProductsV1(selectedProducts)
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
      setSelectedProducts(productsInOrder)
    }
  }, [isOpen, productsInOrder])

  return {
    sides,
    onSubmit,
    total,
    addSide,
    removeSide,
    getQuantityForSidesBasket,
    isOutOfStock,
    getLimit,
    isSubmitting,
  }
}
