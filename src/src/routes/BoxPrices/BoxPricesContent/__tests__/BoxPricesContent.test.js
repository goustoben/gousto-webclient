import React from 'react'
import { shallow } from 'enzyme'
import { BoxPricesContent } from '../BoxPricesContent'

describe('Given BoxPricesContent', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<BoxPricesContent />)
  })

  test('should be rendered correctly', () => {
    expect(wrapper.find('.container').exists()).toBeTruthy()
    expect(wrapper.find('.quotes').exists()).toBeTruthy()
  })
})
