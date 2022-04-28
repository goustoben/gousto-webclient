import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { useSelector } from 'react-redux'
import { BoxSummaryOverlayDesktop } from '../BoxSummaryOverlayDesktop'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

describe('BoxSummaryOverlayDesktop', () => {
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
})
