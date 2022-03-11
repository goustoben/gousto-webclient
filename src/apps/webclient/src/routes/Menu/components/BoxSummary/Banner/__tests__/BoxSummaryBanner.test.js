import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { BoxSummaryBanner } from '../BoxSummaryBanner'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

describe('BoxSummaryBanner', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <BoxSummaryBanner
        date="2022-03-11"
        deliveryDays={Immutable.fromJS({})}
        slotId="test-slot-id"
        expandWarning={false}
        onExpandClick={jest.fn()}
        numRecipes={2}
        isBoxSummaryOpened={false}
        showBrowseCTA={false}
        recipes={Immutable.fromJS({})}
        menuRecipesStore={Immutable.fromJS({})}
        maxRecipesNum={4}
        errorText=""
      />
    )
  })

  test('renders correctly', () => {
    expect(wrapper.find('BoxSummaryMobileBanner')).toHaveLength(1)
    expect(wrapper.find('BoxSummaryDesktopBanner')).toHaveLength(1)
    expect(wrapper.find('HotjarTrigger')).toHaveLength(1)
  })
})
