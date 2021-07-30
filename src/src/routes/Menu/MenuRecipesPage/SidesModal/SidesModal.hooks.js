import React from 'react'
import { useSides } from 'routes/Menu/apis/sides.hook'

// Note: this method should be replaced with `Object.fromEntries` when supported
const fromEntriesReduce = (memo, [key, value]) => ({
  ...memo,
  [key]: value,
})

export const useSidesBasket = (accessToken, userId, order, onSubmitCallback, onError) => {
  const { data } = useSides({ accessToken, userId, order }, { onError })
  const sides = data ? data.data : []

  const [selectedProducts, setSelectedProducts] = React.useState({})
  const getQuantityForSide = (id) => selectedProducts[id] || 0
  const incrementSide = (id, increment) => setSelectedProducts({
    ...selectedProducts,
    ...{ [id]: getQuantityForSide(id) + increment },
  })
  const addSide = (id) => incrementSide(id, 1)
  const removeSide = (id) => incrementSide(id, -1)
  const sideEntries = Object.entries(selectedProducts)
  const getSidePrice = (id) => sides.find(side => side.id === id).list_price
  const total = sideEntries.reduce((memo, [id, qnt]) => getSidePrice(id) * qnt + memo, 0)
  const onSubmit = () => {
    const cleanSelectedProducts = Object.entries(selectedProducts).filter(([, value]) => Boolean(value)).reduce(fromEntriesReduce, {})
    onSubmitCallback(cleanSelectedProducts)
  }

  return { sides, onSubmit, total, addSide, removeSide, getQuantityForSide }
}
