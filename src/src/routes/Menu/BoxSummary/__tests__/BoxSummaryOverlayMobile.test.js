import { shallow } from 'enzyme'
import React from 'react'
import { useBasketRequiredFeatureEnabled } from '../../hooks/useBasketRequiredFeatureEnabled'

import { BoxSummaryOverlayMobile } from '../BoxSummaryOverlay/Mobile/BoxSummaryOverlayMobile'
jest.mock('../../hooks/useBasketRequiredFeatureEnabled')

describe('BoxSummaryOverlayMobile', () => {
  let wrapper
  const defaultProps = {
    onCloseClick: () => {},
    onToggleVisibility: () => {},
    view: '',
    date: '',
    numPortions: 0,
    recipes: new Map(),
    showDetails: false,
    orderSaveError: '',
    shouldDisplayFullScreenBoxSummary: false,
  }

  describe('when isBasketRequiredFeatureEnabled', () => {
    beforeEach(() => {
      useBasketRequiredFeatureEnabled.mockReturnValue(true)
      wrapper = shallow(
        <BoxSummaryOverlayMobile
          {...defaultProps}
        />
      )
    })

    test('should render DetailsCTAGroup', () => {
      expect(wrapper.find('DetailsCTAGroup').exists()).toBe(true)
    })
  })
})
