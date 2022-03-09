import { envConfig } from '../../config/env'
import { getServerEnvironment } from '../serverEnvironment'

jest.mock('../../config/env')

describe('serverEnvironment', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('getServerEnvironment', () => {
    test('returns ENVIRONMENT from envConfig', () => {
      envConfig.ENVIRONMENT = 'test-environment'

      expect(getServerEnvironment()).toEqual('test-environment')
    })
  })
})
