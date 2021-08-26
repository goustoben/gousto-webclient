import React from 'react'
import { shallow } from 'enzyme'

import { BoxPricesRedesign } from 'routes/BoxPrices/BoxPricesRedesign'
import numPersonsToBoxDescriptors from './__mocks__/numPersonsToBoxDescriptors.json'

describe('BoxPricesRedesign', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <BoxPricesRedesign numPersonsToBoxDescriptors={numPersonsToBoxDescriptors} loading={false} />
    )
  })

  test('should be rendered correctly', () => {
    expect(wrapper.find('h1').exists()).toBeTruthy()
    expect(wrapper.find('BoxPricesTabs').exists()).toBeTruthy()
    expect(wrapper.find('BoxPricesListRedesign').exists()).toBeFalsy()
    expect(wrapper.find('BoxPricesContent').exists()).toBeTruthy()
  })
})
