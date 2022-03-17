import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { useSelector } from 'react-redux'
import { useBasketRequiredFeatureEnabled } from 'routes/Menu/hooks/useBasketRequiredFeatureEnabled'

import { BoxSummaryOverlayMobile } from '../BoxSummaryOverlayMobile'

jest.mock('routes/Menu/hooks/useBasketRequiredFeatureEnabled')

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

describe('BoxSummaryOverlayMobile', () => {
  let wrapper
  const defaultProps = {
    onCloseClick: () => {},
    onToggleVisibility: () => {},
    view: '',
    date: '',
    numPortions: 0,
    recipes: Immutable.Map(),
    showDetails: false,
    orderSaveError: '',
    shouldDisplayFullScreenBoxSummary: false,
  }

  describe('when isBasketRequiredFeatureEnabled', () => {
    beforeEach(() => {
      useBasketRequiredFeatureEnabled.mockReturnValue(true)
      wrapper = shallow(<BoxSummaryOverlayMobile {...defaultProps} />)
    })

    test('should render DetailsCTAGroup', () => {
      expect(wrapper.find('DetailsCTAGroup').exists()).toBe(true)
    })
  })

  describe('when isSimplifyBasketBarEnabled is on', () => {
    beforeEach(() => {
      useSelector.mockReturnValue(true)
    })

    test('then it should render without crashing', () => {
      expect(() => {
        wrapper = shallow(<BoxSummaryOverlayMobile {...defaultProps} />)
      }).not.toThrow()
    })
  })
})
