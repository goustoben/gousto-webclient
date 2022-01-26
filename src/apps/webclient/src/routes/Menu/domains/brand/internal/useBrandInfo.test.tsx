import * as React from 'react'
import isomorphicFetch from 'isomorphic-fetch'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import Immutable from 'immutable'
import { renderHook } from '@testing-library/react-hooks'
import { useBrandInfo } from './useBrandInfo'

jest.mock('isomorphic-fetch', () => jest.fn())

const mockedIsomorphicFetch = isomorphicFetch as jest.MockedFunction<any>

describe('useBrandInfo', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when called', () => {
    mockedIsomorphicFetch.mockResolvedValueOnce({
      json: () => ({ data: {} }),
      status: 200,
    })

    const mockStore = configureMockStore()
    const store = mockStore({
      auth: Immutable.Map({
        id: 'user one',
        accessToken: 'access token',
      }),
    })

    const wrapper: React.FC = ({ children }) => <Provider store={store}>{children}</Provider>

    it('should pass all necessary headers to the server side APIs', async () => {
      const { waitForNextUpdate } = renderHook(() => useBrandInfo(), { wrapper })

      await waitForNextUpdate()

      expect(mockedIsomorphicFetch).toBeCalledWith(
        'https://production-api.gousto.co.uk/brand/v1/theme',
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
