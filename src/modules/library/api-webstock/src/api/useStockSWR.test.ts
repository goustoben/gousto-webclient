import { renderHook } from '@testing-library/react-hooks'
import { StockAPIResponse } from './response'
import { useHTTPGet } from './useHTTPGet'
import { useStockSWR } from './useStockSWR'

jest.mock('./useHTTPGet')

const useHTTPGetMock = useHTTPGet as jest.MockedFn<typeof useHTTPGet>

function setHTTPGetMock({ data, error }: { data?: any; error?: any }) {
  useHTTPGetMock.mockReturnValue({
    data,
    error,
    isValidating: false,
    mutate: (() => {}) as any,
  })
}

describe('recipe-tile > api > useStockSWR', () => {
  const accessToken = 'access-token'
  const authUserId = 'auth-user-id'
  const coreUrl = 'core-url'
  const getFetcher = () => ({} as any)

  beforeEach(() => {
    useHTTPGetMock.mockClear()
    setHTTPGetMock({ data: null, error: null })
  })

  describe('when deliveryDayId is null', () => {
    const deliveryDayId = null

    test('should pass null url to useHTTPGet', () => {
      renderHook(() => useStockSWR({ accessToken, authUserId, deliveryDayId, getFetcher, coreUrl }))

      expect(useHTTPGetMock).toHaveBeenCalledWith(
        expect.objectContaining({
          url: null,
        }),
      )
    })
  })

  describe('when deliveryDayId is provided', () => {
    const deliveryDayId = 'delivery-day'

    describe('when useHTTPGet returns error', () => {
      const error = new Error('an error occured')

      beforeEach(() => {
        setHTTPGetMock({ data: null, error })
      })

      test('should return error', () => {
        const { result } = renderHook(() => useStockSWR({ accessToken, authUserId, deliveryDayId, getFetcher, coreUrl }))

        expect(result.current.error).toEqual(error)
      })

      test('should return empty stock', () => {
        const { result } = renderHook(() => useStockSWR({ accessToken, authUserId, deliveryDayId, getFetcher, coreUrl }))

        expect(result.current.stock).toEqual({})
      })

      test('should return pending false', () => {
        const { result } = renderHook(() => useStockSWR({ accessToken, authUserId, deliveryDayId, getFetcher, coreUrl }))

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
          const { result } = renderHook(() => useStockSWR({ accessToken, authUserId, deliveryDayId, getFetcher, coreUrl }))

          expect(result.current.isPending).toEqual(true)
        })

        test('should return empty stock', () => {
          const { result } = renderHook(() => useStockSWR({ accessToken, authUserId, deliveryDayId, getFetcher, coreUrl }))

          expect(result.current.stock).toEqual({})
        })

        test('should return null error', () => {
          const { result } = renderHook(() => useStockSWR({ accessToken, authUserId, deliveryDayId, getFetcher, coreUrl }))

          expect(result.current.error).toEqual(null)
        })
      })

      describe('when useHTTPGet returns data', () => {
        describe('when status is ok', () => {
          const data: StockAPIResponse = {
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
                },
              },
              meta: [],
            },
          }

          beforeEach(() => {
            setHTTPGetMock({ data, error })
          })

          test('should return pending false', () => {
            const { result } = renderHook(() => useStockSWR({ accessToken, authUserId, deliveryDayId, getFetcher, coreUrl }))

            expect(result.current.isPending).toEqual(false)
          })

          test('should return stock from response', () => {
            const { result } = renderHook(() => useStockSWR({ accessToken, authUserId, deliveryDayId, getFetcher, coreUrl }))

            expect(result.current.stock).toEqual(data.result.data)
          })

          test('should return null error', () => {
            const { result } = renderHook(() => useStockSWR({ accessToken, authUserId, deliveryDayId, getFetcher, coreUrl }))

            expect(result.current.error).toEqual(null)
          })
        })

        describe('when status is not ok', () => {
          const status = 'SOME_NOT_OK_STATUS' as any
          const data: StockAPIResponse = {
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
            const { result } = renderHook(() => useStockSWR({ accessToken, authUserId, deliveryDayId, getFetcher, coreUrl }))

            expect(result.current.isPending).toEqual(false)
          })

          test('should return empty stock', () => {
            const { result } = renderHook(() => useStockSWR({ accessToken, authUserId, deliveryDayId, getFetcher, coreUrl }))

            expect(result.current.stock).toEqual({})
          })

          test('should return error', () => {
            const { result } = renderHook(() => useStockSWR({ accessToken, authUserId, deliveryDayId, getFetcher, coreUrl }))

            expect(result.current.error).toEqual(status)
          })
        })
      })
    })
  })
})
