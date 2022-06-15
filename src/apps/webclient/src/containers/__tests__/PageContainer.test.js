import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import * as userSelectors from 'selectors/user'
import { safeJestMock } from '_testing/mocks'
import { redirect } from 'utils/window'
import { isRedirectEnabled, PageContainer } from '../PageContainer'
import Page from '../Page'

jest.mock('utils/window', () => ({
  documentLocation: jest.fn(),
  getWindow: jest.fn(() => ({
    location: {
      hash: 'login'
    }
  })),
  redirect: jest.fn(),
}))

const getUserId = safeJestMock(userSelectors, 'getUserId')

describe('isRedirectEnabled', () => {
  let output
  let state = {}

  beforeAll(() => {
    output = false
    state = {
      features: Immutable.Map({})
    }
  })

  describe('when pathname does not match signup/*, check-out/*', () => {
    beforeEach(() => {
      output = false
    })

    describe('and enableSignupReduction is falsy', () => {
      beforeEach(() => {
        state = {
          features: Immutable.fromJS({
            enableSignupReduction: {
              value: false,
            },
          }),
          routing: {
            locationBeforeTransitions: {
              pathname: 'home-page'
            }
          }
        }
      })

      test('then isRedirectEnabled should return false', () => {
        output = isRedirectEnabled(state)
        expect(output).toBeFalsy()
      })
    })

    describe('and when enableSignupReduction is truthy', () => {
      beforeEach(() => {
        state = {
          features: Immutable.fromJS({
            enableSignupReduction: {
              value: true,
            },
          }),
          routing: {
            locationBeforeTransitions: {
              pathname: 'home-page'
            }
          }
        }
      })

      test('then isRedirectEnabled should return false', () => {
        output = isRedirectEnabled(state)
        expect(output).toBeFalsy()
      })
    })
  })

  describe('when pathname does match signup/*, check-out/*', () => {
    beforeEach(() => {
      output = false
    })

    describe('and enableSignupReduction is truthy', () => {
      beforeEach(() => {
        state = {
          features: Immutable.fromJS({
            enableSignupReduction: {
              value: true,
            },
          }),
          routing: {
            locationBeforeTransitions: {
              pathname: '/signup/box-size'
            }
          }
        }
      })

      test('then isRedirectEnabled should return true', () => {
        output = isRedirectEnabled(state)
        expect(output).toBeTruthy()
      })
    })
  })
})

describe('PageContainer', () => {
  let wrapper

  const trackUserLogin = jest.fn()

  const state = {
    auth: Immutable.fromJS({
      isAuthenticated: true,
      isAdmin: false,
    }),
    user: Immutable.fromJS({
      email: 'mock-email',
      id: 'mock-user-id',
      goustoReference: 'mock-gousto-id',
    }),
    pending: Immutable.fromJS({}),
    request: Immutable.fromJS({
      browser: 'mobile',
    }),
    features: Immutable.fromJS({
      isGoustoOnDemandEnabled: {
        value: false,
      },
    }),
  }

  const store = {
    getState: jest.fn(() => state),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  }

  beforeEach(() => {
    getUserId.mockReturnValue('123456789')
    wrapper = shallow(<PageContainer store={store} trackUserLogin={trackUserLogin} />)
  })

  describe('When PageContainer is rendered', () => {
    test('Then should be rendered Page component', () => {
      expect(wrapper.find(Page).length).toEqual(1)
    })
  })
})

describe('Page', () => {
  let wrapper

  const trackUserAttributes = jest.fn()
  const loginVisibilityChange = jest.fn()
  const trackUserLogin = jest.fn()
  const userLoadData = jest.fn()

  beforeEach(() => {
    redirect.mockReturnValue(jest.fn())
  })

  afterEach(() => {
    redirect.mockClear()
    jest.clearAllMocks()
  })

  test('trackUserLogin should be called once when userId updated', () => {
    wrapper = shallow(<Page
      email="mock-email"
      goustoReference="mock-gousto-id"
      isAuthenticated
      disabled={false}
      loginVisibilityChange={loginVisibilityChange}
      contentFetchPending={false}
      isSignupReductionEnabled={false}
      trackUserAttributes={trackUserAttributes}
      trackUserLogin={trackUserLogin}
      userLoadData={userLoadData}
    />)

    expect(trackUserLogin).not.toHaveBeenCalled()
    wrapper.setProps({ userId: '1' })
    expect(trackUserLogin).toHaveBeenCalledTimes(1)
    wrapper.setProps({ userId: '2' })
    expect(trackUserLogin).toHaveBeenCalledTimes(1)
  })

  test('should redirect when isSignupReductionEnabled enabled', () => {
    wrapper = shallow(<Page
      email="mock-email"
      goustoReference="mock-gousto-id"
      isAuthenticated
      disabled={false}
      loginVisibilityChange={loginVisibilityChange}
      contentFetchPending={false}
      isSignupReductionEnabled
      trackUserAttributes={trackUserAttributes}
      trackUserLogin={trackUserLogin}
      userLoadData={userLoadData}
    />)
    expect(redirect).toHaveBeenCalled()
  })

  test('should redirect when isSignupReductionEnabled props changed to true', () => {
    wrapper = shallow(<Page
      email="mock-email"
      goustoReference="mock-gousto-id"
      isAuthenticated
      disabled={false}
      loginVisibilityChange={loginVisibilityChange}
      contentFetchPending={false}
      isSignupReductionEnabled={false}
      trackUserAttributes={trackUserAttributes}
      trackUserLogin={trackUserLogin}
      userLoadData={userLoadData}
    />)
    expect(redirect).not.toHaveBeenCalled()
    wrapper.setProps({ isSignupReductionEnabled: true })
    expect(redirect).toHaveBeenCalled()
  })

  test('should call loginVisibilityChange if not isAuthenticated with location login', () => {
    wrapper = shallow(<Page
      email="mock-email"
      goustoReference="mock-gousto-id"
      isAuthenticated={false}
      disabled={false}
      loginVisibilityChange={loginVisibilityChange}
      contentFetchPending={false}
      isSignupReductionEnabled={false}
      trackUserAttributes={trackUserAttributes}
      trackUserLogin={trackUserLogin}
      userLoadData={userLoadData}
    />)
    expect(loginVisibilityChange).toHaveBeenCalledTimes(1)
  })

  test('should fetchData', () => {
    wrapper = shallow(<Page
      email=""
      goustoReference="mock-gousto-id"
      isAuthenticated
      disabled={false}
      loginVisibilityChange={loginVisibilityChange}
      contentFetchPending={false}
      isSignupReductionEnabled={false}
      trackUserAttributes={trackUserAttributes}
      trackUserLogin={trackUserLogin}
      userLoadData={userLoadData}
    />)
    expect(userLoadData).toHaveBeenCalledTimes(0)
    wrapper.setProps({ email: null })
    expect(userLoadData).toHaveBeenCalledTimes(1)
  })
})
