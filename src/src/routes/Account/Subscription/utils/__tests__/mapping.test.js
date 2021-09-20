import { mapSubscriptionUpdateRequestPayload, mapSubscriptionUpdatePayload } from '../mapping'

describe('mapping', () => {
  test('Expect payload of subscription update response to be mapped correctly', () => {
    const subscription = {
      numRecipes: 2,
      numPortions: 3,
      boxType: 'vegetarian',
      interval: 2,
      intervalUnit: 'weeks',
      deliverySlotStartTime: '08:00:00',
      deliverySlotEndTime: '19:00:00',
      deliverySlotDay: 6,
    }
    const slots = [
      {
        coreSlotId: '123',
        cutoffDay: 3,
        cutoffTime: '11:59:59',
        day: 'Saturday',
        defaultDay: 6,
        deliveryEndTime: '19:00:00',
        deliveryPrice: '0.00',
        deliveryStartTime: '08:00:00',
        id: 'db047c82-12345',
        isDefault: true,
        timeRange: '8am - 7pm',
        whenCutoff: '2020-11-25T11:59:59+00:00',
      },
    ]
    expect(mapSubscriptionUpdatePayload(subscription, slots)).toEqual({
      box: {
        boxType: 'vegetarian',
        numPortions: 3,
        numRecipes: 2
      },
      deliverySlotDay: 6,
      deliverySlotEndTime: '19:00:00',
      deliverySlotStartTime: '08:00:00',
      interval: 2,
      projected: [],
      slot: {
        cutoffDay: 3,
        cutoffTime: '11:59:59',
        default: true,
        defaultDay: 6,
        deliveryEnd: '19:00:00',
        deliveryPrice: '0.00',
        deliveryStart: '08:00:00',
        id: '123',
      },
      state: { description: undefined },
    })
  })
  test('Expect subscription update request to be mapped correctly', () => {
    const subscription = {
      numRecipes: 2,
      numPortions: 3,
      boxType: 'vegetarian',
      interval: 2,
      intervalUnit: 'weeks',
      deliverySlotId: '123',
    }
    const slots = [
      {
        coreSlotId: '123',
        cutoffDay: 3,
        cutoffTime: '11:59:59',
        day: 'Saturday',
        defaultDay: 6,
        deliveryEndTime: '19:00:00',
        deliveryPrice: '0.00',
        deliveryStartTime: '08:00:00',
        id: 'db047c82-12345',
        isDefault: true,
        timeRange: '8am - 7pm',
        whenCutoff: '2020-11-25T11:59:59+00:00',
      },
    ]
    expect(mapSubscriptionUpdateRequestPayload(subscription, slots)).toEqual({
      numRecipes: 2,
      numPortions: 3,
      boxType: 'vegetarian',
      interval: 2,
      intervalUnit: 'weeks',
      deliverySlotStartTime: '08:00:00',
      deliverySlotEndTime: '19:00:00',
      deliverySlotDay: 6,
    })
  })
})
