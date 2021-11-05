import * as React from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { Provider } from 'react-redux'
import Immutable from 'immutable'
import { basketChosenAddressChange, basketDateChange } from 'actions/basket'
import { createMockBasketStore } from './testing/createMockBasketStore'
import { useBasketDelivery } from './delivery'

describe('basket domain / delivery', () => {
  const slotId = '12345'
  const date = '2021-09-17'
  const chosenAddress = Immutable.Map({ id: 'aaaa-bbbb' })
  const postcode = 'W3 7UP'
  const store = createMockBasketStore({
    slotId,
    date,
    chosenAddress,
    postcode
  })

  const wrapper: React.FC = ({ children }) => <Provider store={store}>{children}</Provider>

  test('slotId contains slot id from store', () => {
    const { result } = renderHook(() => useBasketDelivery(), { wrapper })

    expect(result.current.slotId).toEqual(slotId)
  })

  test('deliveryDate contains delivery date from store', () => {
    const { result } = renderHook(() => useBasketDelivery(), { wrapper })

    expect(result.current.deliveryDate).toEqual(date)
  })

  test('deliveryAddressId contains chosen address id from store', () => {
    const { result } = renderHook(() => useBasketDelivery(), { wrapper })

    expect(result.current.deliveryAddressId).toEqual(chosenAddress.get('id'))
  })

  test('postcode contains postcode from store', () => {
    const { result } = renderHook(() => useBasketDelivery(), { wrapper })

    expect(result.current.postcode).toEqual(postcode)
  })

  test('changeSlotById dispatches basketSlotChange', () => {
    const { result } = renderHook(() => useBasketDelivery(), { wrapper })

    const newDate = '2020-12-25'

    result.current.changeDeliveryDate(newDate)

    expect(store.dispatch).toHaveBeenCalledWith(basketDateChange(newDate))
  })

  test('changeDeliveryAddress dispatches basketSlotChange', () => {
    const { result } = renderHook(() => useBasketDelivery(), { wrapper })

    const newAddress = Immutable.Map({ id: 'bbbbb-cccc'})

    result.current.changeDeliveryAddress(newAddress)

    expect(store.dispatch).toHaveBeenCalledWith(basketChosenAddressChange(newAddress))
  })
})
