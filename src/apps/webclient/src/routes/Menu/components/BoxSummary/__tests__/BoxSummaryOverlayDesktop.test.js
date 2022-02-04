import { shallow } from 'enzyme'
import React from 'react'
import { useBasketRequiredFeatureEnabled } from '../../../hooks/useBasketRequiredFeatureEnabled'

import { BoxSummaryOverlayDesktop } from '../BoxSummaryOverlay/Desktop/BoxSummaryOverlayDesktop'
jest.mock('../../../hooks/useBasketRequiredFeatureEnabled')

describe('BoxSummaryOverlayDesktop', () => {
  let wrapper
  const defaultProps = {
    onCloseClick: () => { },
    onToggleVisibility: () => { },
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
        <BoxSummaryOverlayDesktop
          {...defaultProps}
        />
      )
    })

    test('should render DetailsCTAGroup', () => {
      expect(wrapper.find('DetailsCTAGroup').exists()).toBe(true)
    })
  })
})
