import Immutable from 'immutable'
import {
  trackDeliveryDayDropDownOpened,
  trackDeliveryDayDropDownClosed,
  trackDeliverySlotDropDownOpened,
  trackDeliveryDayEdited,
  trackDeliverySlotEdited,
  trackDeliveryPreferenceModalViewed,
  trackDeliveryPreferenceModalClosed,
  trackDeliveryPreferenceSelected,
  preselectFreeDeliverySlot,
  setTempDeliveryOptions,
} from 'actions/deliveries'
import { actionTypes } from 'actions/actionTypes'
import { basketSlotChange } from 'actions/basket'
import { getSlot } from 'utils/deliveries'
import { getTempDeliveryOptions, getDeliveryDaysAndSlots } from 'utils/deliverySlotHelper'

jest.mock('utils/deliveries', () => ({
  getSlot: jest.fn(),
}))

jest.mock('actions/basket', () => ({
  basketSlotChange: jest.fn()
}))

jest.mock('utils/deliverySlotHelper', () => ({
  getTempDeliveryOptions: jest.fn(),
  getDeliveryDaysAndSlots: jest.fn()
}))

jest.mock('selectors/features', () => ({
  getLogoutUserDisabledSlots: jest.fn().mockReturnValue(''),
}))

describe('delivery actions', () => {
  const dispatch = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('trackDeliveryDayDropDownOpened', () => {
    test('Should dispatch DELIVERY_DAY_DROPDOWN_OPEN action when date dropdown is opened', () => {
      const date = '2019-01-01'
      const dayOffset = 1
      const deliverySlotId = 'a1b2c3d4'
      trackDeliveryDayDropDownOpened(date, dayOffset, deliverySlotId)(dispatch)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.DELIVERY_DAY_DROPDOWN_OPEN,
        trackingData: {
          actionType: 'DeliveryDayDropDown Opened',
          date: '2019-01-01',
          day_offset: 1,
          delivery_slot_id: 'a1b2c3d4'
        }
      })
    })
  })

  describe('trackDeliveryDayDropDownClosed', () => {
    test('Should dispatch DELIVERY_DAY_DROPDOWN_CLOSED action when date dropdown is closed', () => {
      const date = '2019-01-02'
      const dayOffset = 2
      const deliverySlotId = 'a2b2c3d4'
      trackDeliveryDayDropDownClosed(date, dayOffset, deliverySlotId)(dispatch)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.DELIVERY_DAY_DROPDOWN_CLOSED,
        trackingData: {
          actionType: 'DeliveryDayDropDown Closed',
          date: '2019-01-02',
          day_offset: 2,
          delivery_slot_id: 'a2b2c3d4'
        }
      })
    })
  })

  describe('trackDeliverySlotDropDownOpened', () => {
    test('Should dispatch DELIVERY_SLOT_DROPDOWN_OPEN action when date dropdown is closed', () => {
      const date = '2019-01-03'
      const dayOffset = 3
      const deliverySlotId = 'a3b2c3d4'
      trackDeliverySlotDropDownOpened(date, dayOffset, deliverySlotId)(dispatch)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.DELIVERY_SLOT_DROPDOWN_OPEN,
        trackingData: {
          actionType: 'DeliverySlotDropDown Opened',
          date: '2019-01-03',
          day_offset: 3,
          delivery_slot_id: 'a3b2c3d4'
        }
      })
    })
  })

  describe('trackDeliveryDayEdited', () => {
    test('Should dispatch DELIVERY_DAY_SELECTION_EDITED action when date dropdown is closed', () => {
      const date = '2019-01-04'
      const dayOffset = 4
      const deliverySlotId = 'a4b2c3d4'
      trackDeliveryDayEdited(date, dayOffset, deliverySlotId)(dispatch)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.DELIVERY_DAY_SELECTION_EDITED,
        trackingData: {
          actionType: 'DeliveryDay Edited',
          date: '2019-01-04',
          day_offset: 4,
          delivery_slot_id: 'a4b2c3d4'
        }
      })
    })
  })

  describe('trackDeliverySlotEdited', () => {
    test('Should dispatch DELIVERY_SLOT_SELECTION_EDITED action when date dropdown is closed', () => {
      const date = '2019-01-05'
      const dayOffset = 5
      const deliverySlotId = 'a5b2c3d4'
      trackDeliverySlotEdited(date, dayOffset, deliverySlotId)(dispatch)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.DELIVERY_SLOT_SELECTION_EDITED,
        trackingData: {
          actionType: 'DeliverySlot Edited',
          date: '2019-01-05',
          day_offset: 5,
          delivery_slot_id: 'a5b2c3d4'
        }
      })
    })
  })

  describe('trackDeliveryPreferenceModalViewed', () => {
    test('Should dispatch DELIVERY_PREFERENCE_MODAL_VIEWED action when ndd painted door modal is opened', () => {
      const date = '2019-01-05'
      const dayOffset = 5
      const deliverySlotId = 'a5b2c3d4'
      trackDeliveryPreferenceModalViewed(date, dayOffset, deliverySlotId)(dispatch)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.DELIVERY_PREFERENCE_MODAL_VIEWED,
        trackingData: {
          actionType: 'DeliveryPreferenceModal Viewed',
          date,
          day_offset: dayOffset,
          delivery_slot_id: deliverySlotId
        }
      })
    })
  })

  describe('trackDeliveryPreferenceModalClosed', () => {
    test('Should dispatch DELIVERY_PREFERENCE_MODAL_CLOSED action when ndd painted door modal is closed', () => {
      const date = '2019-01-05'
      const dayOffset = 5
      const deliverySlotId = 'a5b2c3d4'
      const deliveryPreference = 'prefer ndd'
      trackDeliveryPreferenceModalClosed(date, dayOffset, deliverySlotId, deliveryPreference)(dispatch)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.DELIVERY_PREFERENCE_MODAL_CLOSED,
        trackingData: {
          actionType: 'DeliveryPreferenceModal Closed',
          date,
          day_offset: dayOffset,
          delivery_slot_id: deliverySlotId,
          delivery_preference: deliveryPreference,
        }
      })
    })
  })

  describe('trackDeliveryPreferenceSelected', () => {
    test('Should dispatch DELIVERY_PREFERENCE_SELECTED action when any radio button selected in ndd painted door modal', () => {
      const date = '2019-01-05'
      const dayOffset = 5
      const deliverySlotId = 'a5b2c3d4'
      const deliveryPreference = 'prefer ndd'
      trackDeliveryPreferenceSelected(date, dayOffset, deliverySlotId, deliveryPreference)(dispatch)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.DELIVERY_PREFERENCE_SELECTED,
        trackingData: {
          actionType: 'DeliveryPreference Selected',
          date: '2019-01-05',
          day_offset: 5,
          delivery_slot_id: deliverySlotId,
          delivery_preference: deliveryPreference,
        }
      })
    })
  })

  describe('preselectFreeDeliverySlot', () => {
    const getState = () => ({
      basket: Immutable.fromJS({
        date: '2019-10-16',
        slotId: '',
      }),
      boxSummaryDeliveryDays: Immutable.Map({})
    })
    describe('when slotId empty and slotTime has value', () => {
      test('should dispatch basketSlotChange', () => {
        getSlot.mockReturnValueOnce(Immutable.Map({ id: 'slotId' }))
        preselectFreeDeliverySlot(dispatch, getState)
        expect(basketSlotChange).toHaveBeenCalledWith('slotId')
      })
    })
  })

  describe('setTempDeliveryOptions', () => {
    let getState
    beforeEach(() => {
      getTempDeliveryOptions.mockReturnValue({
        tempDate: '2019-03-03',
        tempSlotId: '',
        deliveryDays: Immutable.fromJS([
          {
            date: '2019-03-03',
            id: 'djhdhds',
            slots: [
              {
                deliveryStartTime: '08:00:00',
                deliveryEndTime: '19:00:00',
                id: '123sddrdfst456',
                disabledSlotId: '2019-03-03_08-19'
              },
              {
                deliveryStartTime: '18:00:00',
                deliveryEndTime: '22:00:00',
                id: '987sddrdfst456',
                disabledSlotId: '2019-03-03_18-22'
              }
            ]
          }
        ])
      })
    })
    test('should call setTempSlotId with the first slot in deliveryDays when first slot is not disabled', () => {
      getState = () => ({
        auth: Immutable.Map({
          isAuthenticated: false,
        }),
        user: Immutable.fromJS({
          subscription: {
            state: ''
          },
          orders: []
        }),
        boxSummaryDeliveryDays: Immutable.fromJS({
          '2019-03-03': {
            date: '2019-03-03',
            isDefault: false,
            daySlots: [
              {
                activeForSubscribersOneOff: true,
                activeForNonSubscribersOneOff: true,
                slotId: '123sddrdfst456',
                activeForSignups: true,
              },
              {
                activeForSubscribersOneOff: true,
                activeForNonSubscribersOneOff: true,
                slotId: '987sddrdfst456',
                activeForSignups: true,
              }
            ],
            slots: [
              {
                id: '123sddrdfst456',
                whenCutoff: '2019-12-31T11:59:59+01:00',
                disabledSlotId: '2019-03-03_08-19',
                deliveryEndTime: '19:00:00',
                deliveryStartTime: '08:00:00',
              },
              {
                id: '987sddrdfst456',
                whenCutoff: '2019-12-31T11:59:59+01:00',
                disabledSlotId: '2019-03-03_18-22',
                deliveryEndTime: '19:00:00',
                deliveryStartTime: '08:00:00',
              },
            ],
          },
        })
      })
      getDeliveryDaysAndSlots.mockReturnValueOnce({
        slots: {
          '2019-03-03': [
            {
              coreSlotId: '1',
              disabled: false,
              label: '8am - 7pm ',
              subLabel: 'Free',
              value: '123sddrdfst456',
            },
            {
              coreSlotId: '2',
              disabled: false,
              label: '6pm - 10pm ',
              subLabel: 'Free',
              value: '987sddrdfst456',
            },
          ]
        }
      })

      setTempDeliveryOptions('2019-03-03', '')(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({ key: 'slotId', type: 'TEMP', value: '123sddrdfst456' })
    })

    test('should call setTempSlotId with the second slot in deliveryDays when first slot is disabled', () => {
      getState = () => ({
        auth: Immutable.Map({
          isAuthenticated: false,
        }),
        user: Immutable.fromJS({
          subscription: {
            state: ''
          },
          orders: []
        }),
        boxSummaryDeliveryDays: Immutable.fromJS({})
      })
      getDeliveryDaysAndSlots.mockReturnValue({
        slots: {
          '2019-03-03': [
            {
              coreSlotId: '1',
              disabled: true,
              label: '8am - 7pm ',
              subLabel: 'Free',
              value: '123sddrdfst456',
            },
            {
              coreSlotId: '2',
              disabled: false,
              label: '6pm - 10pm ',
              subLabel: 'Free',
              value: '987sddrdfst456',
            },
          ]
        }
      })

      setTempDeliveryOptions('2019-03-03', '')(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({ key: 'slotId', type: 'TEMP', value: '987sddrdfst456' })
    })

    test('should call setTempSlotId passing undefined when all slots are disabled', () => {
      getState = () => ({
        auth: Immutable.Map({
          isAuthenticated: false,
        }),
        user: Immutable.fromJS({
          subscription: {
            state: ''
          },
          orders: []
        }),
        boxSummaryDeliveryDays: Immutable.fromJS({})
      })
      getDeliveryDaysAndSlots.mockReturnValue({
        slots: {
          '2019-03-03': [
            {
              coreSlotId: '1',
              disabled: true,
              label: '8am - 7pm ',
              subLabel: 'Free',
              value: '123sddrdfst456',
            },
            {
              coreSlotId: '2',
              disabled: true,
              label: '6pm - 10pm ',
              subLabel: 'Free',
              value: '987sddrdfst456',
            },
          ]
        }
      })
      setTempDeliveryOptions('2019-03-03', '')(dispatch, getState)
      expect(dispatch).toHaveBeenCalledWith({ key: 'slotId', type: 'TEMP', value: undefined })
    })
  })
})
