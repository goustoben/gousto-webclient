import sinon from 'sinon'

import Immutable from 'immutable'
import util, {
  DEFAULT_MESSAGE_ID,
} from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderDelivery/EditDelivery/util'

const orderDeliveryDays = Immutable.fromJS({
  aaa: {
    coreDayId: '45',
    date: '2017-02-05',
    slots: [
      {
        id: 'aaa1',
        coreSlotId: 's1',
        whenCutoff: '2017-02-02',
        deliveryStartTime: '08:00:00',
        deliveryEndTime: '18:00:00',
        deliveryPrice: '0.00',
        isDefault: true,
      },
      {
        id: 'aaa2',
        coreSlotId: 's2',
        whenCutoff: '2017-02-02',
        deliveryStartTime: '08:00:00',
        deliveryEndTime: '12:00:00',
        deliveryPrice: '1.99',
        isDefault: false,
      },
    ],
  },
  bbb: {
    coreDayId: '46',
    date: '2017-02-06',
    slots: [
      {
        id: 'aaa3',
        coreSlotId: 's3',
        whenCutoff: '2017-02-03',
        deliveryStartTime: '08:00:00',
        deliveryEndTime: '18:00:00',
        deliveryPrice: '0.00',
        isDefault: true,
      },
      {
        id: 'aaa4',
        coreSlotId: 's4',
        whenCutoff: '2017-02-03',
        deliveryStartTime: '08:00:00',
        deliveryEndTime: '12:00:00',
        deliveryPrice: '1.99',
        isDefault: false,
      },
    ],
    alternateDeliveryDay: null,
  },
  ccc: {
    coreDayId: '47',
    date: '2017-02-07',
    slots: [
      {
        id: 'aaa5',
        coreSlotId: 's5',
        whenCutoff: '2017-02-04',
        deliveryStartTime: '08:00:00',
        deliveryEndTime: '18:00:00',
        deliveryPrice: '0.00',
        isDefault: true,
      },
      {
        id: 'aaa6',
        coreSlotId: 's6',
        whenCutoff: '2017-02-04',
        deliveryStartTime: '08:00:00',
        deliveryEndTime: '12:00:00',
        deliveryPrice: '1.99',
        isDefault: false,
      },
    ],
    alternateDeliveryDay: null,
  },
})
const orderRecipes = Immutable.fromJS([
  { recipeId: 'x' },
  { recipeId: 'y' },
  { recipeId: 'y' },
  { recipeId: 'x' },
])
const recipesStock = Immutable.List([
  { recipeId: 'x', takeUntil: '2017-02-03', stockAmount: 8, committed: true },
  { recipeId: 'x', takeUntil: '2017-02-04', stockAmount: -3, committed: false },
  { recipeId: 'y', takeUntil: '2017-02-02', stockAmount: 5, committed: true },
  { recipeId: 'y', takeUntil: '2017-02-03', stockAmount: 10, committed: false },
  { recipeId: 'y', takeUntil: '2017-02-04', stockAmount: -5, committed: false },
])
const portionsPerRecipe = 4
const orderCoreDeliveryDayId = '47'
const orderDeliverySlotId = 'slot3'
const orders = Immutable.fromJS({
  7: { coreDeliveryDayId: '44' },
  8: { coreDeliveryDayId: '46' },
})

describe('util', () => {
  test('should form the delivery day options and the slot options', () => {
    const {
      deliveryDaysOptions,
      slotsOptions,
    } = util.getDeliveryDaysAndSlotsOptions(
      orderDeliveryDays,
      orderRecipes,
      recipesStock,
      portionsPerRecipe,
      orderCoreDeliveryDayId,
      orderDeliverySlotId,
      orders,
    )

    expect(deliveryDaysOptions).toEqual([
      {
        value: DEFAULT_MESSAGE_ID,
        label: 'Please select a delivery date',
        disabled: false,
        icon: '',
      },
      { value: '46', label: '2017-02-06', disabled: true, icon: 'full-box' },
      { value: '47', label: '2017-02-07', disabled: false, icon: '' },
    ])
    expect(slotsOptions).toEqual({
      [DEFAULT_MESSAGE_ID]: [
        {
          value: DEFAULT_MESSAGE_ID,
          coreSlotId: null,
          label: 'Please select a delivery slot',
          subLabel: '',
          isDefaultSlot: false,
        },
      ],
      46: [
        {
          value: DEFAULT_MESSAGE_ID,
          coreSlotId: null,
          label: 'Please select a delivery slot',
          subLabel: '',
          isDefaultSlot: false,
        },
        {
          value: 'aaa3',
          coreSlotId: 's3',
          label: '8am - 6pm',
          subLabel: 'Free',
          isDefaultSlot: true,
        },
        {
          value: 'aaa4',
          coreSlotId: 's4',
          label: '8am - 12pm',
          subLabel: '£1.99',
          isDefaultSlot: false,
        },
      ],
      47: [
        {
          value: DEFAULT_MESSAGE_ID,
          coreSlotId: null,
          label: 'Please select a delivery slot',
          subLabel: '',
          isDefaultSlot: false,
        },
        {
          value: 'aaa5',
          coreSlotId: 's5',
          label: '8am - 6pm',
          subLabel: 'Free',
          isDefaultSlot: true,
        },
        {
          value: 'aaa6',
          coreSlotId: 's6',
          label: '8am - 12pm',
          subLabel: '£1.99',
          isDefaultSlot: false,
        },
      ],
    })
  })
})
