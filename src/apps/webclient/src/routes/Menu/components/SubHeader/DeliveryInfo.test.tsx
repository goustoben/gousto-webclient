import React from 'react'
import { render, screen } from '@testing-library/react'
import { DeliveryInfo } from './DeliveryInfo'

describe('DeliveryInfo', () => {
  test('it should render DeliveryInfo', () => {
    render(<DeliveryInfo mobile={false} />)
    expect(screen.queryByText(/About Delivery/)).toBeTruthy()
  })
})
