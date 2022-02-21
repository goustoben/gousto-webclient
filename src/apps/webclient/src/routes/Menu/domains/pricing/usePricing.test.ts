import { useDispatch } from 'react-redux'
import { renderHook } from '@testing-library/react-hooks'
import { safeJestMock } from '_testing/mocks'
import * as basketSelectors from 'selectors/basket'
import * as orderSelectors from 'routes/Menu/selectors/order'
import { useAuth } from '../auth'
import { usePricing } from './usePricing'
import { user } from './usePricing.mock'

const dispatch = jest.fn()

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn((sel) => sel()),
}))

jest.mock('../auth', () => ({
  useAuth: jest.fn(() => ({
    accessToken: 'test-accessToken',
    authUserId: user.valid,
  })),
}))

safeJestMock(basketSelectors, 'getBasketSlotId')
safeJestMock(basketSelectors, 'getBasketRecipesCount')
safeJestMock(basketSelectors, 'getPromoCode')
safeJestMock(orderSelectors, 'getOrderV2')

const useDispatchMock = useDispatch as jest.MockedFunction<typeof useDispatch>
const useAuthMock = useAuth as jest.MockedFunction<typeof useAuth>
const getBasketSlotId = basketSelectors.getBasketSlotId as jest.MockedFunction<
  typeof basketSelectors.getBasketSlotId
>
const getBasketRecipesCount = basketSelectors.getBasketRecipesCount as jest.MockedFunction<
  typeof basketSelectors.getBasketRecipesCount
>
const getOrderV2 = orderSelectors.getOrderV2 as jest.MockedFunction<any>

describe('usePricing', () => {
  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch)
    getOrderV2.mockReturnValue({ testdata: 'test' })
    useAuthMock.mockReturnValue({
      accessToken: Math.random().toString(), // controls SWR cache
      authUserId: user.valid,
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('when all required data are available', () => {
    beforeEach(() => {
      getBasketSlotId.mockReturnValue('test')
      getBasketRecipesCount.mockReturnValue(2)
    })
    it('should return valid pricing informations', async () => {
      const { result, waitForNextUpdate } = renderHook(() => usePricing())
      expect(result.current.isValid).toBe(true)
      await waitForNextUpdate()

      expect(result.current.pricing?.recipeTotal).toBe('29.99')
    })
  })

  describe('when delivery slot is not selected', () => {
    beforeEach(() => {
      getBasketSlotId.mockReturnValue(null)
      getBasketRecipesCount.mockReturnValue(2)
    })
    it('should not have any pricing information', () => {
      const { result } = renderHook(() => usePricing())
      expect(result.current.isValid).toBe(false)
      expect(result.current.pricing).toBe(null)
      expect(result.current.pending).toBe(false)
    })
  })

  describe('when recipes count is less than 2', () => {
    beforeEach(() => {
      getBasketSlotId.mockReturnValue('testid')
      getBasketRecipesCount.mockReturnValue(1)
    })
    it('should not have any pricing information', () => {
      const { result } = renderHook(() => usePricing())
      expect(result.current.isValid).toBe(false)
      expect(result.current.pricing).toBe(null)
      expect(result.current.pending).toBe(false)
    })

    it('should reset the prices store', async () => {
      renderHook(() => usePricing())
      expect(dispatch).toHaveBeenCalledWith({ type: 'PRICING_RESET' })
    })
  })

  describe('while SWR is fetching data', () => {
    beforeEach(() => {
      getBasketSlotId.mockReturnValue('test')
      getBasketRecipesCount.mockReturnValue(2)
      useAuthMock.mockReturnValue({
        accessToken: Math.random().toString(),
        authUserId: user.idle,
      })
    })

    it('should dispatch pending action', async () => {
      const { waitForNextUpdate } = renderHook(() => usePricing())
      await waitForNextUpdate()
      expect(dispatch).toHaveBeenCalledWith({ type: 'PRICING_PENDING' })
    })

    it('should be in pending state until it has response', async () => {
      const { result, waitFor } = renderHook(() => usePricing())
      expect(result.current.pending).toBe(true)

      await waitFor(() => {
        expect(result.current.pricing).toBeDefined()
        expect(result.current.pending).toBe(false)
      })
    })
  })

  describe('when SWR returns an error', () => {
    beforeEach(() => {
      getBasketSlotId.mockReturnValue('test')
      getBasketRecipesCount.mockReturnValue(2)
      useAuthMock.mockReturnValue({
        accessToken: 'test-accessToken',
        authUserId: user.error,
      })
    })

    it('should not have any pricing information', async () => {
      const { result, waitForNextUpdate } = renderHook(() => usePricing())
      await waitForNextUpdate()
      expect(result.current.pricing).toBe(null)
      expect(result.current.pending).toBe(false)
      expect(result.current.isValid).toBe(true)
    })
  })
})
