import React from 'react'
import { shallow } from 'enzyme'
import { ChoosePlanBenefit } from '../ChoosePlanBenefit'

describe('ChoosePlanBenefit', () => {
  it('should render a list of benefits', () => {
    const benefits = [
      'Choose [X] recipes for [X] each week" (based on # of recipes picked on the menu and box size)',
      'Cancel or pause online at any time',
      '[50%] off first box + [30%] off all boxes in the first month',
      'Surprise gifts!'
    ]
    const wrapper = shallow(<ChoosePlanBenefit
      benefits={benefits}
    />)

    expect(wrapper.find('.list').length).toEqual(1)
    expect(wrapper.find('li').length).toEqual(benefits.length)
  })
})
