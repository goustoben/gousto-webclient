import Immutable from 'immutable'
import { deliveryTariffTypes } from 'utils/deliveries'

export const createState = (partialOverwrite = {}) => {
  const {
    basket = {},
    menuService = {},
    features = {},
    slot = {},
    user = {},
    auth = {},
    ...rest
  } = partialOverwrite

  return ({
    basket: Immutable.fromJS({
      currentMenuId: '433',
      date: '2019-10-10',
      slotId: 'slot-uuid',
      recipes: {
        'recipe-id-1': 1,
        'recipe-id-2': 2,
      },
      numPortions: 2,
      ...basket
    }),
    menuService: {
      recipe: {
        'recipe-id-1': {
          id: 'recipe-uuid-1'
        },
        'recipe-id-2': {
          id: 'recipe-uuid-2'
        },
      },
      ...menuService
    },
    boxSummaryDeliveryDays: Immutable.fromJS({
      '2019-10-10': {
        id: 'delivery-days-uuid',
        date: '2019-10-10',
        coreDayId: 'delivery-days-id',
        deliverySlotLeadTimeId: deliveryTariffTypes.NON_NDD,
        slots: [
          {
            id: 'slot-uuid',
            coreSlotId: 'slot-core-id',
            daySlotLeadTimeId: 'day-slot-lead-time-uuid',
            ...slot
          },
        ],
      },
    }),
    features: Immutable.fromJS({
      ndd: {
        value: 'features-ndd-day-slot-lead-time-uuid'
      },
      enable3DSForSignUp: {
        value: false
      },
      ...features
    }),
    user: Immutable.fromJS({
      orders: Immutable.List([]),
      deliveryTariffId: 'user-day-slot-lead-time-uuid',
      ...user
    }),
    auth: Immutable.fromJS({
      ...auth
    }),
    ...rest,
  })
}
