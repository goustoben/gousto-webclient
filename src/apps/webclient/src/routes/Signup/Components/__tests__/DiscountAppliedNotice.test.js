import React from 'react'

import { shallow } from 'enzyme'

import { signupConfig } from 'routes/Signup/signupConfig'

import { DiscountAppliedNotice } from '../DiscountAppliedNotice/DiscountAppliedNotice'

describe('given we are rendering DiscountAppliedNotice', () => {
  test('then it renders correctly', () => {
    const wrapper = shallow(<DiscountAppliedNotice />)
    expect(wrapper.text()).toMatch(signupConfig.boxSizeStep.discountApplied)
  })
})
