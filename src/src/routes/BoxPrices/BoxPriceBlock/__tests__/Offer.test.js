import React from 'react'
import { shallow } from 'enzyme'
import { Offer } from '../Offer'

describe('Given Offer', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Offer />)
  })

  test('should be rendered correctly', () => {
    expect(wrapper.find('.offer').exists()).toBeTruthy()
    expect(wrapper.find('.icon').exists()).toBeTruthy()
    expect(wrapper.find('.offerOption').exists()).toBeTruthy()
    expect(wrapper.find('.offerOptionDetail').exists()).toBeTruthy()
  })
})
