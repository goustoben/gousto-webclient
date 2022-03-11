import * as env from 'utils/isomorphicEnvironment'
import { createConfigMap } from '../configMap'

const getClientEnvironmentSpy = jest.spyOn(env, 'getEnvironment')

const createGetMockConfig = () =>
  createConfigMap(
    {
      staging: 'staging-value',
      production: 'production-value',
      default: 'default-value',
    },
    { defaultKey: 'default' }
  )

let getMockConfig: ReturnType<typeof createConfigMap>

describe('configMap utils', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('createConfigMap', () => {
    beforeEach(() => {
      getMockConfig = createGetMockConfig()
    })

    test('returns a getter fn that returns correct val from config map based on current env', () => {
      (getClientEnvironmentSpy as jest.SpyInstance).mockReturnValue('production')

      expect(getMockConfig()).toEqual('production-value')
    })

    test('returns a getter fn that returns default val from config map if current env does not exist in map', () => {
      (getClientEnvironmentSpy as jest.SpyInstance).mockReturnValue('fef')

      expect(getMockConfig()).toEqual('default-value')
    })

    test('memoizes value correctly', () => {
      expect.assertions(2);
      (getClientEnvironmentSpy as jest.SpyInstance).mockReturnValue('production')

      // Populates memo
      getMockConfig()

      // Retrieves value from memo
      // instead of invoking getClientEnvironment again
      const result = getMockConfig()

      expect(getClientEnvironmentSpy).toHaveBeenCalledTimes(1)
      expect(result).toEqual('production-value')
    })
  })
})
