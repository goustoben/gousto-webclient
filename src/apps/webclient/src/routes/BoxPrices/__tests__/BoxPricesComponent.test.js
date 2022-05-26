import React from 'react'

import { shallow } from 'enzyme'

import { BoxPricesComponent } from '../BoxPricesComponent'
import { BoxPricesContent } from '../BoxPricesContent'
import { BoxPricesList } from '../BoxPricesList'
import { BoxPricesTabs } from '../BoxPricesTabs'
import numPersonsToBoxDescriptors from './__mocks__/numPersonsToBoxDescriptors.json'

jest.mock('containers/OptimizelyRollouts', () => ({
  isOptimizelyFeatureEnabledFactory: jest.fn().mockImplementation(() => async () => false),
  useIsOptimizelyFeatureEnabled: jest.fn().mockReturnValue(false),
}))

const trackUTMAndPromoCodeMock = jest.fn()
const handleSetActiveTabIndexMock = jest.fn().mockImplementation((index) => {
  trackUTMAndPromoCodeMock(index)
})

describe('BoxPricesComponent', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <BoxPricesComponent
        numPersonsToBoxDescriptors={numPersonsToBoxDescriptors}
        loading={false}
        trackUTMAndPromoCode={trackUTMAndPromoCodeMock}
      />,
    )
  })

  test('should be rendered correctly', () => {
    expect(wrapper.find('h1').exists()).toBeTruthy()
    expect(wrapper.find(BoxPricesTabs).exists()).toBeTruthy()
    expect(wrapper.find(BoxPricesList).exists()).toBeTruthy()
    expect(wrapper.find(BoxPricesContent).exists()).toBeTruthy()
  })

  test('should fire trackUTMAndPromoCodeMock when handleSetActiveTabIndexMock is called', () => {
    handleSetActiveTabIndexMock('test')
    expect(trackUTMAndPromoCodeMock).toHaveBeenCalled()
  })
})
