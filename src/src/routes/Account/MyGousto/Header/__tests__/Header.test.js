import React from 'react'
import { mount } from 'enzyme'
import Immutable from 'immutable'
import moment from 'moment'
import config from 'config'
import { shouldShowEntryPointTooltip } from 'apis/getHelp'
import * as windowUtils from 'utils/window'
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
    let nextDeliveryDetails

    beforeEach(() => {
      wrapper = mount(
        <Header
          accessToken={ACCESS_TOKEN}
        />
      )

      // Props changed so componentDidUpdate runs
      wrapper.setProps({ orders: upcomingOrders })

      nextDeliveryDetails = wrapper.find('OrderDetails').first()
    })

    test('should show the correct date of the next order to be delivered', () => {
      const expectedDateString = moment().add(2, 'days').format('dddd Do MMMM')
      expect(nextDeliveryDetails.find('.message').first().text()).toBe(expectedDateString)
    })

    test('should show the correct delivery times of the next order to be delivered', () => {
      expect(nextDeliveryDetails.find('.message').last().text()).toBe('8am - 7pm')
    })

    test('does not render a tracking button if a tracking URL is not available', () => {
      expect(wrapper.find('CardWithLink').first().find('Button').exists()).toBe(false)
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
        expect(wrapper.find('CardWithLink').first().find('InfoTip'))
          .toHaveLength(1)
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
        expect(wrapper.find('CardWithLink').first().find('InfoTip').exists())
          .toBe(false)
      })
    })

    describe('and the next order is not for today', () => {
      beforeEach(() => {
        wrapper = mount(
          <Header
            accessToken={ACCESS_TOKEN}
            orders={upcomingOrders}
          />
        )
      })

      test('shows a link that says "View my deliveries"', () => {
        const linkLabel = wrapper.find('CardWithLink').first().prop('linkLabel')
        expect(linkLabel).toBe('View my deliveries')
      })

      test('shows link to my deliveries', () => {
        const linkUrl = wrapper.find('CardWithLink').first().prop('linkUrl')
        expect(linkUrl).toContain('/my-deliveries')
      })

      test('shows a link that is not client routed', () => {
        const clientRouted = wrapper.find('CardWithLink').first()
          .find('GoustoLink').prop('clientRouted')
        expect(clientRouted).toBe(false)
      })
    })

    describe('and the next order is today', () => {
      beforeEach(() => {
        wrapper = mount(
          <Header
            accessToken={ACCESS_TOKEN}
            orders={orderForToday}
          />
        )
        nextDeliveryDetails = wrapper.find('OrderDetails').first()
      })

      test('explicitly shows that the order is arriving today', () => {
        expect(nextDeliveryDetails.find('.message').first().text()).toBe('Today')
      })

      test('shows a link that says "Get help with this box"', () => {
        const linkLabel = wrapper.find('CardWithLink').first().prop('linkLabel')
        expect(linkLabel).toBe('Get help with this box')
      })

      test('should link to getHelp page with order id', () => {
        const linkUrl = wrapper.find('CardWithLink').first().prop('linkUrl')
        expect(linkUrl.includes('/get-help?orderId=100')).toBe(true)
      })

      test('shows a link that is client routed', () => {
        const clientRouted = wrapper.find('CardWithLink').first()
          .find('GoustoLink').prop('clientRouted')
        expect(clientRouted).toBe(true)
      })
    })

    describe('and a tracking URL is available for the next order', () => {
      const TRACKING_URL = 'https://test-tracking-url/order-id'
      const mockTrackNextBoxTrackingClick = jest.fn()

      beforeEach(() => {
        wrapper = mount(
          <Header
            accessToken={ACCESS_TOKEN}
            trackNextBoxTrackingClick={mockTrackNextBoxTrackingClick}
            orders={upcomingOrders}
            nextOrderTracking={TRACKING_URL}
          />
        )
      })

      test('renders a track my box button', () => {
        expect(wrapper.find('CardWithLink').first().find('Button').text()).toBe('Track my box')
      })

      describe('and the tracking button is clicked', () => {
        let windowOpenSpy

        beforeEach(() => {
          windowOpenSpy = jest.spyOn(windowUtils, 'windowOpen')
          wrapper.find('CardWithLink').find('SegmentPresentation').last().simulate('click')
        })

        afterEach(() => {
          jest.clearAllMocks()
        })

        test('opens the tracking page in a new tab', () => {
          expect(windowOpenSpy).toHaveBeenCalledWith(TRACKING_URL)
        })

        test('dispatches the tracking action', () => {
          expect(mockTrackNextBoxTrackingClick).toHaveBeenCalledTimes(1)
        })
      })
    })
  })

  describe('when a user has no upcoming orders', () => {
    test('should show the no upcoming orders message', () => {
      wrapper = mount(
        <Header
          accessToken={ACCESS_TOKEN}
          orders={previousOrders}
        />
      )
      const nextDeliveryDetails = wrapper.find('OrderDetails').first()
      expect(nextDeliveryDetails.find('.message').first().text()).toBe('No boxes scheduled')
    })

    test('shows a link that says "View this week\'s menu"', () => {
      const linkLabel = wrapper.find('CardWithLink').first().prop('linkLabel')
      expect(linkLabel).toBe('View this week\'s menu')
    })

    test('shows link to the menu', () => {
      const linkUrl = wrapper.find('CardWithLink').first().prop('linkUrl')
      expect(linkUrl).toContain('/menu')
    })

    test('shows a link that is client routed', () => {
      const clientRouted = wrapper.find('CardWithLink').first()
        .find('GoustoLink').prop('clientRouted')
      expect(clientRouted).toBe(true)
    })
  })

  describe('when a user has previously delivered orders', () => {
    let previousDeliveryDetails
    const mockOrderNotEligibleClick = jest.fn()
    const mockOrderEligibleClick = jest.fn()

    beforeEach(() => {
      wrapper = mount(
        <Header
          accessToken={ACCESS_TOKEN}
          orders={previousOrders}
        />
      )
      previousDeliveryDetails = wrapper.find('OrderDetails').at(1)
    })

    test('should show the correct date of the next order to be delivered', () => {
      const expectedDateString = moment().subtract(2, 'days').format('dddd Do MMMM')
      expect(previousDeliveryDetails.find('.message').first().text()).toContain(expectedDateString)
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

      test('shows a tooltip pointing to the Get Help link', () => {
        wrapper.update() // Without it, subcomponents don't get the prop based on state propagated
        expect(wrapper.find('CardWithLink').last().find('InfoTip'))
          .toHaveLength(1)
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

      test('does not show any tooltip', () => {
        wrapper.update() // Without it, subcomponents don't get the prop based on state propagated
        expect(wrapper.find('CardWithLink').last().find('InfoTip').exists())
          .toBe(false)
      })
    })

    describe('and the most recent order > 10 days ago', () => {
      beforeEach(() => {
        wrapper = mount(
          <Header
            accessToken={ACCESS_TOKEN}
            orders={onlyOldOrders}
            trackOrderNotEligibleForSelfServiceResolutionClick={mockOrderNotEligibleClick}
            trackOrderEligibleForSelfServiceResolutionClick={mockOrderEligibleClick}
          />
        )

        wrapper.find('CardWithLink').last().find('GoustoLink').simulate('click')
      })

      test('should link to general getHelp contact page', () => {
        const linkUrl = wrapper.find('CardWithLink').last().prop('linkUrl')
        expect(linkUrl.includes(config.routes.client.getHelp.contact)).toBe(true)
      })

      test('does not dispatches the "eligible tracking action"', () => {
        expect(mockOrderEligibleClick).not.toHaveBeenCalled()
      })

      test('dispatches the "non-eligible tracking action"', () => {
        expect(mockOrderNotEligibleClick).toHaveBeenCalledWith(12)
      })
    })

    describe('and the most recent order < 10 days ago', () => {
      beforeEach(() => {
        wrapper = mount(
          <Header
            accessToken={ACCESS_TOKEN}
            trackOrderNotEligibleForSelfServiceResolutionClick={mockOrderNotEligibleClick}
            orders={previousOrders}
            trackOrderEligibleForSelfServiceResolutionClick={mockOrderEligibleClick}
          />
        )

        wrapper.find('CardWithLink').last().find('GoustoLink').simulate('click')
      })

      test('should link to getHelp page with order id', () => {
        const linkUrl = wrapper.find('CardWithLink').last().prop('linkUrl')
        expect(linkUrl.includes('/get-help?orderId=101')).toBe(true)
      })

      test('dispatches the "eligible tracking action"', () => {
        expect(mockOrderEligibleClick).toHaveBeenCalledWith('101')
      })

      test('does not dispatches the "non-eligible tracking action"', () => {
        expect(mockOrderNotEligibleClick).not.toHaveBeenCalled()
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
      expect(wrapper.find('OrderDetails')).toHaveLength(1)
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
})
