import React from 'react'
import { mount } from 'enzyme'
import Immutable from 'immutable'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { BoxPrices } from 'routes/BoxPrices/BoxPrices'
import { BoxPricesComponent } from 'routes/BoxPrices/BoxPricesComponent'
import { menuLoadBoxPrices } from 'actions/menu'
import numPersonsToBoxDescriptors from './__mocks__/numPersonsToBoxDescriptors.json'

jest.mock('containers/OptimizelyRollouts', () => ({
  isOptimizelyFeatureEnabledFactory: jest.fn().mockImplementation(() => async () => false),
  useIsOptimizelyFeatureEnabled: jest.fn().mockReturnValue(false),
  OptimizelyFeature: () => null,
}))

jest.mock('actions/menu', () => ({
  menuLoadBoxPrices: jest.fn(),
}))

const mockStore = configureMockStore()
const store = mockStore({
  auth: Immutable.fromJS({}),
})

describe('BoxPrices', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <BoxPrices loading menuLoadBoxPrices={menuLoadBoxPrices} />
      </Provider>,
    )
  })

  describe('when loading is true', () => {
    test('should render a loading screen when fetching data', () => {
      expect(wrapper.find(BoxPricesComponent)).toHaveLength(1)
      expect(wrapper.find(BoxPricesComponent).props().loading).toBeTruthy()
    })
  })

  describe('when loading is false', () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <BoxPrices
            loading={false}
            numPersonsToBoxDescriptors={numPersonsToBoxDescriptors}
            menuLoadBoxPrices={menuLoadBoxPrices}
          />
        </Provider>,
      )
    })

    test('should render a box prices list', () => {
      expect(wrapper.find(BoxPricesComponent)).toHaveLength(1)
      expect(wrapper.find(BoxPricesComponent).props().loading).toBeFalsy()
    })
  })
})
