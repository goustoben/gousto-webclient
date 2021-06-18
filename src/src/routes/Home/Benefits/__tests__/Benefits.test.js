import React from 'react'
import { shallow } from 'enzyme'
import { Benefits } from '../Benefits'

describe('Benefits', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Benefits />)
  })

  test('should render correctly', () => {
    expect(wrapper.find('.row')).toHaveLength(1)
  })

  describe('when isHomepageFreeDeliveryEnabled is on', () => {
    beforeEach(() => {
      wrapper.setProps({ isHomepageFreeDeliveryEnabled: true })
    })

    test('then it should list two benefits', () => {
      expect(wrapper.find('.row')).toHaveLength(2)
    })
  })
})
