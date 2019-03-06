import actions from 'actions/auth'
import Immutable from 'immutable'
import { redirect, documentLocation } from 'utils/window'

const documentLocationMock = jest.fn()
jest.mock('utils/window')

describe('redirectLoggedInUser', () => {
  let getState

  beforeEach(() => {
    redirect.mockReturnValue(jest.fn())
    documentLocation.mockReturnValue({pathname: '/'})
  })

  afterEach(() => {
    redirect.mockClear()
  })

  test('should NOT redirect if neither feature is set to true', async() => {
    getState = () => ({
      auth: Immutable.Map({
        isAuthenticated: true,
      }),
      features: Immutable.Map({
        goToMyGousto: Immutable.fromJS({
          value: false
        }),
        goToMyDeliveries: Immutable.fromJS({
          value: false
        })
      }),
    })

    await actions.redirectLoggedInUser()(null,getState)

    expect(redirect).not.toHaveBeenCalled()
  })

  test('should NOT redirect to my deliveries if feature is set to true and NOT on homepage', async() => {
    documentLocation.mockReturnValue({pathname: '/menu'})

    getState = () => ({
      auth: Immutable.Map({
        isAuthenticated: true,
      }),
      features: Immutable.Map({
        goToMyGousto: Immutable.fromJS({
          value: false
        }),
        goToMyDeliveries: Immutable.fromJS({
          value: true
        })
      }),
    })

    await actions.redirectLoggedInUser()(null,getState)

    expect(redirect).not.toHaveBeenCalled()
  })

  test('should redirect to my gousto if feature is set to true', async() => {
    getState = () => ({
      auth: Immutable.Map({
        isAuthenticated: true,
      }),
      features: Immutable.Map({
        goToMyGousto: Immutable.fromJS({
          value: true
        }),
        goToMyDeliveries: Immutable.fromJS({
          value: false
        })
      }),
    })

    await actions.redirectLoggedInUser()(null,getState)

    expect(redirect).toHaveBeenCalledWith('/my-gousto')
  })

  test('should redirect to my deliveries if feature is set to true', async() => {
    getState = () => ({
      auth: Immutable.Map({
        isAuthenticated: true,
      }),
      features: Immutable.Map({
        goToMyGousto: Immutable.fromJS({
          value: false
        }),
        goToMyDeliveries: Immutable.fromJS({
          value: true
        })
      }),
    })

    await actions.redirectLoggedInUser()(null,getState)

    expect(redirect).toHaveBeenCalledWith('/my-deliveries')
  })
})
