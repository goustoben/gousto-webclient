import { getEnvConfig } from '../../../src/utils/processEnv'
import { getServerEnvironment } from '../serverEnvironment'

jest.mock('../../../src/utils/processEnv')

describe('serverEnvironment', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('getServerEnvironment', () => {
    test('returns ENVIRONMENT from getEnvConfig', () => {
      (getEnvConfig as jest.Mock).mockReturnValue({ ENVIRONMENT: 'test-environment' })

      expect(getServerEnvironment()).toEqual('test-environment')
    })
  })
})
