import React from 'react'

import { mount } from 'enzyme'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

import { BoxPricesList } from 'routes/BoxPrices/BoxPricesList'

import numPersonsToBoxDescriptors from '../../__tests__/__mocks__/numPersonsToBoxDescriptors.json'

jest.mock('containers/OptimizelyRollouts', () => ({
  isOptimizelyFeatureEnabledFactory: jest.fn().mockImplementation(() => async () => false),
  useIsOptimizelyFeatureEnabled: jest.fn().mockReturnValue(false),
  OptimizelyFeature: () => null,
}))

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
        <BoxPricesList
          numPersonsToBoxDescriptors={numPersonsToBoxDescriptors}
          boxPricesBoxSizeSelected={boxPricesBoxSizeSelected}
          selectedBox={2}
          trackUTMAndPromoCode={trackUTMAndPromoCode}
        />
      </Provider>,
    )
  })

  test('should be rendered correctly', () => {
    expect(wrapper.find('.boxPriceList').exists()).toBeTruthy()
    expect(wrapper.find('BoxPriceBlock')).toHaveLength(2)
  })
})
