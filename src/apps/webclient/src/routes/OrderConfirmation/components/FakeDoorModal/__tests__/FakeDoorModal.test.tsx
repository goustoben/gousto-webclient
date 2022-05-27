import React from 'react'

import { ModalProvider } from '@gousto-internal/citrus-react'
import { render } from '@testing-library/react'

import { mockBundlesData } from '../../config'
import { FakeDoorModal } from '../FakeDoorModal'

describe('<FakeDoorModal />', () => {
  const mockProps = { ...mockBundlesData[0], isOpen: true, close: jest.fn() }

  test('Should render FakeDoorModal when modal is open', () => {
    const { getAllByTestId, getByText } = render(
      <ModalProvider>
        <FakeDoorModal {...mockProps} />
      </ModalProvider>,
    )
    expect(getByText('Zesty Date Night For Two')).toBeInTheDocument()
    expect(getByText('1 x Percheron Chenin Blanc Viognier (750ml bottle)')).toBeInTheDocument()
    expect(getAllByTestId('bundleProducts')).toHaveLength(2)
  })

  test('Should not render FakeDoorModal when modal is closed', () => {
    mockProps.isOpen = false
    const { queryAllByTestId, queryByText } = render(
      <ModalProvider>
        <FakeDoorModal {...mockProps} />
      </ModalProvider>,
    )

    expect(queryByText('Gousto Market Occasions')).not.toBeInTheDocument()
    expect(queryByText('Percheron Chenin Blanc Viognier (750ml bottle)')).not.toBeInTheDocument()
    expect(queryAllByTestId('bundleProducts')).toHaveLength(0)
  })
})
