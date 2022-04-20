import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import * as Redux from 'react-redux'
import { Provider } from 'react-redux'
import { HeroContainer } from '../HeroContainer'

jest.mock('containers/OptimizelyRollouts', () => ({
  isOptimizelyFeatureEnabledFactory: jest.fn().mockImplementation(() => async () => false),
  useIsOptimizelyFeatureEnabled: jest.fn().mockReturnValue(false),
  OptimizelyFeature: () => null,
}))

describe('<HeroContainer />', () => {
  let wrapper
  const mockStore = configureMockStore()
  const mockedStore = mockStore({
    features: {},
  })
  const dispatch = jest.fn()
  jest.spyOn(Redux, 'useDispatch').mockImplementation(() => dispatch)
  jest.spyOn(Redux, 'useSelector').mockImplementation(() => false)

  beforeEach(() => {
    wrapper = mount(
      <Provider store={mockedStore}>
        <HeroContainer dataTesting="hero-test-id" ctaUri="ctaUri" ctaText="ctaText" />
      </Provider>
    )
  })

  test('should be mounted', () => {
    expect(wrapper.find(HeroContainer)).toBeDefined()
  })

  test('Should render <Hero />', () => {
    expect(wrapper.find('[data-testing="hero-test-id"]').hostNodes().length).toEqual(1)
  })
})
