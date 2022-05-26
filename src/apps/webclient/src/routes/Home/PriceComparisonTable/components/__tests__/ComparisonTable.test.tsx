import React from 'react'

import { render, screen, fireEvent } from '@testing-library/react'

import { ComparisonTable } from 'routes/Home/PriceComparisonTable/components/ComparisonTable/ComparisonTable'
import { comparisonTableTexts, TABLE_DATA } from 'routes/Home/PriceComparisonTable/constants'

const dispatchMock = jest.fn()

jest.mock('react-redux', () => ({
  useDispatch: () => dispatchMock,
}))

describe('PriceComparisonTable: Table', () => {
  beforeEach(() => {
    render(<ComparisonTable items={TABLE_DATA} />)
  })

  test('Table header should be presented', () => {
    expect(screen.getByTestId('ComparisonTable_Heading')).toHaveTextContent(
      comparisonTableTexts.tableHeading,
    )
  })

  test('Click on table header should fire event', () => {
    fireEvent(
      screen.getByTestId('ComparisonTable_HeadingContainer'),
      new MouseEvent('click', {
        bubbles: true,
      }),
    )
    expect(dispatchMock).toHaveBeenCalled()
  })

  test('Table content should be presented', () => {
    expect(screen.getByTestId('ComparisonTable_Content')).toBeDefined()
  })

  test('Table footer should be presented', () => {
    expect(screen.getByTestId('ComparisonTable_Footer')).toHaveTextContent(
      `${comparisonTableTexts.tableFooter} ${comparisonTableTexts.tableFooterImportant}`,
    )
  })
})
