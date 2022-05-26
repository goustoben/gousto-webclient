import React from 'react'

import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import * as Menu from 'actions/menu'
import { createState } from 'routes/Menu/selectors/__mocks__/order.mock'

import * as MenuSidesCheckoutClick from '../../actions/menuSidesCheckoutClick'
import * as SidesActions from '../../actions/sides'
import { MenuSidesModalContainer } from '../MenuSidesModalContainer'

describe('<MenuSidesModalContainer/>', () => {
  let wrapper
  let closeSidesModalSpy
  let checkoutWithSidesSpy
  let trackAddSideSpy
  let trackViewSidesAllergensSpy
  let trackCloseSidesAllergensSpy
  let trackSidesContinueClickedSpy
  let store

  const fakeActionResponse = jest.fn().mockReturnValue({ action: 'test', type: 'action' })

  beforeEach(() => {
    closeSidesModalSpy = jest
      .spyOn(SidesActions, 'closeSidesModal')
      .mockImplementation(fakeActionResponse)
    checkoutWithSidesSpy = jest
      .spyOn(MenuSidesCheckoutClick, 'checkoutWithSides')
      .mockImplementation(fakeActionResponse)

    trackAddSideSpy = jest.spyOn(Menu, 'trackAddSide')
    trackViewSidesAllergensSpy = jest.spyOn(Menu, 'trackViewSidesAllergens')
    trackCloseSidesAllergensSpy = jest.spyOn(Menu, 'trackCloseSidesAllergens')
    trackSidesContinueClickedSpy = jest.spyOn(Menu, 'trackSidesContinueClicked')

    const mockStore = configureMockStore([thunk])
    store = mockStore({
      ...createState({
        basket: {
          orderId: '1234',
        },
        auth: {
          id: 'auth-user-id',
          accessToken: 'auth-access-token',
        },
        user: {
          id: 'user-id',
        },
      }),
      menuSidesModalOpen: true,
    })

    wrapper = shallow(<MenuSidesModalContainer store={store} />)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should provide an access token', () => {
    expect(wrapper.find('SidesModal').props().accessToken).toBe('auth-access-token')
  })

  test('should provide a user id', () => {
    expect(wrapper.find('SidesModal').props().userId).toBe('user-id')
  })

  test('should provide an if the modal is open', () => {
    expect(wrapper.find('SidesModal').props().isOpen).toBe(true)
  })

  test('should provide an order', () => {
    expect(wrapper.find('SidesModal').props().order).toEqual(
      expect.objectContaining({
        type: 'order',
        id: '1234',
        attributes: {
          menu_id: '433',
        },
      }),
    )
  })

  test('should provide on close method that calls closeSidesModal and tracks with trackCancelSide', () => {
    const closeSidesModalMock = jest.fn().mockImplementation(fakeActionResponse)
    closeSidesModalSpy.mockReturnValue(closeSidesModalMock)

    wrapper.find('SidesModal').props().onClose()

    expect(closeSidesModalMock).toHaveBeenCalled()
    expect(closeSidesModalSpy).toHaveBeenCalled()
  })

  test('should provide on submit method that calls checkoutWithSides with products', () => {
    wrapper.find('SidesModal').props().onSubmit('sides-modal-with-sides', { product_id: 2 })

    expect(checkoutWithSidesSpy).toBeCalledWith('menu', 'sides-modal-with-sides', { product_id: 2 })
  })

  test('should provide a track add side method that calls trackAddSide', () => {
    wrapper.find('SidesModal').props().trackAddSide('side-id', 'order-id')

    expect(trackAddSideSpy).toBeCalledWith('side-id', 'order-id')
  })

  test('should provide a track show allergens method that calls trackViewSidesAllergens', () => {
    wrapper.find('SidesModal').props().trackViewSidesAllergens()

    expect(trackViewSidesAllergensSpy).toBeCalledTimes(1)
  })

  test('should provide a track add side method that calls trackCloseSidesAllergens', () => {
    wrapper.find('SidesModal').props().trackCloseSidesAllergens()

    expect(trackCloseSidesAllergensSpy).toBeCalledTimes(1)
  })

  test('should provide a track add side method that calls trackSidesContinueClicked', () => {
    wrapper.find('SidesModal').props().trackSidesContinueClicked(['side-id'], 1, 2)

    expect(trackSidesContinueClickedSpy).toBeCalledWith(['side-id'], 1, 2)
  })
})
