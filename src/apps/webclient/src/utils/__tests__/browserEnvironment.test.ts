import * as browserEnv from '../browserEnvironment'

let getWindowSpy: jest.SpyInstance
let canUseWindowSpy: jest.SpyInstance

type TestCase = { name: string; url: string }

/**
 * All current url possibilities
 */
const testCases = [
  { name: 'production', url: 'https://www.gousto.co.uk' },
  { name: 'production webclient', url: 'https://production-webclient.gousto.co.uk' },
  { name: 'production frontend', url: 'https://production-frontend.gousto.co.uk' },
  { name: 'staging', url: 'https://staging-www.gousto.info' },
  { name: 'staging webclient', url: 'https://staging-webclient.gousto.info' },
  { name: 'staging frontend', url: 'https://staging-frontend.gousto.info' },
  { name: 'lower env', url: 'https://fef-www.gousto.info' },
  { name: 'lower env webclient', url: 'https://fef-webclient.gousto.info' },
  { name: 'lower env frontend', url: 'https://fef-frontend.gousto.info' },
  { name: 'local', url: 'http://frontend.gousto.local:8080' },
]

/**
 * For each testCase, creates a duplicate with a path and query parameter
 */
const testCasesWithPathAndQueryParams = testCases.reduce<Array<{ name: string; url: string }>>(
  (updatedCases, { name, url }) => [
    ...updatedCases,
    { name, url },
    { name: `${name} + path + query param`, url: `${url}/foo?bar=baz` },
  ],
  []
)

type Assertion = { name: string; expected: unknown }
type TestCaseWithAssertion = {
  name: string
  url: string
  expected: unknown
}

/**
 * Adds assertions to each test case, to be used in it.each(table)
 */
const addAssertionsToTestCases = (assertions: Array<Assertion>, casesToOmit?: string[]) =>
  testCasesWithPathAndQueryParams.reduce<Array<TestCaseWithAssertion>>(
    (testCasesWithAssertions, testCase) => {
      if (casesToOmit) {
        const testCaseShouldBeOmitted = casesToOmit.some((caseToOmit) =>
          testCase.name.includes(caseToOmit)
        )

        if (testCaseShouldBeOmitted) return testCasesWithAssertions
      }

      const assertion = assertions.find(({ name }) => name === testCase.name)

      if (!assertion) return testCasesWithAssertions

      const testCaseWithPathAndQueryParams = testCasesWithPathAndQueryParams.find(
        ({ name }) => name === `${assertion.name} + path + query param`
      ) as TestCase

      const { expected } = assertion

      return [
        ...testCasesWithAssertions,
        {
          ...testCase,
          expected,
        },
        {
          ...testCaseWithPathAndQueryParams,
          expected,
        },
      ]
    },
    []
  )

let win: typeof window

const setWindow = (val?: unknown) => {
  // @ts-expect-error need to be able to set window to undefined
  global.window = val
}

const windowSpy = jest.spyOn(window, 'window', 'get')

describe('client config', () => {
  beforeEach(() => {
    jest.resetAllMocks()

    getWindowSpy = jest.spyOn(browserEnv, 'getWindow')
    canUseWindowSpy = jest.spyOn(browserEnv, 'canUseWindow')
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  describe('canUseWindow', () => {
    it('returns true if window is available', () => {
      windowSpy.mockReturnValue({
        document: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          createElement: () => {},
        },
      })
      expect(browserEnv.canUseWindow()).toBeTruthy()
    })

    it('returns false if window is undefined', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      windowSpy.mockReturnValue(undefined)

      expect(browserEnv.canUseWindow()).toBeFalsy()
    })

    it('returns false if window.document is undefined', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      windowSpy.mockReturnValue({})

      expect(browserEnv.canUseWindow()).toBeFalsy()
    })

    it('returns false if window.document.createElement is undefined', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      windowSpy.mockReturnValue({ document: {} })

      expect(browserEnv.canUseWindow()).toBeFalsy()
    })
  })

  describe('canUseWindowOrThrow', () => {
    it('throws the expected error if DOM is not available', () => {
      canUseWindowSpy.mockReturnValue(false)

      expect(() => browserEnv.canUseWindowOrThrow()).toThrowError('Window does not exist')
    })

    it('does not throw if window is available', () => {
      canUseWindowSpy.mockReturnValue(true)

      expect(() => browserEnv.canUseWindowOrThrow()).not.toThrow()
    })
  })

  describe('protocol functions', () => {
    describe('getClientProtocol', () => {
      it('throws the expected error if window is not available', () => {
        canUseWindowSpy.mockReturnValue(false)

        expect(() => browserEnv.getClientProtocol()).toThrowError('Window does not exist')
      })

      it.each(
        addAssertionsToTestCases([
          { name: 'production', expected: 'https:' },
          { name: 'production webclient', expected: 'https:' },
          { name: 'production frontend', expected: 'https:' },
          { name: 'staging', expected: 'https:' },
          { name: 'staging webclient', expected: 'https:' },
          { name: 'staging frontend', expected: 'https:' },
          { name: 'lower env', expected: 'https:' },
          { name: 'lower env webclient', expected: 'https:' },
          { name: 'lower env frontend', expected: 'https:' },
          { name: 'local', expected: 'http:' },
        ])
      )('for $name url, returns "$expected"', ({ url, expected }) => {
        canUseWindowSpy.mockReturnValue(true)
        getWindowSpy.mockReturnValue({
          location: new URL(url),
        })

        expect(browserEnv.getClientProtocol()).toEqual(expected)
      })
    })

    describe('isHTTPS', () => {
      it.each(
        addAssertionsToTestCases([
          { name: 'production', expected: true },
          { name: 'production webclient', expected: true },
          { name: 'production frontend', expected: true },
          { name: 'staging', expected: true },
          { name: 'staging webclient', expected: true },
          { name: 'staging frontend', expected: true },
          { name: 'lower env', expected: true },
          { name: 'lower env webclient', expected: true },
          { name: 'lower env frontend', expected: true },
          { name: 'local', expected: false },
        ])
      )('for $name url, returns $expected', ({ url, expected }) => {
        canUseWindowSpy.mockReturnValue(true)
        getWindowSpy.mockReturnValue({
          location: new URL(url),
        })

        expect(browserEnv.isHTTPS()).toEqual(expected)
      })
    })
  })

  describe('domain functions', () => {
    describe('getSubdomain', () => {
      it('throws the expected error if window is not available', () => {
        canUseWindowSpy.mockReturnValue(false)

        expect(() => browserEnv.getSubdomain()).toThrowError('Window does not exist')
      })

      it.each(
        addAssertionsToTestCases([
          { name: 'production', expected: 'www' },
          { name: 'production webclient', expected: 'production-webclient' },
          { name: 'production frontend', expected: 'production-frontend' },
          { name: 'staging', expected: 'staging-www' },
          { name: 'staging webclient', expected: 'staging-webclient' },
          { name: 'staging frontend', expected: 'staging-frontend' },
          { name: 'lower env', expected: 'fef-www' },
          { name: 'lower env webclient', expected: 'fef-webclient' },
          { name: 'lower env frontend', expected: 'fef-frontend' },
          { name: 'local', expected: 'frontend' },
        ])
      )('for $name url, returns "$expected"', ({ url, expected }) => {
        canUseWindowSpy.mockReturnValue(true)
        getWindowSpy.mockReturnValue({
          location: new URL(url),
        })

        expect(browserEnv.getSubdomain()).toEqual(expected)
      })
    })

    describe('getTopLevelDomain', () => {
      it('throws the expected error if window is not available', () => {
        canUseWindowSpy.mockReturnValue(false)

        expect(() => browserEnv.getTopLevelDomain()).toThrowError('Window does not exist')
      })

      it.each(
        addAssertionsToTestCases([
          { name: 'production', expected: '.co.uk' },
          { name: 'production webclient', expected: '.co.uk' },
          { name: 'production frontend', expected: '.co.uk' },
          { name: 'staging', expected: '.info' },
          { name: 'staging webclient', expected: '.info' },
          { name: 'staging frontend', expected: '.info' },
          { name: 'lower env', expected: '.info' },
          { name: 'lower env webclient', expected: '.info' },
          { name: 'lower env frontend', expected: '.info' },
          { name: 'local', expected: '.local:8080' },
        ])
      )('for $name url, returns "$expected"', ({ url, expected }) => {
        canUseWindowSpy.mockReturnValue(true)
        getWindowSpy.mockReturnValue({
          location: new URL(url),
        })

        expect(browserEnv.getTopLevelDomain()).toEqual(expected)
      })
    })

    describe('getDomain', () => {
      it('throws the expected error if window is not available', () => {
        canUseWindowSpy.mockReturnValue(false)

        expect(() => browserEnv.getDomain()).toThrowError('Window does not exist')
      })

      it.each(
        addAssertionsToTestCases([
          { name: 'production', expected: 'gousto.co.uk' },
          { name: 'production webclient', expected: 'gousto.co.uk' },
          { name: 'production frontend', expected: 'gousto.co.uk' },
          { name: 'staging', expected: 'gousto.info' },
          { name: 'staging webclient', expected: 'gousto.info' },
          { name: 'staging frontend', expected: 'gousto.info' },
          { name: 'lower env', expected: 'gousto.info' },
          { name: 'lower env webclient', expected: 'gousto.info' },
          { name: 'lower env frontend', expected: 'gousto.info' },
          { name: 'local', expected: 'gousto.local:8080' },
        ])
      )('for $name url, returns "$expected"', ({ url, expected }) => {
        canUseWindowSpy.mockReturnValue(true)
        getWindowSpy.mockReturnValue({
          location: new URL(url),
        })

        expect(browserEnv.getDomain()).toEqual(expected)
      })
    })
  })

  describe('environment functions', () => {
    describe('getLowerEnvironmentName', () => {
      it.each(
        addAssertionsToTestCases(
          [
            { name: 'lower env', expected: 'fef' },
            { name: 'lower env webclient', expected: 'fef' },
            { name: 'lower env frontend', expected: 'fef' },
          ],
          ['production, staging, local']
        )
      )('for $name url, returns $expected', ({ url, expected }) => {
        canUseWindowSpy.mockReturnValue(true)
        getWindowSpy.mockReturnValue({
          location: new URL(url),
        })

        expect(browserEnv.getLowerEnvironmentName()).toEqual(expected)
      })
    })

    describe('getClientEnvironment', () => {
      it('throws the expected error if window is not available', () => {
        canUseWindowSpy.mockReturnValue(false)

        expect(() => browserEnv.getClientEnvironment()).toThrowError('Window does not exist')
      })

      it.each(
        addAssertionsToTestCases([
          { name: 'production', expected: 'production' },
          { name: 'production webclient', expected: 'production' },
          { name: 'production frontend', expected: 'production' },
          { name: 'staging', expected: 'staging' },
          { name: 'staging webclient', expected: 'staging' },
          { name: 'staging frontend', expected: 'staging' },
          { name: 'lower env', expected: 'fef' },
          { name: 'lower env webclient', expected: 'fef' },
          { name: 'lower env frontend', expected: 'fef' },
          { name: 'local', expected: 'local' },
        ])
      )('for $name url, returns "$expected"', ({ url, expected }) => {
        canUseWindowSpy.mockReturnValue(true)
        getWindowSpy.mockReturnValue({
          location: new URL(url),
        })

        expect(browserEnv.getClientEnvironment()).toEqual(expected)
      })
    })

    describe('isProd', () => {
      it.each(
        addAssertionsToTestCases([
          { name: 'production', expected: true },
          { name: 'production webclient', expected: true },
          { name: 'production frontend', expected: true },
          { name: 'staging', expected: false },
          { name: 'staging webclient', expected: false },
          { name: 'staging frontend', expected: false },
          { name: 'lower env', expected: false },
          { name: 'lower env webclient', expected: false },
          { name: 'lower env frontend', expected: false },
          { name: 'local', expected: false },
        ])
      )('for $name url, returns $expected', ({ url, expected }) => {
        canUseWindowSpy.mockReturnValue(true)
        getWindowSpy.mockReturnValue({
          location: new URL(url),
        })

        expect(browserEnv.isProd()).toEqual(expected)
      })
    })

    describe('isDev', () => {
      it.each(
        addAssertionsToTestCases([
          { name: 'production', expected: false },
          { name: 'production webclient', expected: false },
          { name: 'production frontend', expected: false },
          { name: 'staging', expected: false },
          { name: 'staging webclient', expected: false },
          { name: 'staging frontend', expected: false },
          { name: 'lower env', expected: false },
          { name: 'lower env webclient', expected: false },
          { name: 'lower env frontend', expected: false },
          { name: 'local', expected: true },
        ])
      )('for $name url, returns $expected', ({ url, expected }) => {
        canUseWindowSpy.mockReturnValue(true)
        getWindowSpy.mockReturnValue({
          location: new URL(url),
        })

        expect(browserEnv.isDev()).toEqual(expected)
      })
    })
  })
})
