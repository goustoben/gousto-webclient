import { renderHook, cleanup } from '@testing-library/react-hooks'
import { user } from './sides.hook.mock'
import { useSides } from "routes/Menu/apis/sides.hook/useSides"

describe('useSides', () => {
  const accessToken = 'access-token'
  const order = { some: 'thing' }

  afterEach(cleanup)

  describe('when request fails', () => {
    test('the error key should be populated', async () => {
      const userId = user.withError

      const { result, waitFor } = renderHook(() => useSides({ userId, accessToken, order }))

      await waitFor(() => {
        expect(result.current.error).not.toBeUndefined()
      })

      expect(result.current.data).toBeUndefined()
      expect(result.current.error.info).toEqual(
        {
          errors: [{
            detail: 'Internal Server Error',
            status: '500'
          }],
          meta: {trace_id: 'trace_id'}
        }
      )
      expect(result.current.error.status).toEqual(500)
    })
  })

  describe('when request successful without sides', () => {
    test('the data key is should be populated', async () => {
      const userId = user.withOutSides

      const { result, waitFor } = renderHook(() => useSides({ userId, accessToken, order }))

      await waitFor(() => {
        expect(result.current.data).not.toBeUndefined()
      })

      expect(result.current.error).toBeUndefined()
      expect(result.current.data).toEqual(
        {data: [], includes: [], meta: {max_products_per_box: 10}}
      )
    })
  })

  describe('when request successful sides', () => {
    test('the data key is should be populated', async () => {
      const userId = user.withSides

      const { result, waitFor } = renderHook(() => useSides({ userId, accessToken, order }))

      await waitFor(() => {
        expect(result.current.data).not.toBeUndefined()
      })

      expect(result.current.error).toBeUndefined()
      expect(result.current.data).toEqual(
        {
          data: expect.arrayContaining([
            expect.objectContaining({
              type: 'product',
            }),
            expect.objectContaining({
              type: 'product',
            }),
            expect.objectContaining({
              type: 'product',
            }),
          ]),
          includes: [],
          meta: {max_products_per_box: 10}
        }
      )
    })
  })
})
