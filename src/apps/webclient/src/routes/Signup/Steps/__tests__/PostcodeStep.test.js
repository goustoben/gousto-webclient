import React from 'react'

import { shallow } from 'enzyme'

import { PostcodeStep } from '../Postcode/PostcodeStep'

jest.mock('containers/OptimizelyRollouts', () => ({
  isOptimizelyFeatureEnabledFactory: jest.fn().mockImplementation(() => async () => false),
  useIsOptimizelyFeatureEnabled: jest.fn().mockReturnValue(false),
}))

describe('Postcode Step', () => {
  let wrapper
  const changePostcode = jest.fn()
  const signupGetCountByPostcode = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <PostcodeStep
        changePostcode={changePostcode}
        tempPostcode="temp_postcode"
        nextStepName="next_step"
        signupGetCountByPostcode={signupGetCountByPostcode}
      />,
    )
  })

  test('renders correctly', () => {
    expect(wrapper.find('SignupImage')).toHaveLength(1)
    expect(wrapper.find('SignupImage').prop('name')).toBe('where-to-deliver')

    expect(wrapper.find('PostcodeStepMessage').exists()).toBe(true)
  })

  describe('when the button is clicked', () => {
    beforeEach(() => {
      wrapper.find('Connect(Button)').simulate('click')
    })

    test('then changePostcode should be called', () => {
      expect(changePostcode).toHaveBeenCalledWith('temp_postcode', 'next_step')
    })

    test('then signupGetCountByPostcode should be called', () => {
      expect(signupGetCountByPostcode).toHaveBeenCalledWith('temp_postcode')
    })
  })
})
