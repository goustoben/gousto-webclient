import React from 'react'

import { render, screen } from '@testing-library/react'

import { DeliveryDate } from '../DeliveryDate'
import { useGetDeliveryData } from '../deliveryDateHooks'

const mockedDate = 'Thursday 6th July'
const mockedSlots = '10AM - 11AM'
jest.mock('../deliveryDateHooks')
const useGetDeliveryDataMock = jest.mocked(useGetDeliveryData)

describe('Given: DeliveryDate component', () => {
  describe('When: user lands on any checkout step and component being rendered', () => {
    beforeEach(() => {
      useGetDeliveryDataMock.mockReturnValue({
        formattedDate: mockedDate,
        formattedSlots: mockedSlots,
      })
      render(<DeliveryDate />)
    })
    afterEach(() => jest.clearAllMocks)

    test('Then: user should observe correct delivery date and slots', () => {
      expect(screen.getByText(mockedDate)).toBeDefined()
      expect(screen.getByText(mockedSlots)).toBeDefined()
    })
  })
})
