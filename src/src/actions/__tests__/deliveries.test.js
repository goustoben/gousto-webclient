import deliveries from 'actions/deliveries'

import actionTypes from 'actions/actionTypes'

describe('delivery actions', () => {

  const dispatch = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('trackDeliveryDayDropDownOpened', () => {
    test('Should dispatch DELIVERY_DAY_DROPDOWN_OPEN action when date dropdown is opened', () => {
      const date = '2019-01-01'
      const day_offset = 1
      const delivery_slot_id = 'a1b2c3d4'
      deliveries.trackDeliveryDayDropDownOpened(date, day_offset, delivery_slot_id)(dispatch)
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
      const day_offset = 2
      const delivery_slot_id = 'a2b2c3d4'
      deliveries.trackDeliveryDayDropDownClosed(date, day_offset, delivery_slot_id)(dispatch)
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
      const day_offset = 3
      const delivery_slot_id = 'a3b2c3d4'
      deliveries.trackDeliverySlotDropDownOpened(date, day_offset, delivery_slot_id)(dispatch)
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
      const day_offset = 4
      const delivery_slot_id = 'a4b2c3d4'
      deliveries.trackDeliveryDayEdited(date, day_offset, delivery_slot_id)(dispatch)
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
      const day_offset = 5
      const delivery_slot_id = 'a5b2c3d4'
      deliveries.trackDeliverySlotEdited(date, day_offset, delivery_slot_id)(dispatch)
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
      const day_offset = 5
      const delivery_slot_id = 'a5b2c3d4'
      deliveries.trackDeliveryPreferenceModalViewed(date, day_offset, delivery_slot_id)(dispatch)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.DELIVERY_PREFERENCE_MODAL_VIEWED,
        trackingData: {
          actionType: 'DeliveryPreferenceModal Viewed',
          date,
          day_offset,
          delivery_slot_id
        }
      })
    })
  })

  describe('trackDeliveryPreferenceModalClosed', () => {
    test('Should dispatch DELIVERY_PREFERENCE_MODAL_CLOSED action when ndd painted door modal is closed', () => {
      const date = '2019-01-05'
      const day_offset = 5
      const delivery_slot_id = 'a5b2c3d4'
      const delivery_preference = 'prefer ndd'
      deliveries.trackDeliveryPreferenceModalClosed(date, day_offset, delivery_slot_id, delivery_preference)(dispatch)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.DELIVERY_PREFERENCE_MODAL_CLOSED,
        trackingData: {
          actionType: 'DeliveryPreferenceModal Closed',
          date,
          day_offset,
          delivery_slot_id,
          delivery_preference,
        }
      })
    })
  })

  describe('trackDeliveryPreferenceSelected', () => {
    test('Should dispatch DELIVERY_PREFERENCE_SELECTED action when any radio button selected in ndd painted door modal', () => {
      const date = '2019-01-05'
      const day_offset = 5
      const delivery_slot_id = 'a5b2c3d4'
      const delivery_preference = 'prefer ndd'
      deliveries.trackDeliveryPreferenceSelected(date, day_offset, delivery_slot_id, delivery_preference)(dispatch)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.DELIVERY_PREFERENCE_SELECTED,
        trackingData: {
          actionType: 'DeliveryPreference Selected',
          date: '2019-01-05',
          day_offset: 5,
          delivery_slot_id,
          delivery_preference,
        }
      })
    })
  })
})
