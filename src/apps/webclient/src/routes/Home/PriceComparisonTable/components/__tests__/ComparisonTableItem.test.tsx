import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  ComparisonTableItem,
  ItemImage,
} from 'routes/Home/PriceComparisonTable/components/ComparisonTableItem/ComparisonTableItem'
import { TABLE_DATA } from 'routes/Home/PriceComparisonTable/constants'
import { TableItemType } from 'routes/Home/PriceComparisonTable/enums'

const [gousto, helloFresh, mindfulChef] = TABLE_DATA

describe('PriceComparison Table: Table Item', () => {
  test('Should render gousto item', () => {
    render(<ComparisonTableItem item={gousto} />)
    expect(screen.getByRole('img', { name: 'gousto logo' })).toBeDefined()
    expect(screen.getByRole('heading')).toHaveTextContent(`${gousto.currency}${gousto.price}`)
    expect(screen.getByText(/per box/i)).toBeDefined()
    expect(screen.getByText(/best value/i)).toBeDefined()
  })

  test('Should render hello fresh item', () => {
    render(<ComparisonTableItem item={helloFresh} />)
    expect(screen.getByRole('img', { name: 'hello fresh logo' })).toBeDefined()
    expect(screen.getByRole('heading')).toHaveTextContent(
      `${helloFresh.currency}${helloFresh.price}`,
    )
    expect(screen.getByText(/per box/i)).toBeDefined()
    expect(
      screen.getByText(
        new RegExp(`pay up to ${helloFresh.currency}${helloFresh.priceDiff} more`, 'i'),
      ),
    ).toBeDefined()
  })

  test('Should render midful chef item', () => {
    render(<ComparisonTableItem item={mindfulChef} />)
    expect(screen.getByRole('img', { name: 'mindful chef logo' })).toBeDefined()
    expect(screen.getByRole('heading')).toHaveTextContent(
      `${mindfulChef.currency}${mindfulChef.price}`,
    )
    expect(screen.getByText(/per box/i)).toBeDefined()
    expect(
      screen.getByText(
        new RegExp(`pay up to ${mindfulChef.currency}${mindfulChef.priceDiff} more`, 'i'),
      ),
    ).toBeDefined()
  })

  describe('ItemImage component', () => {
    test('Should cover <ItemImage /> default case', () => {
      /**
       * FYI: default case in component required by linter
       * Passing value not matching enum in arg can't be done w/o following hack
       */
      const itemTypeFake: unknown = 'notPossibleItemType'
      render(<ItemImage type={itemTypeFake as TableItemType} />)
      expect(screen.getByRole('img', { name: 'price comparison table item logo' })).toBeDefined()
    })
  })
})
