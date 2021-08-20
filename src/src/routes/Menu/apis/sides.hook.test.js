import { renderHook } from '@testing-library/react-hooks'
import { user } from './sides.hook.mock'
import { usePostSides } from './sides.hook'

describe('usePostSides', () => {
  const createOrder = () => ({ some: 'thing' })

  $T.setupServer($T.handlers.sides)

  describe('when request fails', () => {
    beforeEach(() => {
      $T.setUserId(user.withError)
    })

    it('the error key should be populated', async () => {
      const order = createOrder()

      const { result, waitFor } = renderHook(() => usePostSides({ order }))

      await waitFor(() => {
        expect(result.current.error).not.toBeUndefined()
      })

      expect(result.current.data).toBeUndefined()
      expect(result.current.error).toMatchInlineSnapshot('[HTTPError: Internal Server Error]')
      expect(result.current.error.response.status).toEqual(500)
    })
  })

  describe('when request successful without sides', () => {
    beforeEach(() => {
      $T.setUserId(user.withOutSides)
    })

    it('the data key is should be populated', async () => {
      const order = createOrder()

      const { result, waitFor } = renderHook(() => usePostSides({ order }))

      await waitFor(() => {
        expect(result.current.data).not.toBeUndefined()
      })

      expect(result.current.error).toBeUndefined()
      expect(result.current.data).toEqual({
        data: [],
        includes: [],
        meta: { max_products_per_box: 10 },
      })
    })
  })

  describe('when request successful sides', () => {
    beforeEach(() => {
      $T.setUserId(user.withSides)
    })

    it('the data key is should be populated', async () => {
      const order = createOrder()

      const { result, waitFor } = renderHook(() => usePostSides({ order }))

      await waitFor(() => {
        expect(result.current.data).not.toBeUndefined()
      })

      expect(result.current.error).toBeUndefined()
      expect(result.current.data).toEqual({
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
        meta: { max_products_per_box: 10 },
      })
    })

    describe('when called with makeRequest set to false', () => {
      it('it should not make a request', async () => {
        const order = createOrder()

        const { result } = renderHook(() => usePostSides({ order, makeRequest: false }))

        expect(result.current.error).toBeUndefined()
        expect(result.current.data).toBeUndefined()
      })
    })
  })
})
