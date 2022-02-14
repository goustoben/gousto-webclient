import {
  extractData,
  formatSuccessResponse,
  isRWithData,
  isRWithDataIncluded,
  isRWithResult,
  isRWithResultData,
  SuccessResponse
} from '../formatResponses'

const testData = {}
const testMeta = {}

const responseWithResult = {
  status: 'ok',
  result: testData
} as const

const responseWithResultData = {
  status: 'ok',
  result: {
    data: testData
  }
} as const

const responseWithDataIncluded = {
  ...testData,
  status: 'ok',
  included: true
} as const

const responseWithData = {
  status: 'ok',
  data: testData
} as const

const responseAsData = {
  ...testData,
  status: 'ok'
}

describe('formatResponses module', () => {
  describe('type assertion functions', () => {
    test.each([
      ['responseWithResult', true, responseWithResult],
      ['responseWithResultData', false, responseWithResultData],
      ['responseWithDataIncluded', false, responseWithDataIncluded],
      ['responseWithData', false, responseWithData],
      ['responseAsData', false, responseAsData]
    ])('Type assertion function isRWithResult given %s returns %b', (name, expected, data) => {
      expect(
        isRWithResult(data as SuccessResponse<never>)
      ).toBe(expected)
    })

    test.each([
      ['responseWithResult', false, responseWithResult],
      ['responseWithResultData', true, responseWithResultData],
      ['responseWithDataIncluded', false, responseWithDataIncluded],
      ['responseWithData', false, responseWithData],
      ['responseAsData', false, responseAsData]
    ])('Type assertion function isRWithResultData given %s returns %b', (name, expected, data) => {
      expect(
        isRWithResultData(data as SuccessResponse<never>)
      ).toBe(expected)
    })

    test.each([
      ['responseWithResult', false, responseWithResult],
      ['responseWithResultData', false, responseWithResultData],
      ['responseWithDataIncluded', true, responseWithDataIncluded],
      ['responseWithData', false, responseWithData],
      ['responseAsData', false, responseAsData]
    ])('Type assertion function isRWithDataIncluded given %s returns %b', (name, expected, data) => {
      expect(
        isRWithDataIncluded(data as SuccessResponse<never>)
      ).toBe(expected)
    })

    test.each([
      ['responseWithResult', false, responseWithResult],
      ['responseWithResultData', false, responseWithResultData],
      ['responseWithDataIncluded', false, responseWithDataIncluded],
      ['responseWithData', true, responseWithData],
      ['responseAsData', false, responseAsData]
    ])('Type assertion function isRWithData given %s returns %b', (name, expected, data) => {
      expect(
        isRWithData(data as SuccessResponse<never>)
      ).toBe(expected)
    })
  })

  describe('extractData', () => {
    type Data = typeof testData

    test('given response with result data property, extracts data', () => {
      const data = extractData<Data>(responseWithResultData)
      expect(data).toBe(testData)
    })

    test('given response with just result property, extracts data', () => {
      const data = extractData<Data>(responseWithResult)
      expect(data).toBe(testData)
    })

    test('given response with data property, extracts data', () => {
      const data = extractData<Data>(responseWithData)
      expect(data).toBe(testData)
    })

    test('given response with data included, returns response', () => {
      const data = extractData<Data>(responseWithDataIncluded)
      expect(data).toBe(responseWithDataIncluded)
    })
  })

  describe('formatSuccessResponse', () => {
    test('can return meta data when response.included falsy', () => {
      const { meta } = formatSuccessResponse(responseWithData, testMeta) as { meta: unknown }
      expect(meta).toBe(testMeta)
    })
  })
})
