import React from 'react'
import { mount } from 'enzyme'
import Immutable from 'immutable'
import moment from 'moment'
import config from 'config'
import { shouldShowEntryPointTooltip } from 'apis/getHelp'
import logger from 'utils/logger'
import { Header } from '../Header.logic'

jest.mock('apis/getHelp', () => ({
  shouldShowEntryPointTooltip: jest.fn().mockResolvedValue({
    data: { day: 'no' }
  }),
}))

const deliveryDateFormat = 'YYYY-MM-DD HH:mm:ss'
const ACCESS_TOKEN = 'shhhh-secret'
const upcomingOrders = Immutable.fromJS({
  100: {
    deliveryDate: moment().add(10, 'days').format(deliveryDateFormat),
    deliverySlot: {
      deliveryEnd: '18:59:59',
      deliveryStart: '08:00:00'
    },
    id: '100',
  },
  101: {
    deliveryDate: moment().add(2, 'days').format(deliveryDateFormat),
    deliverySlot: {
      deliveryEnd: '18:59:59',
      deliveryStart: '08:00:00'
    },
    id: '101',
  },
  102: {
    deliveryDate: moment().add(5, 'days').format(deliveryDateFormat),
    deliverySlot: {
      deliveryEnd: '18:59:59',
      deliveryStart: '08:00:00'
    },
    id: '102',
  },
})
const previousOrders = Immutable.fromJS({
  100: {
    deliveryDate: moment().subtract(10, 'days').format(deliveryDateFormat),
    deliverySlot: {
      deliveryEnd: '18:59:59',
      deliveryStart: '08:00:00'
    },
    id: '100',
  },
  101: {
    deliveryDate: moment().subtract(2, 'days').format(deliveryDateFormat),
    deliverySlot: {
      deliveryEnd: '18:59:59',
      deliveryStart: '08:00:00'
    },
    id: '101',
  },
  102: {
    deliveryDate: moment().subtract(5, 'days').format(deliveryDateFormat),
    deliverySlot: {
      deliveryEnd: '18:59:59',
      deliveryStart: '08:00:00'
    },
    id: '102',
  },
})
const onlyOldOrders = Immutable.fromJS({
  100: {
    deliveryDate: moment().subtract(12, 'days').format(deliveryDateFormat),
    deliverySlot: {
      deliveryEnd: '18:59:59',
      deliveryStart: '08:00:00'
    },
    id: '100',
  }
})
const orderForToday = Immutable.fromJS({
  100: {
    deliveryDate: moment().format(deliveryDateFormat),
    deliverySlot: {
      deliveryEnd: '18:59:59',
      deliveryStart: '08:00:00'
    },
    id: '100',
  }
})
let wrapper
const mockLoadOrderTrackingInfo = jest.fn()
const trackClickGetHelpWithThisBox = jest.fn()
const trackNextBoxTrackingClick = jest.fn()

describe('MyGousto - Header', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when no orders are passed in', () => {
    beforeEach(() => {
      wrapper = mount(
        <Header
          accessToken={ACCESS_TOKEN}
        />
      )
    })

    test('should not render any messages', () => {
      expect(wrapper.find('.headerText').length).toEqual(0)
    })
  })

  describe('when a user has upcoming orders', () => {
    const NEXT_ORDER_TRACKING = 'www.courier.com/order/asdf'

    beforeEach(() => {
      wrapper = mount(
        <Header
          accessToken={ACCESS_TOKEN}
          nextOrderTracking={NEXT_ORDER_TRACKING}
          trackNextBoxTrackingClick={trackNextBoxTrackingClick}
          trackClickGetHelpWithThisBox={trackClickGetHelpWithThisBox}
        />
      )

      // Props changed so componentDidUpdate runs
      wrapper.setProps({ orders: upcomingOrders })
    })

    test('should render the NextOrder component with the right props', () => {
      const nextOrder = wrapper.find('NextOrder')
      const expectedDateString = moment().add(2, 'days').format('dddd Do MMMM')
      expect(nextOrder.prop('boxTrackingUrl')).toBe(NEXT_ORDER_TRACKING)
      expect(nextOrder.prop('orderId')).toBe('101')
      expect(nextOrder.prop('primaryMessage')).toBe(expectedDateString)
      expect(nextOrder.prop('secondaryMessage')).toBe('8am - 7pm')
      expect(nextOrder.prop('trackButtonClick')).toBe(trackNextBoxTrackingClick)
      expect(nextOrder.prop('trackLinkClick')).toBe(trackClickGetHelpWithThisBox)
    })

    test('GetHelp API shouldShowEntryPointTooltip is called with the right parameters', () => {
      expect(shouldShowEntryPointTooltip).toHaveBeenCalledWith(
        ACCESS_TOKEN,
        upcomingOrders.getIn(['101', 'deliveryDate'])
      )
    })

    describe('and the call to GetHelp API shouldShowEntryPointTooltip errors', () => {
      const ERROR = new Error('error occurred')

      beforeEach(() => {
        shouldShowEntryPointTooltip.mockImplementationOnce(() => {
          throw ERROR
        })
        logger.warning = jest.fn()
        wrapper = mount(
          <Header
            accessToken={ACCESS_TOKEN}
          />
        )

        // Props changed so componentDidUpdate runs
        wrapper.setProps({ orders: upcomingOrders })
      })

      test('a warning is logged', () => {
        expect(logger.warning.mock.calls[0]).toEqual([
          `API call to shouldShowEntryPointTooltip for order with date ${upcomingOrders.getIn(['101', 'deliveryDate'])} thrown an error`,
          ERROR,
        ])
      })
    })

    describe('and the time is so a tooltip should show', () => {
      beforeEach(() => {
        shouldShowEntryPointTooltip.mockResolvedValueOnce({
          data: { day: 'same_day_evening' }
        })

        wrapper = mount(<Header accessToken={ACCESS_TOKEN} />)
        // Props changed so componentDidUpdate runs
        wrapper.setProps({ orders: orderForToday })
      })

      test('shows a tooltip pointing to the Get Help link', () => {
        wrapper.update() // Without it, subcomponents don't get the prop based on state propagated
        expect(wrapper.find('NextOrder').prop('hasTooltip')).toBe(true)
      })
    })

    describe('and the time is so a tooltip should not show', () => {
      beforeEach(() => {
        shouldShowEntryPointTooltip.mockResolvedValueOnce({
          data: { day: 'no' }
        })

        wrapper = mount(<Header accessToken={ACCESS_TOKEN} />)
        // Props changed so componentDidUpdate runs
        wrapper.setProps({ orders: orderForToday })
      })

      test('does not show any tooltip', () => {
        wrapper.update() // Without it, subcomponents don't get the prop based on state propagated
        expect(wrapper.find('NextOrder').prop('hasTooltip')).toBe(false)
      })
    })

    describe('and the next order is not for today', () => {
      beforeEach(() => {
        wrapper = mount(
          <Header
            accessToken={ACCESS_TOKEN}
            orders={upcomingOrders}
            trackClickGetHelpWithThisBox={trackClickGetHelpWithThisBox}
          />
        )
      })

      test('it passes hasDeliveryToday to NextOrder as false', () => {
        expect(wrapper.find('NextOrder').prop('hasDeliveryToday')).toBe(false)
      })

      test('shows a link that says "View my deliveries"', () => {
        expect(wrapper.find('NextOrder').prop('linkLabel')).toBe('View my deliveries')
      })

      test('shows link to my deliveries', () => {
        expect(wrapper.find('NextOrder').prop('linkUrl')).toBe('/my-deliveries')
      })
    })

    describe('and the next order is today', () => {
      beforeEach(() => {
        wrapper = mount(
          <Header
            accessToken={ACCESS_TOKEN}
            orders={orderForToday}
            trackClickGetHelpWithThisBox={trackClickGetHelpWithThisBox}
          />
        )
      })

      test('it passes hasDeliveryToday to NextOrder as true', () => {
        expect(wrapper.find('NextOrder').prop('hasDeliveryToday')).toBe(true)
      })

      test('explicitly shows that the order is arriving today', () => {
        expect(wrapper.find('NextOrder').prop('primaryMessage')).toBe('Today')
      })

      test('shows a link that says "Get help with this box"', () => {
        expect(wrapper.find('NextOrder').prop('linkLabel')).toBe('Get help with this box')
      })

      test('should link to getHelp page with order id', () => {
        expect(wrapper.find('NextOrder').prop('linkUrl')).toBe('/get-help?orderId=100')
      })
    })
  })

  describe('when a user has no upcoming orders', () => {
    beforeEach(() => {
      wrapper = mount(
        <Header
          accessToken={ACCESS_TOKEN}
          orders={previousOrders}
        />
      )
    })

    test('should render the NoNextOrder component with the right props', () => {
      const noNextOrder = wrapper.find('NoNextOrder')
      expect(noNextOrder.prop('linkLabel')).toBe("View this week's menu")
      expect(noNextOrder.prop('linkUrl')).toBe('/menu')
      expect(noNextOrder.prop('primaryMessage')).toBe('No boxes scheduled')
    })
  })

  describe('when a user has previously delivered orders', () => {
    beforeEach(() => {
      wrapper = mount(
        <Header
          accessToken={ACCESS_TOKEN}
          orders={previousOrders}
          trackClickGetHelpWithThisBox={trackClickGetHelpWithThisBox}
        />
      )
    })

    test('should render the PreviousOrder component with the right props', () => {
      const expectedDateString = moment().subtract(2, 'days').format('dddd Do MMMM')
      const previousOrder = wrapper.find('PreviousOrder')
      expect(previousOrder.prop('linkUrl')).toBe('/get-help?orderId=101')
      expect(previousOrder.prop('orderId')).toBe('101')
      expect(previousOrder.prop('message')).toBe(expectedDateString)
      expect(previousOrder.prop('trackClick')).toBe(trackClickGetHelpWithThisBox)
    })

    describe('and the call to GetHelp API shouldShowEntryPointTooltip errors', () => {
      const ERROR = new Error('error occurred')

      beforeEach(() => {
        shouldShowEntryPointTooltip.mockImplementationOnce(() => {
          throw ERROR
        })
        logger.warning = jest.fn()
        wrapper = mount(
          <Header
            accessToken={ACCESS_TOKEN}
          />
        )

        // Props changed so componentDidUpdate runs
        wrapper.setProps({ orders: previousOrders })
      })

      test('a warning is logged', () => {
        expect(logger.warning.mock.calls[0]).toEqual([
          `API call to shouldShowEntryPointTooltip for order with date ${previousOrders.getIn(['101', 'deliveryDate'])} thrown an error`,
          ERROR,
        ])
      })
    })

    describe('and the time is so a tooltip should show', () => {
      beforeEach(() => {
        shouldShowEntryPointTooltip.mockResolvedValueOnce({
          data: { day: 'yesterday' }
        })

        wrapper = mount(<Header accessToken={ACCESS_TOKEN} />)
        // Props changed so componentDidUpdate runs
        wrapper.setProps({ orders: previousOrders })
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

        wrapper = mount(<Header accessToken={ACCESS_TOKEN} />)
        // Props changed so componentDidUpdate runs
        wrapper.setProps({ orders: previousOrders })
      })

      test('sets hasTooltip to false in PreviousOrder', () => {
        wrapper.update() // Without it, subcomponents don't get the prop based on state propagated
        expect(wrapper.find('PreviousOrder').prop('hasTooltip')).toBe(false)
      })
    })

    describe('and the most recent order > 10 days ago', () => {
      beforeEach(() => {
        wrapper = mount(
          <Header
            accessToken={ACCESS_TOKEN}
            orders={onlyOldOrders}
            trackClickGetHelpWithThisBox={trackClickGetHelpWithThisBox}
          />
        )

        wrapper.find('CardWithLink').last().find('GoustoLink').simulate('click')
      })

      test('should link to general getHelp contact page', () => {
        const previousOrder = wrapper.find('PreviousOrder')
        expect(previousOrder.prop('linkUrl').includes(config.routes.client.getHelp.contact))
          .toBe(true)
      })
    })

    describe('and the most recent order < 10 days ago', () => {
      beforeEach(() => {
        wrapper = mount(
          <Header
            accessToken={ACCESS_TOKEN}
            orders={previousOrders}
            trackClickGetHelpWithThisBox={trackClickGetHelpWithThisBox}
          />
        )

        wrapper.find('CardWithLink').last().find('GoustoLink').simulate('click')
      })

      test('the PreviousOrder linkUrl prop is the getHelp page with order id', () => {
        const previousOrder = wrapper.find('PreviousOrder')
        expect(previousOrder.prop('linkUrl')).toBe('/get-help?orderId=101')
      })
    })
  })

  describe('when a user has no previously delivered orders', () => {
    test('does not show details of previous deliveries', () => {
      wrapper = mount(
        <Header
          accessToken={ACCESS_TOKEN}
          orders={upcomingOrders}
        />
      )
      expect(wrapper.find('PreviousOrder').exists()).toBe(false)
    })
  })

  describe('fetching the tracking URL for an order', () => {
    beforeEach(() => {
      wrapper = mount(
        <Header
          accessToken={ACCESS_TOKEN}
          loadOrderTrackingInfo={mockLoadOrderTrackingInfo}
          orders={Immutable.Map({})}
        />
      )
    })

    describe('when the user has an upcoming order', () => {
      describe('and the order is due to be delivered today', () => {
        test('fetches the tracking URL for the next order', () => {
          wrapper.setProps({ orders: orderForToday })
          expect(mockLoadOrderTrackingInfo).toHaveBeenCalledTimes(1)
          expect(mockLoadOrderTrackingInfo).toHaveBeenCalledWith('100')
        })
      })

      describe('and the order is not due to be delivered today', () => {
        test('does not try to fetch the tracking URL for any orders', () => {
          wrapper.setProps({ orders: upcomingOrders })
          expect(mockLoadOrderTrackingInfo).toHaveBeenCalledTimes(0)
        })
      })
    })

    describe('when the user has no upcoming orders', () => {
      test('does not try to fetch the tracking URL for any orders', () => {
        wrapper.setProps({ orders: previousOrders })
        expect(mockLoadOrderTrackingInfo).toHaveBeenCalledTimes(0)
      })
    })
  })

  describe('when isSSRVisibilityOnMyGoustoEnabled flag is not passed', () => {
    test('renders Get Help with Next box card on the left side, Last box - on the right', () => {
      expect(wrapper.find('h2').at(0).text()).toBe('Your next box delivery')
      expect(wrapper.find('h2').at(1).text()).toBe('Your most recent box delivery')
    })
  })

  describe('when isSSRVisibilityOnMyGoustoEnabled flag is set to true', () => {
    beforeEach(() => {
      wrapper.setProps({ isSSRVisibilityOnMyGoustoEnabled: true })
    })

    test('renders Get Help with Last box card on the left side, Next box - on the right', () => {
      expect(wrapper.find('h2').at(0).text()).toBe('Your most recent box delivery')
      expect(wrapper.find('h2').at(1).text()).toBe('Your next box delivery')
    })
  })
})
