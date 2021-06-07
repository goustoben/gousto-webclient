import React from 'react'
import { shallow } from 'enzyme'
import { BoxPriceBlock } from '../BoxPrice'

describe('Given BoxPriceBlock', () => {
  let wrapper
  const boxPriceMock = [
    {
      num_portions: 2,
      price_per_portion: '6.25',
      total: '24.99',
    },
    {
      num_portions: 3,
      price_per_portion: '5.00',
      total: '29.99',
    },
  ]

  beforeEach(() => {
    wrapper = shallow(<BoxPriceBlock boxInfo={boxPriceMock} numPersons={2} />)
  })

  test('should be rendered correctly', () => {
    expect(wrapper.find('.container').exists()).toBeTruthy()
    expect(wrapper.find('h2').exists()).toBeTruthy()
    expect(wrapper.find('Image').exists()).toBeTruthy()
    expect(wrapper.find('BoxInfo').exists()).toBeTruthy()
    expect(wrapper.find('BoxPriceButton').exists()).toBeTruthy()
  })
})
