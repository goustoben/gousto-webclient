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

      expect(result.current.pricing).toEqual({
        amountOff: '0.00',
        deliveryTotal: '0.00',
        flatDiscountApplied: false,
        grossTotal: '29.99',
        items: [],
        percentageOff: '60.00',
        pricePerPortion: '5.00',
        pricePerPortionDiscounted: '2.00',
        productTotal: '0.00',
        promoCode: 'DTI-SB-63',
        promoCodeValid: true,
        recipeDiscount: '17.99',
        recipeTotal: '29.99',
        recipeTotalDiscounted: '12.00',
        surchargeTotal: '0.00',
        total: '12.00',
        totalDiscount: '17.99',
        vatCharged: '0.00',
      })
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
