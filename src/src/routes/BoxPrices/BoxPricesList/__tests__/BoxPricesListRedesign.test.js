import React from 'react'
import { mount } from 'enzyme'

import { BoxPricesListRedesignContainer as BoxPricesListRedesign } from 'routes/BoxPrices/BoxPricesList/BoxPricesListRedesign'
import numPersonsToBoxDescriptors from '../../__tests__/__mocks__/numPersonsToBoxDescriptors.json'

describe('Given BoxPriceList component', () => {
  let wrapper

  const boxPricesBoxSizeSelected = jest.fn()
  const trackUTMAndPromoCode = jest.fn()

  beforeEach(() => {
    wrapper = mount(
      <BoxPricesListRedesign
        numPersonsToBoxDescriptors={numPersonsToBoxDescriptors}
        boxPricesBoxSizeSelected={boxPricesBoxSizeSelected}
        selectedBox={2}
        trackUTMAndPromoCode={trackUTMAndPromoCode}
      />
    )
  })

  test('should be rendered correctly', () => {
    expect(wrapper.find('.boxPriceListRedesign').exists()).toBeTruthy()
    expect(wrapper.find('BoxPriceBlock')).toHaveLength(2)
  })
})
