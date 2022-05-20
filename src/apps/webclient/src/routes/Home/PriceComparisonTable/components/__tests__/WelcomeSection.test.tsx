import React from 'react'
import { render, screen } from '@testing-library/react'
import { WelcomeSection } from 'routes/Home/PriceComparisonTable/components/WelcomeSection/WelcomeSection'
import { welcomeSectionTexts } from 'routes/Home/PriceComparisonTable/constants'

describe('PriceComparisonTable: WelcomeSection', () => {
  beforeEach(() => {
    render(<WelcomeSection />)
  })

  test('Heading and Subheading should be presented with correct text', () => {
    expect(screen.getByRole('heading')).toHaveTextContent(welcomeSectionTexts.heading)
  })

  test('Subheading should be presented with correct text', () => {
    expect(screen.getByTestId('Welcome_Subheading')).toBeDefined()
  })
})
