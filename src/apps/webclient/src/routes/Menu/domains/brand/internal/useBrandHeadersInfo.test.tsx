import * as React from 'react'
import isomorphicFetch from 'isomorphic-fetch'
import { Provider } from 'react-redux'
import { renderHook } from '@testing-library/react-hooks'
import { createMockStore } from 'routes/Menu/_testing/createMockStore'
import { withMockEnvironmentAndDomain } from '_testing/isomorphic-environment-test-utils'
import { useBrandHeadersInfo } from './useBrandHeadersInfo'

jest.mock('isomorphic-fetch', () => jest.fn())

const mockedIsomorphicFetch = isomorphicFetch as jest.MockedFunction<any>

describe('useBrandHeadersInfo', () => {
  // mock the environment and domain config used by these tests to generate endpoints
  withMockEnvironmentAndDomain('production', 'gousto.co.uk')

  let store: jest.Mocked<any>

  beforeEach(() => {
    mockedIsomorphicFetch.mockResolvedValueOnce({
      json: () => ({ data: {} }),
      status: 200,
    })

    store = createMockStore({
      auth: {
        id: 'user one',
        accessToken: 'access token',
      },
    })
  })

  afterEach(() => {
    mockedIsomorphicFetch.mockClear()
  })

  describe('when called', () => {
    const wrapper: React.FC = ({ children }) => <Provider store={store}>{children}</Provider>

    it('should pass all necessary headers to the server side APIs', async () => {
      const { waitForNextUpdate } = renderHook(() => useBrandHeadersInfo(), { wrapper })

      await waitForNextUpdate()

      expect(mockedIsomorphicFetch).toBeCalledWith(
        'https://production-api.gousto.co.uk/brand/v1/menu-headers',
        {
          headers: {
            Authorization: 'Bearer access token',
            'Content-Type': 'application/json',
            'x-gousto-user-id': 'user one',
          },
          method: 'GET',
        }
      )
    })
  })
})
