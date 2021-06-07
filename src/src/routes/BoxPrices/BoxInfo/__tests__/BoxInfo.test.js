import React from 'react'
import { shallow } from 'enzyme'
import { BoxInfo } from '../BoxInfo'

describe('Given BoxInfo', () => {
  let wrapper
  const props = {
    numPortions: 2,
    totalPrice: '20',
    pricePerPortion: '3',
    numPersons: 4
  }

  beforeEach(() => {
    wrapper = shallow(<BoxInfo {...props} />)
  })

  test('should be rendered correctly', () => {
    expect(wrapper.find('.container').exists()).toBeTruthy()
    expect(wrapper.find('BoxIcon').exists()).toBeTruthy()
  })
})
