import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'
import { DeliverySlot } from '../DeliverySlot'

describe('given the DeliverySlot is rendered', () => {
  let wrapper
  const getBoxSummaryTextProps = jest.fn()

  beforeEach(() => {
    const deliveryDays = Immutable.Map({
      '2019-03-03': Immutable.Map({
        date: '2019-03-03',
        id: 'djhdhds',
        slots: Immutable.fromJS([
          {
            deliveryStartTime: '08:00:00',
            deliveryEndTime: '19:00:00',
            id: '123sddrdfst456',
            disabledSlotId: '2019-03-03_08-19',
          },
          {
            deliveryStartTime: '18:00:00',
            deliveryEndTime: '22:00:00',
            id: '987sddrdfst456',
            disabledSlotId: '2019-03-03_18-22',
          },
        ]),
      }),
    })
    const disabledSlots = ['2019-03-03_08-19', '2019-02-04_08-12']
    const isSubscriptionActive = 'inactive'

    getBoxSummaryTextProps.mockReturnValue({
      deliveryLocationText: 'W140EE',
      slotId: '123sddrdfst456',
      buttonText: 'Chose recipes',
      showWarning: false,
    })

    wrapper = shallow(
      <DeliverySlot
        deliveryDays={deliveryDays}
        disabledSlots={disabledSlots}
        isAuthenticated
        isSubscriptionActive={isSubscriptionActive}
        tempDate="2019-03-03"
        clearPostcode={jest.fn()}
        getBoxSummaryTextProps={getBoxSummaryTextProps}
        basketRestorePreviousValues={() => {}}
        boxSummaryNext={() => {}}
        numPortions={2}
      />,
    )
  })

  describe.each([
    [false, false, 1],
    [true, true, 0],
    [true, false, 0],
    [false, true, 0],
  ])(
    'when user slots are set to %s and orders loading state is %s',
    (userHasAvailableSlots, userOrderLoadingState, expected) => {
      beforeEach(() => {
        wrapper.setProps({
          userHasAvailableSlots,
          userOrderLoadingState,
        })
      })

      test(`renders ${expected} Alert for the capacity message`, () => {
        expect(wrapper.find('Alert').length).toBe(expected)
      })
    },
  )
})

describe('DeliverySlot logic', () => {
  let deliveryDays
  let wrapper
  let disabledSlots
  let isAuthenticated
  let isSubscriptionActive
  const getBoxSummaryTextProps = jest.fn()

  beforeEach(() => {
    deliveryDays = Immutable.Map({
      '2019-03-03': Immutable.Map({
        date: '2019-03-03',
        id: 'djhdhds',
        slots: Immutable.List([
          Immutable.Map({
            deliveryStartTime: '08:00:00',
            deliveryEndTime: '19:00:00',
            id: '123sddrdfst456',
            disabledSlotId: '2019-03-03_08-19',
          }),
          Immutable.Map({
            deliveryStartTime: '18:00:00',
            deliveryEndTime: '22:00:00',
            id: '987sddrdfst456',
            disabledSlotId: '2019-03-03_18-22',
          }),
        ]),
      }),
    })
    disabledSlots = ['2019-03-03_08-19', '2019-02-04_08-12']
    isAuthenticated = true
    isSubscriptionActive = 'inactive'
    getBoxSummaryTextProps.mockReturnValue({
      deliveryLocationText: 'W140EE',
      slotId: '123sddrdfst456',
      buttonText: 'Chose recipes',
      showWarning: false,
    })
  })

  describe('Render Function', () => {
    test('should show limited availability text when doesDateHaveDisabledSlots is true, user is logged in and subscription is inactive', () => {
      wrapper = shallow(
        <DeliverySlot
          deliveryDays={deliveryDays}
          disabledSlots={disabledSlots}
          isAuthenticated={isAuthenticated}
          isSubscriptionActive={isSubscriptionActive}
          tempDate="2019-03-03"
          clearPostcode={jest.fn()}
          getBoxSummaryTextProps={getBoxSummaryTextProps}
          basketRestorePreviousValues={() => {}}
          boxSummaryNext={() => {}}
          numPortions={2}
        />,
      )
      expect(wrapper.find('DeliverySupportingText').prop('doesDateHaveDisabledSlots')).toBe(true)
    })

    test('should show free delivery available reminder', () => {
      wrapper = shallow(
        <DeliverySlot
          deliveryDays={deliveryDays}
          disabledSlots={disabledSlots}
          isAuthenticated={isAuthenticated}
          isSubscriptionActive={isSubscriptionActive}
          tempDate="2019-03-03"
          clearPostcode={jest.fn()}
          getBoxSummaryTextProps={getBoxSummaryTextProps}
          basketRestorePreviousValues={() => {}}
          boxSummaryNext={() => {}}
          numPortions={2}
        />,
      )
      expect(wrapper.find('.highlightText').text()).toContain(
        'Free delivery available, 7 days a week',
      )
    })

    test('should NOT show limited availability text when doesDateHaveDisabledSlots is true, user is logged in but subscription is ACTIVE', () => {
      wrapper = shallow(
        <DeliverySlot
          deliveryDays={deliveryDays}
          disabledSlots={disabledSlots}
          isAuthenticated={isAuthenticated}
          isSubscriptionActive="active"
          tempDate="2019-03-03"
          clearPostcode={jest.fn()}
          getBoxSummaryTextProps={getBoxSummaryTextProps}
          basketRestorePreviousValues={() => {}}
          boxSummaryNext={() => {}}
          numPortions={2}
        />,
      )
      expect(wrapper.find('DeliverySupportingText').prop('doesDateHaveDisabledSlots')).toBe(false)
    })
  })

  describe('Delivery slot buttons', () => {
    describe('when shouldDisplayFullScreenBoxSummary is false', () => {
      beforeAll(() => {
        wrapper = shallow(
          <DeliverySlot
            deliveryDays={deliveryDays}
            disabledSlots={disabledSlots}
            deliverySlotChosen={jest.fn()}
            isAuthenticated={isAuthenticated}
            isSubscriptionActive={isSubscriptionActive}
            tempDate="2019-03-03"
            clearPostcode={jest.fn()}
            getBoxSummaryTextProps={getBoxSummaryTextProps}
            basketRestorePreviousValues={() => {}}
            boxSummaryNext={() => {}}
            numPortions={2}
          />,
        )
      })
      test('should NOT render sticky button', () => {
        expect(wrapper.find('.stickyButton').exists()).toBe(false)
      })
    })

    describe('when shouldDisplayFullScreenBoxSummary is true', () => {
      beforeAll(() => {
        wrapper = shallow(
          <DeliverySlot
            deliveryDays={deliveryDays}
            disabledSlots={disabledSlots}
            deliverySlotChosen={jest.fn()}
            isAuthenticated={isAuthenticated}
            isSubscriptionActive={isSubscriptionActive}
            tempDate="2019-03-03"
            clearPostcode={jest.fn()}
            getBoxSummaryTextProps={getBoxSummaryTextProps}
            basketRestorePreviousValues={() => {}}
            boxSummaryNext={() => {}}
            numPortions={2}
            shouldDisplayFullScreenBoxSummary
          />,
        )
      })
      test('should render sticky button', () => {
        expect(wrapper.find('.stickyButton').exists()).toBe(true)
      })
    })

    describe('when all slots are disabled for temp date', () => {
      test('then CTA should be disabled', () => {
        wrapper = shallow(
          <DeliverySlot
            tempOrderId="mock-order-id"
            deliveryDays={deliveryDays}
            disabledSlots={['2019-03-03_08-19', '2019-03-03_08-12', '2019-03-03_18-22']}
            deliverySlotChosen={jest.fn()}
            isAuthenticated={isAuthenticated}
            isSubscriptionActive={isSubscriptionActive}
            tempDate="2019-03-03"
            clearPostcode={jest.fn()}
            getBoxSummaryTextProps={getBoxSummaryTextProps}
            basketRestorePreviousValues={() => {}}
            boxSummaryNext={() => {}}
            numPortions={2}
            shouldDisplayFullScreenBoxSummary
          />,
        )

        expect(wrapper.find('.boxSummaryContinueButton').prop('disabled')).toBe(true)
      })
    })

    describe('when all slots are NOT disabled for temp date', () => {
      test('then CTA should NOT be disabled', () => {
        wrapper = shallow(
          <DeliverySlot
            tempOrderId="mock-order-id"
            deliveryDays={deliveryDays}
            disabledSlots={['2019-03-03_08-19', '2019-03-03_08-12']}
            deliverySlotChosen={jest.fn()}
            isAuthenticated={isAuthenticated}
            isSubscriptionActive={isSubscriptionActive}
            tempDate="2019-03-03"
            clearPostcode={jest.fn()}
            getBoxSummaryTextProps={getBoxSummaryTextProps}
            basketRestorePreviousValues={() => {}}
            boxSummaryNext={() => {}}
            numPortions={2}
            shouldDisplayFullScreenBoxSummary
          />,
        )
        expect(wrapper.find('.boxSummaryContinueButton').prop('disabled')).toBe(false)
      })
    })
  })
})
