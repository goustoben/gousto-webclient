import { isServerSideFetchEligible } from './renderType'

describe('isServerSideFetchEligible', () => {
  let headers
  let path
  describe('when header contains x-pre-render false', () => {
    beforeEach(() => {
      headers = {
        'x-pre-render': 'false'
      }
      path = '/'
    })
    test('should return false', () => {
      const result = isServerSideFetchEligible(headers, path)
      expect(result).toBe(false)
    })
  })
  describe('when header contains x-pre-render false', () => {
    beforeEach(() => {
      headers = {}
      path = '/'
    })
    test('should return false', () => {
      const result = isServerSideFetchEligible(headers, path)
      expect(result).toBe(true)
    })
  })

  describe('when path is menu', () => {
    describe('when __ENV__ is not production', () => {
      beforeEach(() => {
        headers = {}
        path = '/menu'
        // eslint-disable-next-line no-underscore-dangle
        global.__ENV__ = 'local'
      })

      test('should return true', () => {
        const result = isServerSideFetchEligible(headers, path)
        expect(result).toBe(false)
      })

      describe('when path is menu/something', () => {
        beforeEach(() => {
          path = '/menu/something'
        })

        test('should return false', () => {
          const result = isServerSideFetchEligible(headers, path)
          expect(result).toBe(false)
        })
      })
    })

    describe('when __ENV__ is production', () => {
      beforeEach(() => {
        headers = {}
        path = '/menu'
        // eslint-disable-next-line no-underscore-dangle
        global.__ENV__ = 'production'
      })

      test('should return false', () => {
        const result = isServerSideFetchEligible(headers, path)
        expect(result).toBe(true)
      })
    })
  })
})
