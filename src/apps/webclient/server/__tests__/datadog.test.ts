import { configureDDTracer } from '../datadog'
import { DATADOG_ENABLED_ENVS } from '../../src/middlewares/datadog/config'

const mockUse = jest.fn()
const mockInit = jest.fn(() => ({
  use: mockUse,
}))

jest.mock('dd-trace', () => ({
  // @ts-ignore
  init: (args: unknown) => mockInit(args),
}))

describe('datadog', () => {
  describe('configureDDTracer', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    describe('when datadog is enabled', () => {
      beforeEach(() => {
        global.__ENV__ = DATADOG_ENABLED_ENVS[0]
        configureDDTracer()
      })

      it('initializes dd-trace as expected', () => {
        expect(mockInit).toHaveBeenCalledWith({
          env: 'production',
          sampleRate: 1,
          service: 'gousto-webclient',
          version: 'MOCK_CIRCLE_BUILD_NUM',
        })
      })

      it('configures dd-trace as expected', () => {
        expect(mockUse).toHaveBeenCalledWith('http', {
          blocklist: ['/ping'],
        })
      })
    })

    describe('when datadog is not enabled', () => {
      beforeEach(() => {
        global.__ENV__ = 'local'
        configureDDTracer()
      })

      it('does not initialize dd-trace', () => {
        expect(mockInit).not.toHaveBeenCalled()
      })
    })
  })
})
