import React from 'react'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { shallow } from 'enzyme'
import { createState } from 'routes/Menu/selectors/__mocks__/order.mock'
import { MenuSidesModalContainer } from '../MenuSidesModalContainer'
import * as SidesActions from '../../actions/sides'
import * as MenuSidesCheckoutClick from '../../actions/menuSidesCheckoutClick'

describe('<MenuSidesModalContainer/>', () => {
  let wrapper
  let closeSidesModalSpy
  let checkoutWithSidesSpy
  let store
  const fakeActionResponse = jest.fn().mockReturnValue({ action: 'test', type: 'action' })

  beforeEach(() => {
    closeSidesModalSpy = jest.spyOn(SidesActions, 'closeSidesModal').mockImplementation(fakeActionResponse)
    checkoutWithSidesSpy = jest.spyOn(MenuSidesCheckoutClick, 'checkoutWithSides').mockImplementation(fakeActionResponse)

    const mockStore = configureMockStore([thunk])
    store = mockStore({
      ...createState({
        basket: {
          orderId: '1234'
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
    expect(wrapper.props().accessToken).toBe('auth-access-token')
  })

  test('should provide a user id', () => {
    expect(wrapper.props().userId).toBe('user-id')
  })

  test('should provide an if the modal is open', () => {
    expect(wrapper.props().isOpen).toBe(true)
  })

  test('should provide an order', () => {
    expect(wrapper.props().order).toEqual(expect.objectContaining({
      type: 'order',
      id: '1234',
      attributes: {
        menu_id: '433',
      },
    }))
  })

  test('should provide on close method that calls closeSidesModal', () => {
    wrapper.props().onClose()

    expect(closeSidesModalSpy).toHaveBeenCalled()
  })

  test('should provide on submit method that calls checkoutWithSides with products', () => {
    wrapper.props().onSubmit('sides-modal-with-sides', { product_id: 2 })

    expect(checkoutWithSidesSpy).toBeCalledWith('menu', 'sides-modal-with-sides', { product_id: 2 })
  })
})
