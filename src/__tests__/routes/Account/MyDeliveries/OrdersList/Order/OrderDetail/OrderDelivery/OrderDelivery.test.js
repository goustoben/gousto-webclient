import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import OrderDelivery from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderDelivery/OrderDelivery'
import recipesActions from 'actions/recipes'
import orderActions from 'actions/order'
import { OrderDeliveryAddress } from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderDelivery/OrderDeliveryAddress'
import actions from 'actions/user'

jest.mock('actions/user', () => ({
  userTrackToggleEditDateSection: jest.fn(),
  userToggleEditDateSection: jest.fn()
}))

jest.mock('actions/order', () => ({
  orderGetDeliveryDays: jest.fn()
}))

jest.mock('actions/recipes', () => ({
  recipesLoadStockByDate: jest.fn()
}))

describe('OrderDelivery',() => {
  let wrapper
  const addressObjectMock = Immutable.Map({
    line1: 'Flat 10',
    line2: 'Morris House',
    line3: 'Swainson Road',
    town: 'London',
    postcode: 'W3 7UP',
    name: 'work',
  })
  const context = {
    store: {
      getState: () => ({
        orderPricing: Immutable.Map({}),
      }),
      subscribe: () => {},
      dispatch: () => {},
    },
  }
  const clearUpdateDateErrorAndPendingSpy = jest.fn()

  beforeEach(() => {
    wrapper = shallow(<OrderDelivery
      date="Monday 17 August"
      timeStart="6am"
      timeEnd="3pm"
      shippingAddressObj={addressObjectMock}
      editDeliveryMode={false}
      orderState="menu open"
      orderId={8}
      clearUpdateDateErrorAndPending={clearUpdateDateErrorAndPendingSpy}
    />,{context})
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('componentDidMount', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })
    test('should dispatch fetches for getting delivery days and stock if the order state is "menu open"',() => {
      wrapper = shallow(<OrderDelivery
        orderState="menu open"
      />,{context})
      expect(orderActions.orderGetDeliveryDays).toHaveBeenCalled()
      expect(recipesActions.recipesLoadStockByDate).toHaveBeenCalled()
    })

    test('should dispatch fetches for getting delivery days and stock if the order state is "recipes chosen"',() => {
      wrapper = shallow(<OrderDelivery
        orderState="recipes chosen"
      />,{context})
      expect(orderActions.orderGetDeliveryDays).toHaveBeenCalled()
      expect(recipesActions.recipesLoadStockByDate).toHaveBeenCalled()
    })

    test('should NOT dispatch fetches for getting delivery days and stock if the order is NOT pending',() => {
      wrapper = shallow(<OrderDelivery
        orderState="scheduled"
      />,{context})

      expect(orderActions.orderGetDeliveryDays).not.toHaveBeenCalled()
      expect(recipesActions.recipesLoadStockByDate).not.toHaveBeenCalled()
    })
  })

  describe('rendering',() => {

    test('should render a <div>',() => {
      expect(wrapper.type()).toEqual('div')
    })

    test('should render "Delivery details"',() => {
      expect(wrapper.text()).toContain('Delivery details')
    })

    test('should render a loading spinner if addressLoading = true', () => {
      wrapper = shallow(<OrderDelivery
        addressLoading
      />,{context})

      expect(wrapper.find("Loading").length).toEqual(1)
      expect(wrapper.find("OrderDeliveryDate").length).toEqual(0)
      expect(wrapper.find(OrderDeliveryAddress).length).toEqual(0)
    })

    test('should render <OrderDeliveryDate/> if addressLoading = false ', () => {
      expect(wrapper.find("OrderDeliveryDate").length).toEqual(1)
    })

    test('should render <OrderDeliveryAddress/> if addressLoading = false ', () => {
      expect(wrapper.find(OrderDeliveryAddress).length).toEqual(1)
    })

    describe('onClickFunction', () => {
      test('should dispatch userTrackToggleEditDateSection if editDeliveryMode is false', () => {
        wrapper.instance().onClickFunction()

        expect(actions.userTrackToggleEditDateSection).toHaveBeenCalled()
      })

      test('should NOT dispatch userTrackToggleEditDateSection if editDeliveryMode is true', () => {
        wrapper = shallow(<OrderDelivery
          date="Monday 17 August"
          timeStart="6am"
          timeEnd="3pm"
          shippingAddressObj={addressObjectMock}
          editDeliveryMode
          orderState="scheduled"
          orderId={8}
          clearUpdateDateErrorAndPending={clearUpdateDateErrorAndPendingSpy}
        />,{context})
        wrapper.instance().onClickFunction()

        expect(actions.userTrackToggleEditDateSection).not.toHaveBeenCalled()
      })

      test('should dispatch userToggleEditDateSection with orderId and !editDeliveryMode', () => {
        wrapper.instance().onClickFunction()

        expect(actions.userToggleEditDateSection).toHaveBeenCalledWith(8, true)
      })

      test('should dispatch clearUpdateDateErrorAndPending', () => {
        wrapper.instance().onClickFunction()

        expect(clearUpdateDateErrorAndPendingSpy).toHaveBeenCalled()
      })
    })
  })
})
