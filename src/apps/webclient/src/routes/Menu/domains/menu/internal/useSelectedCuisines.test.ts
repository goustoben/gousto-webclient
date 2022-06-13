import { useSelectedCuisines } from './useSelectedCuisines'

jest.mock('containers/OptimizelyRollouts', () => ({
  ...jest.requireActual('containers/OptimizelyRollouts'),
  isOptimizelyFeatureEnabledFactory: jest.fn(),
  useIsOptimizelyFeatureEnabled: jest.fn(
    () => (feature: string) => feature === 'turnips_personalised_signup_enabled',
  ),
}))

describe('useSelectedCuisines', () => {
  test('should return null if selectedCuisines includes None of these', () => {
    window.sessionStorage.setItem('selectedCuisines', JSON.stringify(['None of these']))

    expect(useSelectedCuisines()).toBeNull()
  })

  test('should return cuisines if conditions are met', () => {
    window.sessionStorage.setItem('selectedCuisines', JSON.stringify(['Indian', 'Mexican']))

    expect(useSelectedCuisines()).toEqual(['indian', 'mexican'])
  })
})
