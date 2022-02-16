import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { useSelector } from 'react-redux'
import { useBasketRequiredFeatureEnabled } from 'routes/Menu/hooks/useBasketRequiredFeatureEnabled'
import { BoxSummaryOverlayDesktop } from '../BoxSummaryOverlayDesktop'

jest.mock('routes/Menu/hooks/useBasketRequiredFeatureEnabled')

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

  describe('when isBasketRequiredFeatureEnabled', () => {
    beforeEach(() => {
      useBasketRequiredFeatureEnabled.mockReturnValue(true)
      wrapper = shallow(<BoxSummaryOverlayDesktop {...defaultProps} />)
    })

    test('should render DetailsCTAGroup', () => {
      expect(wrapper.find('DetailsCTAGroup').exists()).toBe(true)
    })
  })

  describe('when isSimplifyBasketBarEnabled is on', () => {
    beforeEach(() => {
      useSelector.mockReturnValue(true)
      wrapper = shallow(<BoxSummaryOverlayDesktop {...defaultProps} />)
    })

    test('then it should render the variant', () => {
      expect(
        wrapper.find('[data-testing="boxSummaryDesktop"]').hasClass('detailContainerDesktopVariant')
      ).toBe(true)
    })
  })
})
