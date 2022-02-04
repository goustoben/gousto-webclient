import { shallow } from 'enzyme'
import React from 'react'
import { useBasketRequiredFeatureEnabled } from '../../../hooks/useBasketRequiredFeatureEnabled'

import { BoxSummaryMobileBanner } from '../Banner/Mobile/BoxSummaryMobileBanner'
import { OpenBoxButton } from '../Banner/Mobile/OpenBoxButton'
jest.mock('../../../hooks/useBasketRequiredFeatureEnabled')

describe('BoxSummaryMobileBanner', () => {
  let wrapper
  const defaultProps = {
    showBrowseCTA: false,
    maxRecipesNum: 4,
    menuRecipesStore: new Map(),
    recipes: () => { },
    errorText: '',
    date: '',
    deliveryDays: '',
    slotId: '',
    isBoxSummaryOpened: false,
    onExpandClick: () => { },
    openDetails: () => { },
  }

  describe('when isBasketRequiredFeatureEnabled', () => {
    beforeEach(() => {
      useBasketRequiredFeatureEnabled.mockReturnValue(true)
    })

    describe('when isBoxSummaryOpened', () => {
      test('BoxSummaryMobileBanner is hidden', () => {
        wrapper = shallow(
          <BoxSummaryMobileBanner
            {...defaultProps}
            isBoxSummaryOpened
          />
        )

        expect(wrapper.hasClass('hideBanner')).toEqual(true)
      })
    })
    test('OpenBoxButton is not rendered', () => {
      wrapper = shallow(<BoxSummaryMobileBanner {...defaultProps} />)
      expect(wrapper.find(OpenBoxButton).length).toEqual(0)
    })
  })
})
