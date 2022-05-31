import React from 'react'

import { render, screen } from '@testing-library/react'

import { ProductListBundles } from '..'
import { TestBundle1, TestBundle2 } from '../../../productBundles/bundlesData'

jest.mock('../../ProductBundle', () => ({
  ProductBundle: () => <div className="productBundle" />,
}))

const assertProductBundlesLength = (container: any, length: number) => {
  expect(container.getElementsByClassName('productBundle')).toHaveLength(length)
}

describe('<ProductListBundles />', () => {
  test('Should render ProductListBundles with props', () => {
    const mockProps = { products: [TestBundle1, TestBundle2], getFilteredProducts: jest.fn() }
    const { container } = render(<ProductListBundles {...mockProps} />)

    assertProductBundlesLength(container, 2)
    expect(screen.getByTestId('ProductListBundlesPresentation')).toBeInTheDocument()
  })

  test('Should render one ProductBundle', () => {
    const mockProps = { products: [TestBundle1], getFilteredProducts: jest.fn() }
    const { container } = render(<ProductListBundles {...mockProps} />)

    assertProductBundlesLength(container, 1)
    expect(screen.getByTestId('ProductListBundlesPresentation')).toBeInTheDocument()
  })

  test('Should not render ProductListBundles without products', () => {
    const mockProps = { products: null, getFilteredProducts: jest.fn() }
    const { container } = render(<ProductListBundles {...mockProps} />)

    assertProductBundlesLength(container, 0)
    expect(screen.queryByText('ProductListBundlesPresentation')).toBeNull()
  })
})
