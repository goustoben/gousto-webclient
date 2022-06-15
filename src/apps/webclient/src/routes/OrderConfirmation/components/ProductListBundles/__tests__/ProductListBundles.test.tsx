import React from 'react'

import { render, screen } from '@testing-library/react'

import { marketBundlesVariant } from 'actions/trackingKeys'
import { invokeHotjarEvent } from 'utils/hotjarUtils'

import { ProductListBundles } from '..'
import { TestBundle1, TestBundle2 } from '../../../productBundles/bundlesData'

jest.mock('../../ProductBundle', () => ({
  ProductBundle: () => <div className="productBundle" />,
}))

jest.mock('utils/hotjarUtils', () => ({
  invokeHotjarEvent: jest.fn(),
}))

const assertProductBundlesLength = (container: any, length: number) => {
  expect(container.getElementsByClassName('productBundle')).toHaveLength(length)
}

describe('<ProductListBundles />', () => {
  test('Should not render ProductListBundles without products', () => {
    const mockProps = { products: null, getFilteredProducts: jest.fn() }
    const { container } = render(<ProductListBundles {...mockProps} />)

    assertProductBundlesLength(container, 0)
    expect(invokeHotjarEvent).not.toBeCalled()
    expect(screen.queryByText('ProductListBundlesPresentation')).toBeNull()
  })

  test('Should render ProductListBundles with props', () => {
    const mockProps = { products: [TestBundle1, TestBundle2], getFilteredProducts: jest.fn() }
    const { container } = render(<ProductListBundles {...mockProps} />)

    assertProductBundlesLength(container, 2)
    expect(invokeHotjarEvent).toBeCalledWith(marketBundlesVariant)
    expect(screen.getByTestId('ProductListBundlesPresentation')).toBeInTheDocument()
  })

  test('Should render one ProductBundle', () => {
    const mockProps = { products: [TestBundle1], getFilteredProducts: jest.fn() }
    const { container } = render(<ProductListBundles {...mockProps} />)

    assertProductBundlesLength(container, 1)
    expect(screen.getByTestId('ProductListBundlesPresentation')).toBeInTheDocument()
  })
})
