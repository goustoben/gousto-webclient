import React from 'react'

import Immutable from 'immutable'
import configureMockStore from 'redux-mock-store'

import { getSignupSteps } from 'routes/Signup/utils/getSignupSteps'

const mockStore = configureMockStore()
const mockedStore = mockStore({
  features: Immutable.Map(),
  signup: Immutable.Map(),
})

jest.mock('routes/Signup/constants/AvailableStepComponents', () => ({
  AVAILABLE_STEP_COMPONENTS: {
    availableStep1: <>availableStepComponent1</>,
    availableStep2: <>availableStepComponent2</>,
    availableStep3: <>availableStepComponent3</>,
  },
}))

jest.mock('containers/OptimizelyRollouts', () => ({
  isOptimizelyFeatureEnabledFactory: jest.fn().mockImplementation(() => async () => false),
}))

jest.mock('config/signup', () => ({
  signupConfig: {
    defaultSteps: ['availableStep1', 'availableStep2', 'unavailableStep'],
  },
}))

describe('getSignupSteps util', () => {
  test('should filter out steps without components', async () => {
    const expected = ['availableStep1', 'availableStep2']
    const actual = await getSignupSteps(mockedStore)
    expect(actual).toEqual(Immutable.List(expected))
  })
})
