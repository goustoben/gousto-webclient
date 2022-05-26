import Immutable, { List } from 'immutable'
import configureMockStore from 'redux-mock-store'

import { redirect } from 'actions/redirect'
import { signupSetStep, signupStepsReceive } from 'actions/signup'
import { openProperStep, OpenStepStore } from 'routes/Signup/utils/openProperStep'
import { invokeHotjarEvent } from 'utils/hotjarUtils'

jest.mock('routes/Signup/utils/getSignupSteps', () => ({
  getSignupSteps: jest.fn(async () => List.of([{ slug: 'first step slug' }])),
}))
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

describe('Given openProperStep util function', () => {
  const mockStore = configureMockStore<OpenStepStore>()
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
  describe('when executed', () => {
    describe('when stepName is undefined', () => {
      test('should dispatch proper actions', async () => {
        await openProperStep(mockedStore)
        expect(signupStepsReceive).toBeCalled()
        expect(redirect).toBeCalled()
      })
    })
    describe('when stepName is defined, but can not land on step without redirect', () => {
      test('should dispatch proper actions', async () => {
        await openProperStep(mockedStore, {}, { stepName: 'stepName' })
        expect(signupStepsReceive).toBeCalled()
        expect(redirect).toBeCalled()
      })
    })
    describe('when stepName is defined and can land on step without redirect', () => {
      test('should dispatch proper actions', async () => {
        await openProperStep(mockedStore, {}, { stepName: 'postcode' })
        expect(signupStepsReceive).toBeCalled()
        expect(redirect).toBeCalledTimes(0)
        expect(signupSetStep).toBeCalled()
      })
    })
    describe('when shouldSkipWizardByFeature', () => {
      test('should redirect to menu', async () => {
        await openProperStep(mockedStore, {}, {}, { shouldSkipWizardByFeature: true })
        expect(invokeHotjarEvent).toBeCalled()
        expect(redirect).toBeCalled()
      })
    })
  })
})
