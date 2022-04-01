import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { useSelector } from 'react-redux'

import { BoxSummaryOverlayMobile } from '../BoxSummaryOverlayMobile'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

describe('BoxSummaryOverlayMobile', () => {
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

  describe('when isSimplifyBasketBarEnabled is on', () => {
    beforeEach(() => {
      useSelector.mockReturnValue(true)
    })

    test('then it should render without crashing', () => {
      expect(() => {
        shallow(<BoxSummaryOverlayMobile {...defaultProps} />)
      }).not.toThrow()
    })
  })
})
