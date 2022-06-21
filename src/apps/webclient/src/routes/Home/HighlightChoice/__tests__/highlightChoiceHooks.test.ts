import { useIsHighlightChoiceFeatureEnabled } from '../highlightChoiceHooks'

jest.mock('containers/OptimizelyRollouts', () => ({
  useIsOptimizelyFeatureEnabled: jest
    .fn()
    .mockImplementationOnce(() => true)
    .mockImplementationOnce(() => false),
}))

describe('Given: useIsHighlightChoiceFeatureEnabled() from <HighlightChoice />', () => {
  describe('When: Experiment is running', () => {
    test('It should return true', () => {
      expect(useIsHighlightChoiceFeatureEnabled()).toBeTruthy()
    })

    test('It should return false', () => {
      expect(useIsHighlightChoiceFeatureEnabled()).toBeFalsy()
    })
  })
})
