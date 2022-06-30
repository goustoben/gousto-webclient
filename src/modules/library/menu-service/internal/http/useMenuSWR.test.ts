import { renderHook } from '@testing-library/react-hooks'
import { MenuAPIQueryData, MenuAPIResponse } from './response'
import { useHTTPGet } from './useHTTPGet'
import { useMenuSWR } from './useMenuSWR'

jest.mock('./useHTTPGet')

const useHTTPGetMock = useHTTPGet as jest.MockedFn<typeof useHTTPGet>

function setHTTPGetMock({ data, error }: { data?: any, error?: any }) {
  useHTTPGetMock.mockReturnValue({
    data,
    error,
    isValidating: false,
    mutate: (() => { }) as any,
  })
}

function renderForTest(args: Partial<Parameters<typeof useMenuSWR>[0]> = {}) {
    const requestArgs = {
        endpointUrl: 'endpoint-url',
        accessToken: 'access-token',
        authUserId: 'auth-user-id',
        requestData: {},
        getFetcher: () => ({} as any),
        ...args
    }

    return renderHook(() => useMenuSWR(requestArgs))
}

describe('menu-service > useMenuSWR', () => {
  const endpointUrl = 'endpoint-url'
  const getFetcher = () => ({} as any)

  beforeEach(() => {
    useHTTPGetMock.mockClear()
    setHTTPGetMock({ data: null, error: null })
  })

  describe('when useHTTPGet returns error', () => {
    const error = new Error('an error occured')

    beforeEach(() => {
      setHTTPGetMock({ data: null, error })
    })

    test('should return error', () => {
      const { result } = renderForTest()

      expect(result.current.error).toEqual(error)
    })

    test('should return empty response', () => {
      const { result } = renderForTest()

      expect(result.current.response).toEqual({})
    })

    test('should return pending false', () => {
      const { result } = renderForTest()

      expect(result.current.isPending).toEqual(false)
    })
  })

  describe('when useHTTPGet does not return error', () => {
    const error = null

    describe('when useHTTPGet does not return data', () => {
      const data = null

      beforeEach(() => {
        setHTTPGetMock({ data, error })
      })

      test('should return pending true', () => {
        const { result } = renderForTest()

        expect(result.current.isPending).toEqual(true)
      })

      test('should return empty response', () => {
        const { result } = renderForTest()

        expect(result.current.response).toEqual({})
      })

      test('should return null error', () => {
        const { result } = renderForTest()

        expect(result.current.error).toEqual(null)
      })
    })

    describe('when useHTTPGet returns data', () => {
      describe('when status is ok', () => {
        const data: MenuAPIResponse = {
          status: 'ok',
          result: {
            data: {
              '1234': {
                committed: '0',
                recipe_id: 1234,
                family_number: 100,
                number: 100,
                period_id: 5,
                slot_number: '7',
              }
            },
            meta: [],
          },
        }

        beforeEach(() => {
          setHTTPGetMock({ data, error })
        })

        test('should return pending false', () => {
          const { result } = renderForTest()

          expect(result.current.isPending).toEqual(false)
        })

        test('should return stock from response', () => {
          const { result } = renderForTest()

          expect(result.current.response).toEqual(data.result)
        })

        test('should return null error', () => {
          const { result } = renderForTest()

          expect(result.current.error).toEqual(null)
        })
      })

      describe('when status is not ok', () => {
        const status = 'SOME_NOT_OK_STATUS' as any
        const data: MenuAPIResponse = {
          status,
          result: {
            data: {},
            meta: [],
          },
        }

        beforeEach(() => {
          setHTTPGetMock({ data, error })
        })

        test('should return pending false', () => {
          const { result } = renderForTest()

          expect(result.current.isPending).toEqual(false)
        })

        test('should return empty response', () => {
          const { result } = renderForTest()

          expect(result.current.response).toEqual({})
        })

        test('should return error', () => {
          const { result } = renderForTest()

          expect(result.current.error).toEqual(
            status
          )
        })
      })
    })
  })

  describe('when requestData provided', () => {
    const requestData: MenuAPIQueryData = {
        include: 'ingredients',
        addAlternatives: true,
        tasteProfileId: 'taste-profile-id',
        'preview[auth_user_id]': '12345',
        'preview[expiry]': 'abcdef',
        'preview[menu_id]': '100',
        'preview[signature]': 'ghjkl',
    }

    test('should call useHTTPGet with requestData', () => {
      renderForTest({ requestData })
  
      expect(useHTTPGetMock).toHaveBeenCalledWith(expect.objectContaining({
          requestData
      }))
    })
  })
})
