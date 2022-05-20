import React from 'react'
import { render, screen } from '@testing-library/react'
import { SignupCTA } from 'routes/Home/PriceComparisonTable/components/SignupCTA/SignupCTA'
import { CTAText } from 'routes/Home/PriceComparisonTable/constants'

describe('PriceComparisonTable: signupCTA', () => {
  beforeEach(() => {
    render(<SignupCTA />)
  })

  test('Should render SignupCTA', () => {
    expect(screen.getByRole('link')).toHaveTextContent(CTAText.discountText)
  })
})
