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
})
