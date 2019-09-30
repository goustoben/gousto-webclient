import React from 'react'
import { shallow } from 'enzyme'
import { ChoosePlan } from '../ChoosePlan'

describe('ChoosePlan', () => {
  it('should render a title', () => {
    const wrapper = shallow(<ChoosePlan />)

    expect(wrapper.find('.title').length).toEqual(1)
  })

  it('should render a subtitle', () => {
    const wrapper = shallow(<ChoosePlan />)

    expect(wrapper.find('.subtitle').length).toEqual(1)
  })

  it('should render a button', () => {
    const wrapper = shallow(<ChoosePlan />)

    expect(wrapper.find('Button').length).toEqual(1)
  })
})
