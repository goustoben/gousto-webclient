import { mapSubscriptionUpdateV2RequestPayload, mapSubscriptionUpdateV2Payload } from '../mapping'

describe('mapping', () => {
  test('Expect payload of subscription update response to be mapped correctly to v2', () => {
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
    expect(mapSubscriptionUpdateV2Payload(subscription, slots)).toEqual({
      box: { box_type: 'vegetarian', num_portions: 3, num_recipes: 2 },
      delivery_slot_day: 6,
      delivery_slot_end_time: '19:00:00',
      delivery_slot_start_time: '08:00:00',
      interval: 2,
      projected: [],
      slot: {
        cutoff_day: 3,
        cutoff_time: '11:59:59',
        default: true,
        default_day: 6,
        delivery_end: '19:00:00',
        delivery_price: '0.00',
        delivery_start: '08:00:00',
        id: '123',
      },
      state: { description: undefined },
    })
  })
  test('Expect payload of subscription update response to be mapped correctly to v2', () => {
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
    expect(mapSubscriptionUpdateV2RequestPayload(subscription, slots)).toEqual({
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
