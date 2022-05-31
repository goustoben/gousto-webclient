import React from 'react'

import { ModalProvider } from '@gousto-internal/citrus-react'
import { render } from '@testing-library/react'

import { TestBundle1 } from 'routes/OrderConfirmation/productBundles/bundlesData'

import { ProductBundleDetails } from '../ProductBundleDetails'

describe('<ProductBundleDetails />', () => {
  const mockProps = { ...TestBundle1, isOpen: true, close: jest.fn() }

  test('Should render ProductBundleDetails when modal is open', () => {
    const { getAllByTestId, getByText } = render(
      <ModalProvider>
        <ProductBundleDetails {...mockProps} />
      </ModalProvider>,
    )

    expect(getByText('Zesty Date Night For Two')).toBeInTheDocument()
    expect(getByText('£11.99')).toBeInTheDocument()
    expect(getByText('Take your evening meal to another level')).toBeInTheDocument()
    expect(getAllByTestId('bundleProducts')).toHaveLength(2)
  })

  test('Should not render ProductBundleDetails when modal is closed', () => {
    mockProps.isOpen = false
    const { queryAllByTestId, queryByText } = render(
      <ModalProvider>
        <ProductBundleDetails {...mockProps} />
      </ModalProvider>,
    )

    expect(queryByText('Zesty Date Night For Two')).not.toBeInTheDocument()
    expect(queryAllByTestId('bundleProducts')).toHaveLength(0)
  })
})
