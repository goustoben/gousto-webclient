import React from 'react'
import { getSidesForOrder } from 'routes/Menu/apis/sides'

// Note: this method should be replaced with `Object.fromEntries` when supported
const fromEntriesReduce = (memo, [key, value]) => ({
  ...memo,
  [key]: value,
})

export const useSidesBasket = (sides, modalOnSubmit) => {
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
    modalOnSubmit(cleanSelectedProducts)
  }

  return { onSubmit, total, addSide, removeSide, getQuantityForSide }
}

export const useSides = (onError, accessToken, userId, order, isOpen) => {
  const [sides, setSides] = React.useState(null)
  const shouldMakeRequest = Boolean(accessToken && userId && isOpen)

  React.useEffect(() => {
    if (!shouldMakeRequest) {
      return
    }

    const loadSides = async () => {
      const [response, error] = await getSidesForOrder(accessToken, order, userId)

      if (error) {
        onError(error)

        return
      }

      setSides(response)
    }

    loadSides()
  }, [onError, accessToken, userId, order, isOpen, shouldMakeRequest])

  return sides
}
