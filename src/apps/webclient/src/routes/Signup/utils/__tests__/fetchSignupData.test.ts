import configureMockStore from 'redux-mock-store'
import Immutable from 'immutable'
import { fetchSignupData, GetSignupDataStore } from 'routes/Signup/utils/fetchSignupData'
import { menuLoadBoxPrices, menuLoadDays } from 'actions/menu'
import { signupSetStep, signupStepsReceive } from 'actions/signup'
import { redirect } from 'actions/redirect'
import { promoGet } from 'actions/promos'
import { invokeHotjarEvent } from 'utils/hotjarUtils'

jest.mock('actions/signup', () => ({
  signupStepsReceive: jest.fn(),
  signupSetStep: jest.fn(),
}))
jest.mock('actions/menu', () => ({
  menuLoadDays: jest.fn(),
  menuLoadBoxPrices: jest.fn(),
}))
jest.mock('actions/redirect', () => ({
  redirect: jest.fn(),
}))
jest.mock('actions/promos', () => ({
  promoGet: jest.fn(),
}))
jest.mock('routes/Signup/signupSelectors', () => ({
  getCurrentPromoCodeData: jest.fn().mockReturnValue(false),
}))
jest.mock('utils/hotjarUtils', () => ({
  invokeHotjarEvent: jest.fn(),
}))

describe('fetchSignupData', () => {
  const mockStore = configureMockStore<GetSignupDataStore>()
  const mockedStore = mockStore({
    features: Immutable.Map(),
    signup: Immutable.Map(),
    menuBoxPrices: Immutable.Set(),
    basket: Immutable.Map({ promoCode: 'mock_promo_code' }),
  })
  mockedStore.dispatch = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('when executed, should dispatch relevant actions', async () => {
    await fetchSignupData({ store: mockedStore })
    expect(menuLoadDays).toBeCalled()
    expect(signupStepsReceive).toBeCalled()
    expect(redirect).toBeCalled()
    expect(signupSetStep).toBeCalled()
  })

  test('when isGoustoOnDemandEnabled, should load box prices', async () => {
    await fetchSignupData({ store: mockedStore, options: { isGoustoOnDemandEnabled: true } })
    expect(menuLoadBoxPrices).toBeCalled()
    expect(promoGet).toBeCalled()
  })

  test('when shouldSkipWizardByFeature, should skipWizard', async () => {
    await fetchSignupData({
      store: mockedStore,
      options: { shouldSkipWizardByFeature: true },
    })
    expect(invokeHotjarEvent).toBeCalled()
    expect(redirect).toBeCalled()
  })
})
