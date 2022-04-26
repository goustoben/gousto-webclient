import { shallow } from 'enzyme'
import Immutable from 'immutable'
import React from 'react'
import * as Redux from 'react-redux'
import { BoxSummaryMobileBanner } from 'routes/Menu/components/BoxSummary/Banner/Mobile/BoxSummaryMobileBanner'
import { OpenBoxButton } from 'routes/Menu/components/BoxSummary/Banner/OpenBoxButton'

describe('BoxSummaryMobileBanner', () => {
  let wrapper
  const defaultProps = {
    showBrowseCTA: false,
    maxRecipesNum: 4,
    menuRecipesStore: Immutable.Map({}),
    recipes: Immutable.Map({}),
    errorText: '',
    date: '',
    deliveryDays: Immutable.Map({}),
    slotId: '',
    isBoxSummaryOpened: false,
    onExpandClick: () => { },
    openDetails: () => { },
  }
  beforeEach(() => {
    jest.spyOn(Redux, 'useSelector').mockReturnValue(true) // getIsSimplifyBasketBarEnabled
    wrapper = shallow(
      <BoxSummaryMobileBanner
        {...defaultProps}
      />
    )
  })
  test('should render BoxSummaryMobileBanner without crashing', () => {
    expect(() => {
      shallow(<BoxSummaryMobileBanner {...defaultProps} />)
    }).not.toThrow()
  })
  test('should render OpenBoxButton by default', () => {
    expect(wrapper.find(OpenBoxButton).length).toEqual(1)
  })
})
