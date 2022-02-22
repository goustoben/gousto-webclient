import { isServer } from '../serverEnvironment'

const windowSpy = jest.spyOn(window, 'window', 'get')

describe('serverEnvironment utils', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  describe('isServer', () => {
    test('returns true when window is not available', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      windowSpy.mockReturnValue(undefined)

      expect(isServer()).toEqual(true)
    })

    test('returns false when window is available', () => {
      windowSpy.mockReturnValue({
        document: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          createElement: true,
        },
      })

      expect(isServer()).toEqual(false)
    })
  })
})
