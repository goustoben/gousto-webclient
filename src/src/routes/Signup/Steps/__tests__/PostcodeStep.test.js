import React from 'react'
import { shallow } from 'enzyme'
import { PostcodeStep } from '../Postcode/PostcodeStep'

describe('Postcode Step', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<PostcodeStep />)
  })

  test('renders an image in the header', () => {
    expect(wrapper.find('SignupImage')).toHaveLength(1)
    expect(wrapper.find('SignupImage').prop('name')).toBe('where-to-deliver')
  })

  describe('when the pricing clarity experiment is on', () => {
    beforeEach(() => {
      wrapper.setProps({ isPricingClarityEnabled: true })
    })

    test('then it renders correctly', () => {
      expect(wrapper.hasClass('pricingClarityRedesign')).toBeTruthy()
      expect(wrapper.find('SignupImage')).toHaveLength(0)
    })
  })
})
