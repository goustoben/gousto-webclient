import React from 'react'
import { shallow } from 'enzyme'
import { ChoosePlan } from '../ChoosePlan'

describe('ChoosePlan', () => {
  let wrapper = shallow(<ChoosePlan />)
  it('should render a title', () => {
    expect(wrapper.find('.title').length).toEqual(1)
  })

  it('should render a subtitle', () => {
    expect(wrapper.find('.subtitle').length).toEqual(1)
  })

  it('should render a button', () => {
    expect(wrapper.find('Button').length).toEqual(1)
  })

  describe('Surcharge message', () => {
    it('should render a message about surcharges if there are any premium recipes or delivery slots chosen ', () => {
      wrapper = shallow(<ChoosePlan extrasIncluded />)

      expect(wrapper.find('Alert').length).toEqual(1)
    })

    it('should NOT render a message about surcharges if there are no premium recipes or delivery slots chosen ', () => {
      wrapper = shallow(<ChoosePlan extrasIncluded={false} />)

      expect(wrapper.find('Alert').length).toEqual(0)
    })
  })

})
