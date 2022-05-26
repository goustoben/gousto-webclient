import { render, screen } from '@testing-library/react'
import React from 'react'
import { ProductListBundles } from '..'
import { mockBundlesData } from '../../config'

jest.mock('../../ProductBundle', () => ({
  ProductBundle: () => <div className="productBundle" />,
}))

const assertProductBundlesLength = (container: any, length: number) => {
  expect(container.getElementsByClassName('productBundle')).toHaveLength(length)
}

describe('<ProductListBundles />', () => {
  const mockProps = { products: mockBundlesData }

  test('Should render ProductListBundles with props', () => {
    const { container } = render(<ProductListBundles {...mockProps} />)

    assertProductBundlesLength(container, 2)
    expect(screen.getByTestId('ProductListBundlesPresentation')).toBeInTheDocument()
  })

  test('Should render one ProductBundle', () => {
    const { container } = render(
      <ProductListBundles {...mockProps} products={[mockBundlesData[0]]} />,
    )

    assertProductBundlesLength(container, 1)
    expect(screen.getByTestId('ProductListBundlesPresentation')).toBeInTheDocument()
  })

  test('Should not render ProductListBundles without products', () => {
    const { container } = render(<ProductListBundles {...mockProps} products={null} />)

    assertProductBundlesLength(container, 0)
    expect(screen.queryByText('ProductListBundlesPresentation')).toBeNull()
  })
})
