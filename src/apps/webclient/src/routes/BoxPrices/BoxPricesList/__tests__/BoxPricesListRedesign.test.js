import React from 'react'
import Immutable from 'immutable'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import { BoxPricesListRedesignContainer as BoxPricesListRedesign } from 'routes/BoxPrices/BoxPricesList/BoxPricesListRedesign'
import numPersonsToBoxDescriptors from '../../__tests__/__mocks__/numPersonsToBoxDescriptors.json'

describe('Given BoxPriceList component', () => {
  let wrapper

  const boxPricesBoxSizeSelected = jest.fn()
  const trackUTMAndPromoCode = jest.fn()

  beforeEach(() => {
    const mockStore = configureMockStore()
    const mockedStore = mockStore({
      auth: Immutable.fromJS({}),
    })

    wrapper = mount(
      <Provider store={mockedStore}>
        <BoxPricesListRedesign
          numPersonsToBoxDescriptors={numPersonsToBoxDescriptors}
          boxPricesBoxSizeSelected={boxPricesBoxSizeSelected}
          selectedBox={2}
          trackUTMAndPromoCode={trackUTMAndPromoCode}
        />
      </Provider>
    )
  })

  test('should be rendered correctly', () => {
    expect(wrapper.find('.boxPriceListRedesign').exists()).toBeTruthy()
    expect(wrapper.find('BoxPriceBlock')).toHaveLength(2)
  })
})
