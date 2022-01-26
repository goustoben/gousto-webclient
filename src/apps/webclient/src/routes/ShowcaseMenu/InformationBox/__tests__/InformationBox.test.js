import React from 'react'
import { shallow } from 'enzyme'
import { InformationBox } from '../InformationBox'

describe('InformationBox', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<InformationBox />)
  })

  test('renders correctly', () => {
    expect(wrapper.find('.informationBoxToLarge').exists()).toBe(true)
    expect(wrapper.find('.informationBoxFromLarge').exists()).toBe(true)
  })
})
