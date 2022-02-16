import useSWR from 'swr'
import { useDispatch } from 'react-redux'
import { renderHook } from '@testing-library/react-hooks'
import { safeJestMock } from '_testing/mocks'
import * as basketSelectors from 'selectors/basket'
import * as orderSelectors from 'routes/Menu/selectors/order'
import { usePricing } from './usePricing'
import { pricingMockedResponse } from './usePricing.mock'

const dispatch = jest.fn()

jest.mock('swr', () => jest.fn())

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn((sel) => sel()),
}))

jest.mock('../auth', () => ({
  useAuth: jest.fn(() => ({
    accessToken: 'test-accessToken',
    authUserId: 'test-authUserId',
  })),
}))

safeJestMock(basketSelectors, 'getBasketSlotId')
safeJestMock(basketSelectors, 'getBasketRecipesCount')
safeJestMock(orderSelectors, 'getOrderV2')

const useDispatchMock = useDispatch as jest.MockedFunction<typeof useDispatch>
const getBasketSlotId = basketSelectors.getBasketSlotId as jest.MockedFunction<
  typeof basketSelectors.getBasketSlotId
>
const getBasketRecipesCount = basketSelectors.getBasketRecipesCount as jest.MockedFunction<
  typeof basketSelectors.getBasketRecipesCount
>
const getOrderV2 = orderSelectors.getOrderV2 as jest.MockedFunction<any>
const useSWRMock = useSWR as jest.MockedFunction<any>

describe('usePricing', () => {
  beforeEach(() => {
    useDispatchMock.mockReturnValue(dispatch)
    getOrderV2.mockReturnValue({ testdata: 'test' })
    useSWRMock.mockImplementation(
      jest.fn(([url]) => (url ? { data: pricingMockedResponse } : { error: true }))
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('when all required data are available', () => {
    beforeEach(() => {
      getBasketSlotId.mockReturnValue('test')
      getBasketRecipesCount.mockReturnValue(2)
    })
    it('should return valid pricing informations', () => {
      const { result } = renderHook(() => usePricing())

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

      expect(result.current.pricing).toBe(null)
    })
  })

  describe('when recipes count is less than 2', () => {
    beforeEach(() => {
      getBasketSlotId.mockReturnValue('testid')
      getBasketRecipesCount.mockReturnValue(1)
    })
    it('should not have any pricing information', () => {
      const { result } = renderHook(() => usePricing())

      expect(result.current.pricing).toBe(null)
    })

    it('should reset the prices store', () => {
      renderHook(() => usePricing())

      expect(dispatch).toHaveBeenCalledWith({ type: 'PRICING_RESET' })
    })
  })

  describe('while SWR is fetching data', () => {
    beforeEach(() => {
      getBasketSlotId.mockReturnValue('test')
      getBasketRecipesCount.mockReturnValue(2)
      useSWRMock.mockReturnValue({ data: null })
    })

    it('should dispatch pending action', () => {
      renderHook(() => usePricing())

      expect(dispatch).toHaveBeenCalledWith({ type: 'PRICING_PENDING' })
    })
  })

  describe('when SWR returns an error', () => {
    beforeEach(() => {
      getBasketSlotId.mockReturnValue('test')
      getBasketRecipesCount.mockReturnValue(2)
      useSWRMock.mockReturnValue({ error: true })
    })

    it('should not have any pricing information', () => {
      const { result } = renderHook(() => usePricing())

      expect(result.current.pricing).toBe(null)
    })
  })
})
