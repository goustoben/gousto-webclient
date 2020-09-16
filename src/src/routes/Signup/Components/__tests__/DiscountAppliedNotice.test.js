import React from 'react'
import { shallow } from 'enzyme'
import config from 'config/signup'
import { DiscountAppliedNotice } from '../DiscountAppliedNotice/DiscountAppliedNotice'

describe('given we are rendering DiscountAppliedNotice', () => {
  test('then it renders correctly', () => {
    const wrapper = shallow(<DiscountAppliedNotice />)
    expect(wrapper.text()).toMatch(config.boxSizeStep.discountApplied)
  })
})
