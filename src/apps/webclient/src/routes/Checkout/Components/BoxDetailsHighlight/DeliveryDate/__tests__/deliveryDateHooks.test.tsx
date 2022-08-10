import React from 'react'

import { renderHook } from '@testing-library/react-hooks'
import Immutable from 'immutable'
import moment from 'moment'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

import { getSlotTimes } from 'utils/deliveries'

import { useGetDeliveryData } from '../deliveryDateHooks'

jest.mock('utils/deliveries')
const getSlotTimesMock = jest.mocked(getSlotTimes)

const mockStore = configureStore()
const mockedStore = mockStore({
  boxSummaryDeliveryDays: Immutable.fromJS({}),
  basket: Immutable.fromJS({
    date: new Date(),
    slotId: 'fake-id-1',
  }),
})

type WrapperProps = { children: React.ReactNode }
const wrapper = ({ children }: WrapperProps) => <Provider store={mockedStore}>{children}</Provider>

describe('Given: useGetDeliveryDateData() hook', () => {
  describe('When: hook being called', () => {
    const slots = '10AM - 11AM'

    beforeEach(() => {
      getSlotTimesMock.mockReturnValue(slots)
    })
    afterEach(() => jest.clearAllMocks())

    test('Then: it should return valid formatted date and delivery slots with matching date', () => {
      const {
        result: { current: hookResult },
      } = renderHook(() => useGetDeliveryData(), { wrapper })

      const expectation = {
        formattedDate: moment(new Date()).format('dddd Do MMM'),
        formattedSlots: slots,
      }

      expect(hookResult).toStrictEqual(expectation)
    })
  })
})
