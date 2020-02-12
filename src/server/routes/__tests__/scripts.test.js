import { extractScriptOptions } from '../scripts'

describe('scripts', () => {
  describe('extractScriptOptions', () => {
    describe('given no query param object on request', () => {
      const request = { }

      describe('when the method under test is called', () => {
        let result

        beforeEach(() => {
          result = extractScriptOptions(request)
        })

        test('then result should match default options', () => {
          expect(result).toEqual({ facebookTracking: true, gtm: true, optimizely: true, other: true })
        })
      })
    })

    const cases = [
      [{}, { facebookTracking: true, gtm: true, optimizely: true, other: true }],
      [{noThirdParty: 'false'}, { facebookTracking: true, gtm: true, optimizely: true, other: true }],
      [{noFacebookTracking: 'false'}, { facebookTracking: true, gtm: true, optimizely: true, other: true }],
      [{noGTM: 'false'}, { facebookTracking: true, gtm: true, optimizely: true, other: true }],
      [{noOptimizely: 'false'}, { facebookTracking: true, gtm: true, optimizely: true, other: true }],
      [{noThirdParty: 'false', noFacebookTracking: 'true'}, { facebookTracking: false, gtm: true, optimizely: true, other: true }],
      [{noThirdParty: 'false', noGTM: 'true'}, { facebookTracking: true, gtm: false, optimizely: true, other: true }],
      [{noThirdParty: 'false', noOptimizely: 'true'}, { facebookTracking: true, gtm: true, optimizely: false, other: true }],
      [{noFacebookTracking: 'true'}, { facebookTracking: false, gtm: true, optimizely: true, other: true }],
      [{noGTM: 'true'}, { facebookTracking: true, gtm: false, optimizely: true, other: true }],
      [{noOptimizely: 'true'}, { facebookTracking: true, gtm: true, optimizely: false, other: true }],
      [{noThirdParty: 'true'}, { facebookTracking: false, gtm: false, optimizely: false, other: false }],
      [{noThirdParty: 'true', noFacebookTracking: 'true'}, { facebookTracking: false, gtm: false, optimizely: false, other: false }],
      [{noThirdParty: 'true', noGtm: 'true'}, { facebookTracking: false, gtm: false, optimizely: false, other: false }],
      [{noThirdParty: 'true', noOptimizely: 'true'}, { facebookTracking: false, gtm: false, optimizely: false, other: false }],
    ]

    describe.each(cases)('given a query params of %o', (query, expected) => {
      let request

      beforeEach(() => {
        request = { query }
      })

      describe('when the method under test is called', () => {
        let result

        beforeEach(() => {
          result = extractScriptOptions(request)
        })

        test(`then result should match expected script options of ${JSON.stringify(expected)}`, () => {
          expect(result).toEqual(expected)
        })
      })
    })
  })
})
