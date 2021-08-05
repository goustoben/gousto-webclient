import React from 'react'
import { useSides } from 'routes/Menu/apis/sides.hook'
import { ResourceType } from 'routes/Menu/constants/resources'
import {SIDES, MAX_PRODUCTS_PER_BOX, LimitType} from '../../constants/products'

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
  const components = order.data.relationships.components.data

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
  const categoryLimit = side.categories[0].box_limit

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

export const useSidesBasket = (accessToken, userId, order, onSubmitCallback, onError) => {
  const productsInOrder = getProductsInOrder(order)
  const [selectedProducts, setSelectedProducts] = React.useState(productsInOrder)
  const { data } = useSides({ accessToken, userId, order }, { onError })

  const sides = data ? data.data : []
  const total = getTotal(sides, selectedProducts)
  const getQuantityForSidesBasket = (id) => selectedProducts[id] || 0
  const updateSidesQuantity = makeUpdateSidesQuantity(selectedProducts, setSelectedProducts)
  const addSide = (id) => updateSidesQuantity(id, getQuantityForSidesBasket(id) + 1)
  const removeSide = (id) => updateSidesQuantity(id, getQuantityForSidesBasket(id) - 1)
  const onSubmit = () => onSubmitCallback(selectedProducts)

  // Limits and Stock
  const totalQuantityOfProducts = Object.values(selectedProducts).reduce(sum, 0)
  const totalQuantityOfSides = sides
    .map(({ id }) => (selectedProducts[id] || 0))
    .reduce(sum, 0)
  const maxProductsPerBox = data ? data.meta.max_products_per_box : MAX_PRODUCTS_PER_BOX
  const getSide = (id) => sides.find((s) => s.id === id)

  const isOutOfStock = (id) => {
    const quantityforOrder = productsInOrder[id] || 0
    const quantityForBasket = getQuantityForSidesBasket(id)
    const quantityRequiringStock = quantityForBasket - quantityforOrder
    const {stock} = getSide(id)

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
    sides,
    onSubmit,
    total,
    addSide,
    removeSide,
    getQuantityForSidesBasket,
    isOutOfStock,
    getLimit,
  }
}
