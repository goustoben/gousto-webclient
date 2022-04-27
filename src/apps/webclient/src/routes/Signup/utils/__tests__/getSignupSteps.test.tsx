import React from 'react'
import configureMockStore from 'redux-mock-store'
import { getSignupSteps } from 'routes/Signup/utils/getSignupSteps'
import Immutable from 'immutable'

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

describe('getSignupSteps util', () => {
  test('should filter out steps without components', () => {
    const expected = ['availableStep1', 'availableStep2']
    const actual = getSignupSteps(mockedStore, expected.concat('unavailableStep3'))
    expect(actual).toEqual(Immutable.List(expected))
  })
})
