import React from 'react'
import { mount } from 'enzyme'

import { BoxPricesList } from 'routes/BoxPrices/BoxPricesList'
import boxPricesMock from '../../__tests__/__mocks__/boxPrices.json'

describe('Given BoxPriceList component', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(<BoxPricesList boxPrices={boxPricesMock} />)
  })

  test('should be rendered correctly', () => {
    expect(wrapper.find('.boxPriceList').exists()).toBeTruthy()
    expect(wrapper.find('BoxPriceBlock')).toHaveLength(2)
  })
})
