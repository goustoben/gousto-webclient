import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { Provider } from 'react-redux'
import * as Redux from 'react-redux'
import configureMockStore from 'redux-mock-store'
import Immutable from 'immutable'
import { BoxSizeRecommenderStep } from 'routes/Signup/Steps/BoxSizeRecommender'

const mockStore = configureMockStore()
const mockedStore = mockStore({
  features: Immutable.Map({}),
  signup: Immutable.Map({
    wizard: Immutable.Map({ isLastStep: false }),
    numberOfPeople: 1,
  }),
})
const dispatch = jest.fn()
jest.spyOn(Redux, 'useDispatch').mockImplementation(() => dispatch)
jest.mock('actions/tracking', () => ({
  trackUTMAndPromoCode: jest.fn().mockImplementation(() => async () => false),
}))

describe('Given <BoxSizeRecommenderStep /> component', () => {
  const next = jest.fn()
  const defaultProps = {
    next,
  }
  let wrapper: ReactWrapper
  beforeEach(() => {
    wrapper = mount(
      <Provider store={mockedStore}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <BoxSizeRecommenderStep {...defaultProps} />
      </Provider>,
    )
  })
  describe('when rendered', () => {
    describe('when continue is clicked', () => {
      test('then should call next prop', () => {
        const continueButton = wrapper.find('[data-testing="continue-button"]').hostNodes()
        continueButton.simulate('click')
        expect(next).toBeCalled()
      })
    })
    describe('when amountOfPeople equal to 1', () => {
      test('then should render RegularBoxRecommendation', () => {
        expect(
          wrapper
            .find('p')
            .at(1)
            .hostNodes()
            .text()
            .includes('A regular box contains 2 portions of each recipe.'),
        )
      })
    })
    describe('when amountOfPeople equal to 3', () => {
      test('then should render LargeBoxRecommendation', () => {
        const mockedStoreForLargeBox = mockStore({
          features: Immutable.Map({}),
          signup: Immutable.Map({
            wizard: Immutable.Map({ isLastStep: false }),
            numberOfPeople: 3,
          }),
        })
        wrapper = mount(
          <Provider store={mockedStoreForLargeBox}>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <BoxSizeRecommenderStep {...defaultProps} />
          </Provider>,
        )
        expect(
          wrapper
            .find('p')
            .at(1)
            .hostNodes()
            .text()
            .includes('A large box contains 4 portions of each recipe.'),
        )
      })
    })
  })
})
