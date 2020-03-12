import { appendFeatureToRequest } from '../appendFeatureToRequest'

describe('given appendFeatureToRequest is being called', () => {
  let request = null

  describe('when featureShorterCompensationPeriod is true', () => {
    beforeEach(() => {
      request = appendFeatureToRequest({
        body: {
          customerId: '123',
        },
        featureShorterCompensationPeriod: true,
      })
    })

    test('the featureShorterCompensationPeriod is being added to the request', () => {
      expect(request).toEqual(
        { customerId: '123', features: ['ssrShorterCompensationPeriod'] }
      )
    })
  })

  describe('when featureShorterCompensationPeriod is true', () => {
    beforeEach(() => {
      request = appendFeatureToRequest({
        body: {
          customerId: '123',
        },
        featureShorterCompensationPeriod: false,
      })
    })

    test('the featureShorterCompensationPeriod is being added to the request', () => {
      expect(request).toEqual(
        { customerId: '123', features: [] }
      )
    })
  })
})
