import { configureDDTracer } from '../datadog'

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
        global.__DATADOG_ENABLED__ = true
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
        global.__DATADOG_ENABLED__ = false
        configureDDTracer()
      })

      it('does not initialize dd-trace', () => {
        expect(mockInit).not.toHaveBeenCalled()
      })
    })

  })
})
