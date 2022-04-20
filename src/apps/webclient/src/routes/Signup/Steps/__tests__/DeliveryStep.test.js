import React from 'react'
import Immutable from 'immutable'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import * as Redux from 'react-redux'
import DropdownInput from 'Form/Dropdown'
import { unbounce as unbounceRoutes } from 'config/routes'
import { DeliveryStep } from '../Delivery/DeliveryStep'

const mockStore = configureMockStore()
const mockedStore = mockStore({
  features: Immutable.Map(),
  signup: Immutable.Map(),
})
const dispatch = jest.fn()
jest.spyOn(Redux, 'useDispatch').mockImplementation(() => dispatch)
jest.spyOn(Redux, 'useSelector').mockImplementation(() => false)
jest.mock('containers/OptimizelyRollouts', () => ({
  isOptimizelyFeatureEnabledFactory: jest.fn().mockImplementation(() => async () => false),
  useIsOptimizelyFeatureEnabled: jest.fn().mockReturnValue(false),
}))

describe('Delivery Step', () => {
  let wrapper
  const boxSummaryDeliveryDays = Immutable.fromJS({
    '2020-02-14': {
      date: '2020-02-14',
      isDefault: false,
      alternateDeliveryDay: null,
      slots: [
        {
          id: '1',
          coreSlotId: '1',
          deliveryEndTime: '19:00:00',
          deliveryPrice: '0.00',
          isDefault: true,
          deliveryStartTime: '08:00:00',
          disabledSlotId: '2020-02-14_08-19',
        },
        {
          id: '2',
          coreSlotId: '2',
          deliveryEndTime: '12:00:00',
          deliveryPrice: '2.99',
          isDefault: false,
          deliveryStartTime: '08:00:00',
          disabledSlotId: '2020-02-14_08-12',
        },
      ],
    },
    '2020-02-15': {
      date: '2020-02-15',
      isDefault: false,
      alternateDeliveryDay: null,
      slots: [
        {
          id: '3',
          coreSlotId: '1',
          deliveryEndTime: '19:00:00',
          deliveryPrice: '0.00',
          isDefault: true,
          deliveryStartTime: '08:00:00',
          disabledSlotId: '2020-02-15_08-19',
        },
        {
          id: '4',
          coreSlotId: '2',
          deliveryEndTime: '12:00:00',
          deliveryPrice: '2.99',
          isDefault: false,
          deliveryStartTime: '08:00:00',
          disabledSlotId: '2020-02-15_08-12',
        },
      ],
    },
  })
  const trackSignupWizardAction = jest.fn()

  beforeEach(() => {
    wrapper = mount(
      <Provider store={mockedStore}>
        <DeliveryStep
          boxSummaryDeliveryDays={boxSummaryDeliveryDays}
          tempDate="2020-02-14"
          tempSlotId="1"
          trackSignupWizardAction={trackSignupWizardAction}
        />
      </Provider>
    )
  })

  test('renders an image in the header', () => {
    expect(wrapper.find('SignupImage')).toHaveLength(1)
    expect(wrapper.find('SignupImage').prop('name')).toBe('delivery-day')
  })

  describe('Capacity Message', () => {
    describe('When all slots are disabled', () => {
      beforeEach(() => {
        wrapper = mount(
          <Provider store={mockedStore}>
            <DeliveryStep
              boxSummaryDeliveryDays={boxSummaryDeliveryDays}
              tempDate="2020-02-14"
              tempSlotId="1"
              trackSignupWizardAction={trackSignupWizardAction}
              disabledSlots={['2020-02-14_08-12', '2020-02-14_08-19']}
              userHasAvailableSlots={false}
            />
          </Provider>
        )
      })

      test('should display the capacity alert', () => {
        expect(wrapper.find('a').prop('href')).toBe(unbounceRoutes.covid)
      })
    })

    describe('When slots are available', () => {
      beforeEach(() => {
        wrapper = mount(
          <Provider store={mockedStore}>
            <DeliveryStep
              boxSummaryDeliveryDays={boxSummaryDeliveryDays}
              tempDate="2020-02-14"
              tempSlotId="1"
              trackSignupWizardAction={trackSignupWizardAction}
              disabledSlots={['2020-02-14_08-12', '2020-02-14_08-19']}
              userHasAvailableSlots
            />
          </Provider>
        )
      })

      test('should not display the capacity alert', () => {
        expect(wrapper.find('Alert').exists()).toBeFalsy()
      })
    })
  })

  describe('Delivery day dropdown', () => {
    let deliveryDayDropdown

    beforeEach(() => {
      deliveryDayDropdown = wrapper.find(DropdownInput).at(0)
    })

    test('should display correct dropdown options', () => {
      const expectedOptions = [
        {
          date: '2020-02-14',
          value: '2020-02-14',
          disabled: false,
          label: 'Fridays (starting 14th Feb)',
        },
        {
          date: '2020-02-15',
          value: '2020-02-15',
          disabled: false,
          label: 'Saturdays (starting 15th Feb)',
        },
      ]
      expect(deliveryDayDropdown.prop('options')).toEqual(expectedOptions)
    })

    test('should pre select temp date', () => {
      expect(deliveryDayDropdown.prop('value')).toEqual('2020-02-14')
    })

    describe('when all slots for a given day are disabled', () => {
      beforeEach(() => {
        wrapper = mount(
          <Provider store={mockedStore}>
            <DeliveryStep
              boxSummaryDeliveryDays={boxSummaryDeliveryDays}
              tempDate="2020-02-14"
              tempSlotId="1"
              trackSignupWizardAction={trackSignupWizardAction}
              disabledSlots={['2020-02-14_08-12', '2020-02-14_08-19']}
            />
          </Provider>
        )
        deliveryDayDropdown = wrapper.find(DropdownInput).at(0)
      })

      test('should add disabled attribute to relevant day', () => {
        const expectedOptions = [
          {
            date: '2020-02-14',
            value: '2020-02-14',
            disabled: true,
            label: 'Fridays (starting 14th Feb)',
          },
          {
            date: '2020-02-15',
            value: '2020-02-15',
            disabled: false,
            label: 'Saturdays (starting 15th Feb)',
          },
        ]
        expect(deliveryDayDropdown.prop('options')).toEqual(expectedOptions)
      })
    })
  })

  describe('Delivery slot dropdown', () => {
    let deliverySlotDropdown

    beforeEach(() => {
      deliverySlotDropdown = wrapper.find(DropdownInput).at(1)
    })

    test('should display correct dropdown options', () => {
      const expectedOptions = [
        {
          label: '8am - 7pm',
          subLabel: 'Free',
          value: '1',
          coreSlotId: '1',
          disabled: false,
        },
        {
          label: '8am - 12pm',
          subLabel: '£2.99',
          value: '2',
          coreSlotId: '2',
          disabled: false,
        },
      ]
      expect(deliverySlotDropdown.prop('options')).toEqual(expectedOptions)
    })

    test('should pre select temp slot', () => {
      expect(deliverySlotDropdown.prop('value')).toEqual('1')
    })

    describe('when slots is  disabled', () => {
      beforeEach(() => {
        wrapper = mount(
          <Provider store={mockedStore}>
            <DeliveryStep
              boxSummaryDeliveryDays={boxSummaryDeliveryDays}
              tempDate="2020-02-14"
              tempSlotId="1"
              trackSignupWizardAction={trackSignupWizardAction}
              disabledSlots={['2020-02-14_08-12']}
            />
          </Provider>
        )
        deliverySlotDropdown = wrapper.find(DropdownInput).at(1)
      })

      test('should add disabled attribute to relevant slot', () => {
        const expectedOptions = [
          {
            label: '8am - 7pm',
            subLabel: 'Free',
            value: '1',
            coreSlotId: '1',
            disabled: false,
          },
          {
            label: '8am - 12pm',
            subLabel: '£2.99',
            value: '2',
            coreSlotId: '2',
            disabled: true,
          },
        ]
        expect(deliverySlotDropdown.prop('options')).toEqual(expectedOptions)
      })
    })
  })
})
