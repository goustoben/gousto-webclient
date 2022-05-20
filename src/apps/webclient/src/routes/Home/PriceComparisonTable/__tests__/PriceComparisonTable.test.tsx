import React from 'react'
import { render, screen } from '@testing-library/react'
import { PriceComparisonTable } from 'routes/Home/PriceComparisonTable/PriceComparisonTable'
import {
  welcomeSectionTexts,
  comparisonTableTexts,
} from 'routes/Home/PriceComparisonTable/constants'

jest.mock('react-redux', () => ({
  useDispatch: () => {},
}))

describe('PriceComparisonTable', () => {
  beforeEach(() => {
    render(<PriceComparisonTable />)
  })

  test('Welcome section texts and CTA should be defined', () => {
    expect(screen.getByText(welcomeSectionTexts.heading)).toBeDefined()
    expect(screen.getByText(welcomeSectionTexts.subheading)).toBeDefined()
    expect(screen.getByTestId('SignupCTAContainer')).toBeDefined()
  })

  test('Table section components should be defined', () => {
    expect(screen.getByText(comparisonTableTexts.tableHeading)).toBeDefined()
    expect(screen.getByText(comparisonTableTexts.tableFooter)).toBeDefined()
  })
})
