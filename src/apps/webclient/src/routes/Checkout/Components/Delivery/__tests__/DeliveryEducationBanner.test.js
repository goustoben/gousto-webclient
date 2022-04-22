import React from 'react'
import { render, screen } from '@testing-library/react'
import { DeliveryEducationBanner } from '../DeliveryEducationBanner'

describe('DeliveryEducationBanner', () => {
  beforeEach(() => {
    render(<DeliveryEducationBanner />)
  })

  test('should renders properly', () => {
    expect(
      screen.queryByText(/Insulated packaging keeps your ingredients fresh for up to 12 hours./i),
    ).toBeInTheDocument()
    expect(
      screen.queryByText(/Delivery slot updates on the day via text and email./i),
    ).toBeInTheDocument()
  })
})
