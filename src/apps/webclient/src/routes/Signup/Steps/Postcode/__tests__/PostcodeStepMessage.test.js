import React from 'react'

import { shallow } from 'enzyme'

import { PostcodeStepMessage } from '../PostcodeStepMessage'

jest.mock('containers/OptimizelyRollouts', () => ({
  isOptimizelyFeatureEnabledFactory: jest.fn().mockImplementation(() => async () => false),
  useIsOptimizelyFeatureEnabled: jest.fn().mockReturnValue(false),
}))

describe('PostcodeStepMessage', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<PostcodeStepMessage />)
  })

  test('renders correctly', () => {
    expect(wrapper.find('.bodyText').text()).toBe('<Svg />Free UK delivery, 7 days a week')
  })

  describe('when deliveryDaysError is set', () => {
    beforeEach(() => {
      wrapper.setProps({
        deliveryDaysError: 'some-error',
      })
    })

    test('then an error message should be rendered', () => {
      expect(wrapper.find('.errorText').text()).toBe('Please enter a valid postcode')
    })
  })

  describe('when deliveryDaysError is do-not-deliver', () => {
    beforeEach(() => {
      wrapper.setProps({
        deliveryDaysError: 'do-not-deliver',
      })
    })

    test('then a different error message should be rendered', () => {
      expect(wrapper.find('.errorText').text()).toBe(
        'Sorry, it looks like we don’t currently deliver to your area.',
      )
    })
  })

  describe('when isGoustoOnDemandEnabled is on', () => {
    beforeEach(() => {
      wrapper.setProps({
        isGoustoOnDemandEnabled: true,
      })
    })

    test('then it should render the common Benefits component instead of the message', () => {
      expect(wrapper.find('Benefits').exists()).toBe(true)
    })
  })
})
