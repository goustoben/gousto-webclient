import React from 'react'
import { mount } from 'enzyme'

import { BoxPricesList } from 'routes/BoxPrices/BoxPricesList'
import numPersonsToBoxDescriptors from '../../__tests__/__mocks__/numPersonsToBoxDescriptors.json'

describe('Given BoxPriceList component', () => {
  let wrapper

  const boxPricesBoxSizeSelected = jest.fn()

  beforeEach(() => {
    wrapper = mount(
      <BoxPricesList
        numPersonsToBoxDescriptors={numPersonsToBoxDescriptors}
        boxPricesBoxSizeSelected={boxPricesBoxSizeSelected}
      />
    )
  })

  test('should be rendered correctly', () => {
    expect(wrapper.find('.boxPriceList').exists()).toBeTruthy()
    expect(wrapper.find('BoxPriceBlock')).toHaveLength(2)
  })
})
