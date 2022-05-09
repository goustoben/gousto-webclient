import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { BoxSummaryOverlayDesktop } from '../BoxSummaryOverlayDesktop'

describe('BoxSummaryOverlayDesktop', () => {
  let wrapper

  const defaultProps = {
    onCloseClick: () => {},
    onToggleVisibility: () => {},
    showDetails: false,
    date: '',
    recipes: Immutable.Map(),
    numPortions: 0,
    orderSaveError: '',
  }

  describe('when rendered', () => {
    beforeEach(() => {
      wrapper = shallow(<BoxSummaryOverlayDesktop {...defaultProps} />)
    })

    test('then it should render correctly', () => {
      expect(wrapper.find('Connect(BoxSummaryContent)')).toHaveLength(1)
    })
  })
})
