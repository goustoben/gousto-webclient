import React from 'react'
import { mount } from 'enzyme'
import Immutable from 'immutable'
import moment from 'moment'
import { shouldShowEntryPointTooltip } from 'apis/getHelp'
import { logger } from 'utils/logger'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Header } from '../Header.logic'

jest.mock('apis/getHelp', () => ({
  shouldShowEntryPointTooltip: jest.fn().mockResolvedValue({
    data: { day: 'no' }
  }),
}))

jest.mock('../NextOrder', () => ({
  NextOrderContainer: () => (<div>Next order mock!</div>)
}))

const deliveryDateFormat = 'YYYY-MM-DD HH:mm:ss'
const ACCESS_TOKEN = 'shhhh-secret'
const USER_ID = '111122'
const NEXT_ORDER_TRACKING = 'www.courier.com/order/asdf'

const FUTURE_ORDER = Immutable.fromJS({
  deliveryDate: moment().add(2, 'days').format(deliveryDateFormat),
  humanDeliveryDate: 'Saturday 17th July (not used in these tests)',
  phase: 'delivered', // Just for proptypes, Not used in these tests
  state: 'committed', // Just for proptypes, Not used in these tests
  prices: {
    total: '25.25 (not used in these tests)',
  },
  deliverySlot: {
    deliveryEnd: '18:59:59',
    deliveryStart: '08:00:00'
  },
  id: '101',
})

const PAST_ORDER = Immutable.fromJS({
  deliveryDate: moment().subtract(2, 'days').format(deliveryDateFormat),
  humanDeliveryDate: 'Saturday 17th July  (not used in these tests)',
  phase: 'delivered', // Just for proptypes, Not used in these tests
  state: 'committed', // Just for proptypes, Not used in these tests
  deliverySlot: {
    deliveryEnd: '18:59:59',
    deliveryStart: '08:00:00'
  },
  id: '109',
  prices: {
    total: '12'
  },
  recipeItems: []
})

const ORDER_FOR_TODAY = Immutable.fromJS({
  deliveryDate: moment().format(deliveryDateFormat),
  humanDeliveryDate: 'Saturday 17th July (not used in these tests)',
  phase: 'delivered', // Just for proptypes, Not used in these tests
  state: 'committed', // Just for proptypes, Not used in these tests
  prices: {
    total: '25.25 (not used in these tests)',
  },
  deliverySlot: {
    deliveryEnd: '18:59:59',
    deliveryStart: '08:00:00'
  },
  id: '100',
})

let wrapper
let store
const mockLoadOrderTrackingInfo = jest.fn()
const loadNextProjectedOrder = jest.fn()
const loadOrders = jest.fn()
const initialState = {}
const mockStore = configureStore([thunk])

const ProviderComponent = (props) => (
  <Provider store={store}>
    <Header
      accessToken={ACCESS_TOKEN}
      isOrdersPending={false}
      isProjectedDeliveriesPending={false}
      loadNextProjectedOrder={loadNextProjectedOrder}
      loadOrders={loadOrders}
      {...props}
    />
  </Provider>
)

describe('MyGousto - Header', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    store = mockStore(initialState)
    wrapper = mount(
      <ProviderComponent
        loadOrderTrackingInfo={mockLoadOrderTrackingInfo}
        nextOrderTracking={NEXT_ORDER_TRACKING}
      />
    )
  })

  test('calls loadOrders on mount', () => {
    expect(loadOrders).toHaveBeenCalled()
  })

  describe('when userId is not available', () => {
    test('it does not call loadNextProjectedOrder on component did mount', () => {
      expect(loadNextProjectedOrder).not.toHaveBeenCalled()
    })

    describe('and userId becomes available', () => {
      beforeEach(() => {
        wrapper.setProps({ userId: USER_ID })
      })

      test('it does call loadNextProjectedOrder with userId on component did mount', () => {
        expect(loadNextProjectedOrder).toHaveBeenCalledWith(USER_ID)
      })
    })
  })

  describe('when userId is available', () => {
    beforeEach(() => {
      wrapper = mount(
        <ProviderComponent
          userId={USER_ID}
        />
      )
    })

    test('it does call loadNextProjectedOrder with userId on component did mount', () => {
      expect(loadNextProjectedOrder).toHaveBeenCalledWith(USER_ID)
    })
  })

  describe('when isOrdersPending is true', () => {
    beforeEach(() => {
      wrapper.setProps({ isOrdersPending: true })
    })

    test('renders Loading', () => {
      expect(wrapper.find('Loading').exists()).toBe(true)
    })

    test('does not render other components', () => {
      expect(wrapper.find('NextProjectedDelivery').exists()).toBe(false)
      expect(wrapper.find('NoNextOrder').exists()).toBe(false)
      expect(wrapper.find('PreviousOrderContainer').exists()).toBe(false)
      expect(wrapper.find('NextOrderContainer').exists()).toBe(false)
    })
  })

  describe('when isProjectedDeliveriesPending is true', () => {
    beforeEach(() => {
      wrapper.setProps({ isProjectedDeliveriesPending: true })
    })

    test('renders Loading', () => {
      expect(wrapper.find('Loading').exists()).toBe(true)
    })

    test('does not render other components', () => {
      expect(wrapper.find('NextProjectedDelivery').exists()).toBe(false)
      expect(wrapper.find('NoNextOrder').exists()).toBe(false)
      expect(wrapper.find('PreviousOrderContainer').exists()).toBe(false)
      expect(wrapper.find('NextOrderContainer').exists()).toBe(false)
    })
  })

  describe('when both isOrdersPending and isProjectedDeliveriesPending are false', () => {
    beforeEach(() => {
      wrapper.setProps({ isOrdersPending: false, isProjectedDeliveriesPending: false })
    })

    test('does not render Loading', () => {
      expect(wrapper.find('Loading').exists()).toBe(false)
    })
  })

  describe('when a user has a next order', () => {
    beforeEach(() => {
      // Props changed so componentDidUpdate runs
      wrapper.setProps({ nextOrder: FUTURE_ORDER })
    })

    test('should render the NextOrder component with the right props', () => {
      const nextOrder = wrapper.find('NextOrderContainer')
      expect(nextOrder.prop('boxTrackingUrl')).toBe(NEXT_ORDER_TRACKING)
      expect(nextOrder.prop('order')).toBe(FUTURE_ORDER)
    })

    test('GetHelp API shouldShowEntryPointTooltip is called with the right parameters', () => {
      expect(shouldShowEntryPointTooltip).toHaveBeenCalledWith(
        ACCESS_TOKEN,
        FUTURE_ORDER.get('deliveryDate')
      )
    })

    describe('and the call to GetHelp API shouldShowEntryPointTooltip errors', () => {
      const ERROR = new Error('error occurred')

      beforeEach(() => {
        shouldShowEntryPointTooltip.mockImplementationOnce(() => {
          throw ERROR
        })
        logger.warning = jest.fn()
        // Mount again so the mock implementation is picked up
        wrapper = mount(<ProviderComponent />)

        // Props changed so componentDidUpdate runs
        wrapper.setProps({ nextOrder: FUTURE_ORDER })
      })

      test('a warning is logged', () => {
        expect(logger.warning.mock.calls[0]).toEqual([
          `API call to shouldShowEntryPointTooltip for order with date ${FUTURE_ORDER.get('deliveryDate')} thrown an error`,
          ERROR,
        ])
      })
    })

    describe('and the time is so a tooltip should show', () => {
      beforeEach(() => {
        shouldShowEntryPointTooltip.mockResolvedValueOnce({
          data: { day: 'same_day_evening' }
        })

        // Mount again so the mock implementation is picked up
        wrapper = mount(<ProviderComponent />)

        // Props changed so componentDidUpdate runs
        wrapper.setProps({ nextOrder: ORDER_FOR_TODAY })
      })

      test('shows a tooltip pointing to the Get Help link', () => {
        wrapper.update() // Without it, subcomponents don't get the prop based on state propagated
        expect(wrapper.find('NextOrderContainer').prop('hasTooltip')).toBe(true)
      })
    })

    describe('and the time is so a tooltip should not show', () => {
      beforeEach(() => {
        shouldShowEntryPointTooltip.mockResolvedValueOnce({
          data: { day: 'no' }
        })

        // Mount again so the mock implementation is picked up
        wrapper = mount(<ProviderComponent />)

        // Props changed so componentDidUpdate runs
        wrapper.setProps({ nextOrder: ORDER_FOR_TODAY })
      })

      test('does not show any tooltip', () => {
        wrapper.update() // Without it, subcomponents don't get the prop based on state propagated
        expect(wrapper.find('NextOrderContainer').prop('hasTooltip')).toBe(false)
      })
    })

    describe('and the next order is not for today', () => {
      beforeEach(() => {
        wrapper.setProps({ nextOrder: FUTURE_ORDER })
      })

      test('it passes hasDeliveryToday to NextOrder as false', () => {
        expect(wrapper.find('NextOrderContainer').prop('hasDeliveryToday')).toBe(false)
      })
    })

    describe('and the next order is today', () => {
      beforeEach(() => {
        wrapper.setProps({ nextOrder: ORDER_FOR_TODAY })
      })

      test('it passes hasDeliveryToday to NextOrder as true', () => {
        expect(wrapper.find('NextOrderContainer').prop('hasDeliveryToday')).toBe(true)
      })
    })
  })

  describe('when a user has no upcoming orders', () => {
    beforeEach(() => {
      wrapper.setProps({ nextOrder: null })
    })

    describe('and it has projected deliveries', () => {
      const NEXT_PROJECTED_DELIVERY_DATE = '2021-08-03'

      beforeEach(() => {
        wrapper.setProps({
          nextProjectedOrder: {
            deliveryDate: NEXT_PROJECTED_DELIVERY_DATE,
            skipped: false,
            menuOpenDate: '2021-07-20T12:00:00.000Z'
          }
        })
      })

      test('renders NextProjectedDelivery with the right date', () => {
        expect(wrapper.find('NextProjectedDelivery').prop('deliveryDate'))
          .toBe(NEXT_PROJECTED_DELIVERY_DATE)
      })
    })

    describe('and it has no projected deliveries', () => {
      beforeEach(() => {
        wrapper.setProps({ nextProjectedOrder: null })
      })

      test('should render the NoNextOrder component without any props', () => {
        expect(wrapper.find('NoNextOrder')).toHaveLength(1)
      })
    })
  })

  describe('when a user has previously delivered orders', () => {
    beforeEach(() => {
      wrapper.setProps({ previousOrder: PAST_ORDER })
    })

    test('should render the PreviousOrder component with the order passed as a prop', () => {
      const previousOrder = wrapper.find('PreviousOrder')
      expect(previousOrder.prop('order')).toBe(PAST_ORDER)
    })

    describe('and the call to GetHelp API shouldShowEntryPointTooltip errors', () => {
      const ERROR = new Error('error occurred')

      beforeEach(() => {
        shouldShowEntryPointTooltip.mockImplementationOnce(() => {
          throw ERROR
        })
        logger.warning = jest.fn()
        // Mount again so the mock implementation is picked up
        wrapper = mount(<ProviderComponent />)

        // Props changed so componentDidUpdate runs
        wrapper.setProps({ previousOrder: PAST_ORDER })
      })

      test('a warning is logged', () => {
        expect(logger.warning.mock.calls[0]).toEqual([
          `API call to shouldShowEntryPointTooltip for order with date ${PAST_ORDER.get('deliveryDate')} thrown an error`,
          ERROR,
        ])
      })
    })

    describe('and the time is so a tooltip should show', () => {
      beforeEach(() => {
        shouldShowEntryPointTooltip.mockResolvedValueOnce({
          data: { day: 'yesterday' }
        })

        // Mount again so the mock implementation is picked up
        wrapper = mount(<ProviderComponent />)

        // Props changed so componentDidUpdate runs
        wrapper.setProps({ previousOrder: PAST_ORDER })
      })

      test('sets hasTooltip to true in PreviousOrder', () => {
        wrapper.update() // Without it, subcomponents don't get the prop based on state propagated
        expect(wrapper.find('PreviousOrder').prop('hasTooltip')).toBe(true)
      })
    })

    describe('and the time is so a tooltip should not show', () => {
      beforeEach(() => {
        shouldShowEntryPointTooltip.mockResolvedValueOnce({
          data: { day: 'no' }
        })

        // Mount again so the mock implementation is picked up
        wrapper = mount(<ProviderComponent />)

        // Props changed so componentDidUpdate runs
        wrapper.setProps({ previousOrder: PAST_ORDER })
      })

      test('sets hasTooltip to false in PreviousOrder', () => {
        wrapper.update() // Without it, subcomponents don't get the prop based on state propagated
        expect(wrapper.find('PreviousOrder').prop('hasTooltip')).toBe(false)
      })
    })

    describe('and the next order is for today', () => {
      beforeEach(() => {
        wrapper.setProps({ nextOrder: ORDER_FOR_TODAY })
      })

      test('should pass hasDeliveryToday to PreviousOrder as true', () => {
        expect(wrapper.find('PreviousOrder').prop('hasDeliveryToday')).toBe(true)
      })
    })

    describe('and the next order is not for today', () => {
      beforeEach(() => {
        wrapper.setProps({ nextOrder: FUTURE_ORDER })
      })

      test('should pass hasDeliveryToday to PreviousOrder as false', () => {
        expect(wrapper.find('PreviousOrder').prop('hasDeliveryToday')).toBe(false)
      })
    })
  })

  describe('when a user has no previously delivered orders', () => {
    beforeEach(() => {
      wrapper.setProps({ previousOrder: null })
    })

    test('does not show details of previous deliveries', () => {
      expect(wrapper.find('PreviousOrder').exists()).toBe(false)
    })
  })

  describe('fetching the tracking URL for an order', () => {
    describe('when the user has an upcoming order', () => {
      describe('and the order is due to be delivered today', () => {
        test('fetches the tracking URL for the next order', () => {
          wrapper.setProps({ nextOrder: ORDER_FOR_TODAY })
          expect(mockLoadOrderTrackingInfo).toHaveBeenCalledTimes(1)
          expect(mockLoadOrderTrackingInfo).toHaveBeenCalledWith('100')
        })
      })

      describe('and the order is not due to be delivered today', () => {
        test('does not try to fetch the tracking URL for any orders', () => {
          wrapper.setProps({ nextOrder: FUTURE_ORDER })
          expect(mockLoadOrderTrackingInfo).toHaveBeenCalledTimes(0)
        })
      })
    })

    describe('when the user has no upcoming orders', () => {
      test('does not try to fetch the tracking URL for any orders', () => {
        wrapper.setProps({ nextOrder: null })
        expect(mockLoadOrderTrackingInfo).toHaveBeenCalledTimes(0)
      })
    })
  })
})
