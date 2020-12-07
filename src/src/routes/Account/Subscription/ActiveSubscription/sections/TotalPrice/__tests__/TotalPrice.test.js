import React from 'react'
import { mount } from 'enzyme'

import {
  getIsBoxAndPricesLoaded,
  getTotalBoxPriceDiscounted,
  getPricePerPortionDiscounted
} from '../../../../context/selectors/box'
import {
  SubscriptionContext,
} from '../../../../context'

import { TotalPrice } from '../TotalPrice'

jest.mock('../../../../context/selectors/box')

let wrapper
const mountWithContext = () => {
  wrapper = mount(
    <TotalPrice />,
    {
      wrappingComponent: SubscriptionContext.Provider,
      wrappingComponentProps: { value: { state: {}, dispatch: 'MOCK_DISPATCH' } }
    }
  )

  wrapper.update()
}
describe('TotalPrice', () => {
  describe('Given data is not loaded', () => {
    beforeEach(() => {
      getIsBoxAndPricesLoaded.mockReturnValue(false)
      mountWithContext()
    })

    test('Then I should not see the price', () => {
      expect(wrapper.instance()).toBe(null)
    })
  })

  describe('Given data is loaded', () => {
    beforeEach(() => {
      getIsBoxAndPricesLoaded.mockReturnValue(true)
      getTotalBoxPriceDiscounted.mockReturnValue('21.00')
      getPricePerPortionDiscounted.mockReturnValue('2.65')
      mountWithContext()
    })

    test('Then I should see the price per portion', () => {
      expect(wrapper.find('[data-testing="price-per-servings"]').text()).toEqual('Price per Serving£2.65')
    })

    test('Then I should see the total price', () => {
      expect(wrapper.find('[data-testing="total-price"]').text()).toEqual('Total Box Price£21.00')
    })
  })
})
