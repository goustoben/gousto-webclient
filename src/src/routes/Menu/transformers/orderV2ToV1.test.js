import { ResourceType } from '../constants/resources'
import { transformOrderV2ToOrderV1 } from './orderV2ToV1'

describe('transformOrderV2ToOrderV1', () => {
  const inputOrder = {
    id: '1234',
    attributes: {
      state: 'pending',
      phase: 'open',
      isWaitingOnUserChoices: true,
      prices: {
        isFlatDiscountApplied: false,
        amountOff: 1,
        percentageOff: 2,
        promoCode: 'abc-def',
        isPromoCodeValid: true,
        perPortion: 10,
        perPortionDiscounted: 9,
        productTotal: 40,
        recipeTotal: 20,
        surchargeTotal: 5.50,
        recipeDiscount: 6.50,
        deliveryTotal: 3.80,
        grossTotal: 100,
        vatCharged: 20,
        total: 120,
        totalDiscount: 19
      }
    },
    relationships: {
      components: {
        data: [

        ]
      },
      box: {
        data: {
          id: 'box-id'
        }
      }
    }
  }

  const included = [
    {
      type: ResourceType.Period,
      attributes: {
        starts_at: '2021-01-01 00:00:00',
        ends_at: '2021-01-14 23:59:00'
      }
    },
    {
      type: ResourceType.Box,
      id: 'box-id',
      attributes: {
        numPortions: 4,
        numRecipes: 3
      }
    }
  ]

  test('should transform id correctly', () => {
    const result = transformOrderV2ToOrderV1(inputOrder, included)

    expect(result.id).toEqual(1234)
  })

  test('should transform state correctly', () => {
    const result = transformOrderV2ToOrderV1(inputOrder, included)

    expect(result.state).toEqual('pending')
  })

  test('should transform phase correctly', () => {
    const result = transformOrderV2ToOrderV1(inputOrder, included)

    expect(result.phase).toEqual('open')
  })

  test('should transform default correctly', () => {
    const result = transformOrderV2ToOrderV1(inputOrder, included)

    expect(result.default).toEqual(true)
  })

  test('should contain empty giftItems', () => {
    const result = transformOrderV2ToOrderV1(inputOrder, included)

    expect(result.giftItems).toEqual([])
  })

  test('should transform box correctly', () => {
    const result = transformOrderV2ToOrderV1(inputOrder, included)

    expect(result.box).toEqual({
      sku: 'box-id',
      numPortions: '4',
      numRecipes: '3'
    })
  })

  test('should transform period correctly', () => {
    const result = transformOrderV2ToOrderV1(inputOrder, included)

    expect(result.period).toEqual({
      whenStart: '2021-01-01 00:00:00',
      whenCutoff: '2021-01-14 23:59:00'
    })
  })

  test('should transform prices correctly', () => {
    const result = transformOrderV2ToOrderV1(inputOrder, included)

    expect(result.prices).toEqual({
      flatDiscountApplied: false,
      amountOff: 1,
      percentageOff: 2,
      promoCode: 'abc-def',
      promoCodeValid: true,
      pricePerPortion: 10,
      pricePerPortionDiscounted: 9,
      productTotal: 40,
      recipeTotal: 20,
      surchargeTotal: 5.50,
      recipeDiscount: 6.50,
      deliveryTotal: 3.80,
      grossTotal: 100,
      vatCharged: 20,
      total: 120,
      totalDiscount: 19
    })
  })
})
