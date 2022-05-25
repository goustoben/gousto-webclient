import React from 'react'
import { mount, ReactWrapper } from 'enzyme'
import { NumberOfPeopleStep } from 'routes/Signup/Steps/NumberOfPeople'
import { Provider } from 'react-redux'
import * as Redux from 'react-redux'
import configureMockStore from 'redux-mock-store'
import Immutable from 'immutable'

const mockStore = configureMockStore()
const mockedStore = mockStore({
  features: Immutable.Map({}),
  signup: Immutable.Map({ wizard: Immutable.Map({ isLastStep: false }) }),
})
const dispatch = jest.fn()
jest.spyOn(Redux, 'useDispatch').mockImplementation(() => dispatch)
jest.spyOn(Redux, 'useSelector').mockImplementation(() => false)
jest.mock('actions/tracking', () => ({
  trackUTMAndPromoCode: jest.fn().mockImplementation(() => async () => false),
}))

describe('Given <NumberOfPeopleStep /> component', () => {
  const next = jest.fn()
  const defaultProps = {
    next,
  }
  let wrapper: ReactWrapper
  beforeEach(() => {
    wrapper = mount(
      <Provider store={mockedStore}>
        <NumberOfPeopleStep {...defaultProps} />
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
  })
})
