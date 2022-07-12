import { getUrl } from './url'
import { RequestConfig } from '../types'

describe('fetchConfig utils', () => {
  describe('getUrl', () => {
    const bareRequest: RequestConfig = {
      host: 'https://test-api.gousto.info',
      method: 'GET',
      paths: []
    }

    it('includes host', () => {
      const url = getUrl(bareRequest)
      expect(url).toBe('https://test-api.gousto.info')
    })

    describe('path serialisation', () => {
      it('adds paths', () => {
        const url = getUrl({
          ...bareRequest,
          paths: ['hello', 'world']
        })
        expect(url).toBe('https://test-api.gousto.info/hello/world')
      })

      it('ignores empty path arrays', () => {
        const url = getUrl(bareRequest)
        expect(url).toBe('https://test-api.gousto.info')
      })
    })

    describe('query parameter serialisation', () => {
      it('creates a querystring', () => {
        const url = getUrl({
          ...bareRequest,
          queryParams: {
            foo: 'bar'
          }
        })
        expect(url).toBe('https://test-api.gousto.info?foo=bar')
      })

      it('ignores empty objects', () => {
        const url = getUrl({
          ...bareRequest,
          queryParams: {}
        })
        expect(url).toBe('https://test-api.gousto.info')
      })

      it('serialises empty values as "key="', () => {
        const url = getUrl({
          ...bareRequest,
          queryParams: {
            foo: '',
            bar: ''
          }
        })
        expect(url).toBe('https://test-api.gousto.info?foo=&bar=')
      })
    })

    test('paths and query params coexist', () => {
      const url = getUrl({
        ...bareRequest,
        paths: ['hello', 'world'],
        queryParams: {
          foo: 'bar'
        }
      })
      expect(url).toBe('https://test-api.gousto.info/hello/world?foo=bar')
    })
  })
})
