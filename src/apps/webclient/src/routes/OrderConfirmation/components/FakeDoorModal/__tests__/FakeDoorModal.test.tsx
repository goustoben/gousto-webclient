import React from 'react'

import { ModalProvider } from '@gousto-internal/citrus-react'
import { fireEvent, render } from '@testing-library/react'
import * as Redux from 'react-redux'

import { marketBundleTracking } from 'actions/orderConfirmation'

import { TestBundle1 } from '../../../productBundles/bundlesData'
import { FakeDoorModal } from '../FakeDoorModal'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}))

jest.mock('actions/orderConfirmation', () => ({
  ...jest.requireActual('actions/orderConfirmation'),
  marketBundleTracking: jest.fn(),
}))

describe('<FakeDoorModal />', () => {
  const mockProps = {
    ...TestBundle1,
    isOpen: true,
    getFilteredProducts: jest.fn(),
    close: jest.fn(),
  }
  const dispatch = jest.fn()
  jest.spyOn(Redux, 'useDispatch').mockImplementation(() => dispatch)
  ;(marketBundleTracking as jest.Mock).mockReturnValue(marketBundleTracking)

  test('Should render FakeDoorModal when modal is open', () => {
    const { getAllByTestId, getByRole, getByText } = render(
      <ModalProvider>
        <FakeDoorModal {...mockProps} />
      </ModalProvider>,
    )
    expect(getByText('Zesty Date Night For Two')).toBeInTheDocument()
    expect(getByText('1 x Percheron Chenin Blanc Viognier (750ml bottle)')).toBeInTheDocument()
    expect(getAllByTestId('bundleProducts')).toHaveLength(2)
    fireEvent.click(getByRole('button', { name: 'Browse Items' }))
    expect(dispatch).toBeCalledWith(marketBundleTracking)
  })

  test('Should call dispatch on modal close', () => {
    const { getByRole } = render(
      <ModalProvider>
        <FakeDoorModal {...mockProps} />
      </ModalProvider>,
    )

    fireEvent.click(getByRole('button', { name: 'Close modal' }))
    expect(dispatch).toBeCalledWith(marketBundleTracking)
  })

  test('Should not render FakeDoorModal when modal is closed', () => {
    mockProps.isOpen = false
    const { queryAllByTestId, queryByText } = render(
      <ModalProvider>
        <FakeDoorModal {...mockProps} />
      </ModalProvider>,
    )

    expect(queryByText('Zesty Date Night For Two')).not.toBeInTheDocument()
    expect(queryByText('Percheron Chenin Blanc Viognier (750ml bottle)')).not.toBeInTheDocument()
    expect(queryAllByTestId('bundleProducts')).toHaveLength(0)
  })
})
