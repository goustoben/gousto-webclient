import { Rec, TypeAssert } from '../test-utils'
import { ResponseMiddleware } from '../types'
import { composeParser } from './parser'
import type { Postcode, JSONAPIResponse, MockUserData } from './parser.fixtures'
import * as fixture from './parser.fixtures'

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Type system
 * ============================================================================
 */

/**
 * Level 1 inference
 */
const parser1 = composeParser(fixture.validateResponse)

const parser1TypeInferred: TypeAssert<
  typeof parser1,
  ResponseMiddleware<Response, Response>
> = true

/**
 * Level 2 inference. Types should flow
 */
const parser2 = composeParser(
  fixture.validateResponse,
  fixture.responseToRecord
)

const parser2TypeInferred: TypeAssert<
  typeof parser2,
  ResponseMiddleware<Response, Rec>
> = true

/**
 * Level 3
 */
const parser3 = composeParser(
  fixture.validateResponse,
  fixture.responseToRecord,
  fixture.validateJSONAPI
)

const parser3TypeInferred: TypeAssert<
  typeof parser3,
  ResponseMiddleware<Response, JSONAPIResponse>
> = true

/**
 * Level 4
 */
const parser4 = composeParser(
  fixture.validateResponse,
  fixture.responseToRecord,
  fixture.validateJSONAPI,
  fixture.jsonAPIToData
)

const parser4TypeInferred: TypeAssert<
  typeof parser4,
  ResponseMiddleware<Response, Rec>
> = true

/**
 * Level 5
 */
const parser5 = composeParser(
  fixture.validateResponse,
  fixture.responseToRecord,
  fixture.validateJSONAPI,
  fixture.jsonAPIToData,
  fixture.validateUser
)

const parser5TypeInferred: TypeAssert<
  typeof parser5,
  ResponseMiddleware<Response, MockUserData>
> = true

/**
 * Level 6
 */
const parser6 = composeParser(
  fixture.validateResponse,
  fixture.responseToRecord,
  fixture.validateJSONAPI,
  fixture.jsonAPIToData,
  fixture.validateUser,
  fixture.userToAddress
)

const parser6TypeInferred: TypeAssert<
  typeof parser6,
  ResponseMiddleware<Response, string[]>
> = true

/**
 * Level 7
 */
const parser7 = composeParser(
  fixture.validateResponse,
  fixture.responseToRecord,
  fixture.validateJSONAPI,
  fixture.jsonAPIToData,
  fixture.validateUser,
  fixture.userToAddress,
  fixture.addressToPostcode
)
const parser7TypeInferred: TypeAssert<
  typeof parser7,
  ResponseMiddleware<Response, string>
> = true

/**
 * Level 8
 */
const parser8 = composeParser(
  fixture.validateResponse,
  fixture.responseToRecord,
  fixture.validateJSONAPI,
  fixture.jsonAPIToData,
  fixture.validateUser,
  fixture.userToAddress,
  fixture.addressToPostcode,
  fixture.validatePostcode
)
const parser8TypeInferred: TypeAssert<
  typeof parser8,
  ResponseMiddleware<Response, Postcode>
> = true

/**
 * Level 9
 */
const parser9 = composeParser(
  fixture.validateResponse,
  fixture.responseToRecord,
  fixture.validateJSONAPI,
  fixture.jsonAPIToData,
  fixture.validateUser,
  fixture.userToAddress,
  fixture.addressToPostcode,
  fixture.validatePostcode,
  fixture.postcodeIsInYorkshire
)
const parser9TypeInferred: TypeAssert<
  typeof parser9,
  ResponseMiddleware<Response, [Postcode, boolean]>
> = true

/**
 * Runtime tests
 * ============================================================================
 */

describe('composeParser', () => {
  const validateResponse = jest.fn(fixture.validateResponse)
  const responseToRecord = jest.fn(fixture.responseToRecord)
  const validateJSONAPI = jest.fn(fixture.validateJSONAPI)
  const jsonAPIToData = jest.fn(fixture.jsonAPIToData)
  const validateUser = jest.fn(fixture.validateUser)
  const userToAddress = jest.fn(fixture.userToAddress)
  const addressToPostcode = jest.fn(fixture.addressToPostcode)
  const validatePostcode = jest.fn(fixture.validatePostcode)
  const postcodeIsInYorkshire = jest.fn(fixture.postcodeIsInYorkshire)

  const parser = composeParser(
    validateResponse,
    responseToRecord,
    validateJSONAPI,
    jsonAPIToData,
    validateUser,
    userToAddress,
    addressToPostcode,
    validatePostcode,
    postcodeIsInYorkshire
  )

  const yorkshireData = {
    data: {
      address: ['17 My House', 'YO15 4SU']
    }
  }

  const yorkshireResponse: any = {
    status: '200',
    json() {
      return Promise.resolve(yorkshireData)
    }
  }

  const badResponse: any = {
    status: 500
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns a function with stacktrace name "composedParser"', () => {
    expect(parser.name).toBe('composedParser')
  })

  describe('returned parser', () => {
    it('executes 1st function with input Response', () => {
      parser(yorkshireResponse)
      expect(validateResponse).toHaveBeenCalledTimes(1)
      expect(validateResponse).toHaveBeenCalledWith(yorkshireResponse)
    })

    it('executes 2nd function with validated Response', () => {
      parser(yorkshireResponse)
      expect(responseToRecord).toHaveBeenCalledTimes(1)
      expect(responseToRecord).toHaveBeenCalledWith(yorkshireResponse)
    })

    it('executes 3rd function with Response.json() resolved promise', async () => {
      await parser(yorkshireResponse)
      expect(validateJSONAPI).toHaveBeenCalledTimes(1)
      expect(validateJSONAPI).toHaveBeenCalledWith(yorkshireData)
    })

    it('executes 4th function with validate JSON API object', async () => {
      await parser(yorkshireResponse)
      expect(jsonAPIToData).toHaveBeenCalledTimes(1)
      expect(jsonAPIToData).toHaveBeenCalledWith(yorkshireData)
    })

    it('executes 5th function with JSON API data', async () => {
      await parser(yorkshireResponse)
      expect(validateUser).toHaveBeenCalledTimes(1)
      expect(validateUser).toHaveBeenCalledWith(yorkshireData.data)
    })

    it('executes 6th function with validated MockUser object', async () => {
      await parser(yorkshireResponse)
      expect(userToAddress).toHaveBeenCalledTimes(1)
      expect(userToAddress).toHaveBeenCalledWith(yorkshireData.data)
    })

    it('executes 7th function with address data', async () => {
      await parser(yorkshireResponse)
      expect(addressToPostcode).toHaveBeenCalledTimes(1)
      expect(addressToPostcode).toHaveBeenCalledWith(
        yorkshireData.data.address
      )
    })

    it('executes 8th function with postcode', async () => {
      await parser(yorkshireResponse)
      expect(validatePostcode).toHaveBeenCalledTimes(1)
      expect(validatePostcode).toHaveBeenCalledWith(
        yorkshireData.data.address[1]
      )
    })

    it('executes 9th function with validated postcode', async () => {
      await parser(yorkshireResponse)
      expect(postcodeIsInYorkshire).toHaveBeenCalledTimes(1)
      expect(postcodeIsInYorkshire).toHaveBeenCalledWith(
        yorkshireData.data.address[1]
      )
    })

    it('returns mapped value', async () => {
      const isInYorkshire = await parser(yorkshireResponse)
      expect(isInYorkshire).toStrictEqual(['YO15 4SU', true])
    })

    it('errors are bubbled up', () => {
      expect(() => parser(badResponse)).toThrowError('Bad response')
    })

    describe('promise handling', () => {
      it('if an async parser is passed, output value is a promise', async () => {
        const asyncParser = composeParser(validateResponse, responseToRecord)
        const parsed = asyncParser(yorkshireResponse)
        expect(parsed).toBeInstanceOf(Promise)

        const resolved = await parsed
        expect(resolved).toBe(yorkshireData)
      })

      it('if an async parser is passed, piped value is resolved first', async () => {
        const asyncParser = composeParser(
          validateResponse,
          responseToRecord,
          validateJSONAPI
        )

        await asyncParser(yorkshireResponse)

        const [piped] = validateJSONAPI.mock.calls[0]
        expect(piped).not.toBeInstanceOf(Promise)
      })

      it('if no async parsers are passed, output value is synchronous', () => {
        const syncParser = composeParser(
          jsonAPIToData,
          validateUser,
          userToAddress,
          addressToPostcode,
          validatePostcode,
          postcodeIsInYorkshire
        )

        const result = syncParser(yorkshireData)
        expect(result).not.toBeInstanceOf(Promise)
      })
    })
  })
})
