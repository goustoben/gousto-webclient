import React from 'react'
import { shallow } from 'enzyme'
import numPersonsToBoxDescriptors from 'routes/BoxPrices/__tests__/__mocks__/numPersonsToBoxDescriptors.json'
import { GoustoOnDemandBoxSizeContent } from '../GoustoOnDemandBoxSizeContent'

jest.mock('containers/OptimizelyRollouts', () => ({
  isOptimizelyFeatureEnabledFactory: jest.fn().mockImplementation(() => async () => false),
  useIsOptimizelyFeatureEnabled: jest.fn().mockReturnValue(false),
}))

describe('GoustoOnDemandBoxSizeContent', () => {
  let wrapper

  const onPrimaryButtonClick = jest.fn()
  const goustoOnDemandCustomText = 'custom text'

  beforeEach(() => {
    wrapper = shallow(
      <GoustoOnDemandBoxSizeContent
        isLoadingPrices={false}
        goustoOnDemandCustomText={goustoOnDemandCustomText}
        onPrimaryButtonClick={onPrimaryButtonClick}
        numPersonsToBoxDescriptors={numPersonsToBoxDescriptors}
      />,
    )
  })

  test('renders correctly', () => {
    expect(wrapper.find('.goustoOnDemandCustomText').text()).toBe('custom text')
    expect(wrapper.find('BoxPricesTabs').exists()).toBe(true)

    const items = wrapper.find('.goustoOnDemandBoxSizeItem')
    expect(items).toHaveLength(2)

    expect(items.at(0).find('PricePerNRecipesTable').prop('boxDescriptors')).toEqual(
      numPersonsToBoxDescriptors[2],
    )
    expect(items.at(1).find('PricePerNRecipesTable').prop('boxDescriptors')).toEqual(
      numPersonsToBoxDescriptors[4],
    )
  })
})
