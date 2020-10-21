import React from 'react'
import { mount } from 'enzyme'
import { DeliveryValidation } from '../DeliveryValidation'

jest.mock('../../DontKnowWhen/DeliveryCompensation', () => ({ DeliveryCompensation: () => (<div />) }))

describe('<DeliveryValidation />', () => {
  const COMPENSATION_AMOUNT = 25
  const USER_ID = '1234'
  const ORDER_ID = '5678'
  const validateDeliveryActionMock = jest.fn()
  const PROPS = {
    compensationAmount: null,
    hasPassedDeliveryValidation: false,
    isDeliveryValidationPending: false,
    params: { orderId: ORDER_ID, userId: USER_ID },
    validateDeliveryAction: validateDeliveryActionMock,
  }
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <DeliveryValidation {...PROPS} />
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders without crashing', () => {})

  test('validates customer\'s eligibility for delivery compensation', () => {
    expect(validateDeliveryActionMock).toHaveBeenCalledWith(USER_ID, ORDER_ID)
  })

  describe('When the validation check is still in progress', () => {
    beforeEach(() => {
      wrapper.setProps({ isDeliveryValidationPending: true })
    })
    test('renders <LoadingWrapper />', () => {
      expect(wrapper.find('LoadingWrapper').exists()).toBe(true)
    })
  })

  describe('When the validation check has been completed', () => {
    beforeEach(() => {
      wrapper.setProps({ isDeliveryValidationPending: true })
      wrapper.setProps({ isDeliveryValidationPending: false })
    })

    describe('and the validation has passed', () => {
      beforeEach(() => {
        wrapper.setProps({
          compensationAmount: COMPENSATION_AMOUNT,
          hasPassedDeliveryValidation: true,
        })
      })
      test('renders <DeliveryCompensation> passing the compensationAmount, userId, orderId, backUrl as props', () => {
        expect(wrapper.find('DeliveryCompensation').prop('compensationAmount')).toBe(COMPENSATION_AMOUNT)
        expect(wrapper.find('DeliveryCompensation').prop('userId')).toBe(USER_ID)
        expect(wrapper.find('DeliveryCompensation').prop('orderId')).toBe(ORDER_ID)
        expect(wrapper.find('DeliveryCompensation').prop('backUrl'))
          .toBe(`/get-help/user/${USER_ID}/order/${ORDER_ID}/delivery`)
      })
    })
    describe('and the validation failed', () => {
      beforeEach(() => {
        wrapper.setProps({
          compensationAmount: null,
          hasPassedDeliveryValidation: false,
        })
      })
      test('renders <DeliveryPreContact> passing the backUrl', () => {
        expect(wrapper.find('DeliveryPreContact').prop('backUrl'))
          .toBe(`/get-help/user/${USER_ID}/order/${ORDER_ID}/delivery`)
      })
    })
  })
})
