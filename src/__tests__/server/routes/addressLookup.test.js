jest.mock('server/service/addressLookup')
import lookupRoute from 'server/routes/addressLookup'

describe('addressLookup', () => {
  let next
  let mock

  const dummyLookupResponse = {
    data: {
      deliveryPoints: [
        { line_1: 'Address 1 Line 1', line_2: 'Address 1 Line 2', udprn: 'Address 1 udprn' },
        { line_1: 'Address 2 Line 1', line_2: 'Address 2 Line 2', udprn: 'Address 2 udprn' },
      ],
      town: 'Dummy Town',
      postcode: 'Dummy Postcode',
      traditionalCounty: 'Dummy County'
    }
  }

  beforeEach(() => {
    next = jest.fn()

    mock = require('server/service/addressLookup').default
    mock.mockImplementation(() => dummyLookupResponse)
  })

  describe('Given request path is not /address-postcode-lookup', () => {
    test('Then it should call next()', async () => {
      const ctx = {
        request: {
          path: '/not-postcode-lookup'
        }
      }

      expect.assertions(1)
      await lookupRoute(ctx, next)

      expect(next).toHaveBeenCalled()
    })
  })

  describe('Given request path is /address/postcode-lookup', () => {
    describe('And the request is well formed', () => {
      const ctx = {
        path: '/address/postcode-lookup',
        query: {
          postcode: 'AB1 2CD'
        },
        method: 'GET'
      }

      test('Then it should request data from the service', async () => {
        expect.assertions(2)

        await lookupRoute(ctx, next)

        expect(mock).toHaveBeenCalled()
        expect(mock.mock.calls[0][0]).toEqual('AB1 2CD')
      })

      test('Then it should set the response body', async () => {
        expect.assertions(1)

        await lookupRoute(ctx, next)

        expect(ctx.body).toEqual(dummyLookupResponse.data)
      })
    })

    describe('And the postcode query parameter is not present', () => {
      const ctx = {
        path: '/address/postcode-lookup',
        query: {},
        throw: jest.fn(),
        method: 'GET'
      }

      ctx.throw.mockImplementation(() => jest.fn())

      test('Then it should throw a validation error', async () => {
        expect.assertions(1)

        await lookupRoute(ctx, next)

        expect(ctx.throw).toHaveBeenCalledWith(400, expect.stringMatching(/postcode/))
      })
    })

    describe('And the HTTP method is not GET', () => {
      const badMethods = [
        'POST',
        'PATCH',
        'PUT',
        'DELETE'
      ]

      badMethods.forEach(method => {
        test('Then it should throw a 405 error(' + method + ')', async () => {
          const ctx = {
            path: '/address/postcode-lookup',
            query: {
              postcode: 'AB1 2CD'
            },
            throw: jest.fn(),
            method,
          }

          ctx.throw.mockImplementation(() => jest.fn())

          expect.assertions(1)

          await lookupRoute(ctx, next)

          expect(ctx.throw).toHaveBeenCalledWith(405)
        })
      })
    })
  })
})
