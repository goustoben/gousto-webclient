import deliveries from 'actions/deliveries'

import actionTypes from 'actions/actionTypes'

describe('delivery actions', () => {

  const dispatch = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('trackDeliveryDayDropDownOpened', () => {
    test('Should dispatch DELIVERY_DAY_DROPDOWN_OPEN action when date dropdown is opened', () => {
      deliveries.trackDeliveryDayDropDownOpened()(dispatch)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.DELIVERY_DAY_DROPDOWN_OPEN,
        trackingData: {
          actionType: 'DeliveryDayDropDown Opened'
        }
      })
    })
  })

  describe('trackDeliveryDayDropDownClosed', () => {
    test('Should dispatch DELIVERY_DAY_DROPDOWN_CLOSED action when date dropdown is closed', () => {
      deliveries.trackDeliveryDayDropDownClosed()(dispatch)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.DELIVERY_DAY_DROPDOWN_CLOSED,
        trackingData: {
          actionType: 'DeliveryDayDropDown Closed'
        }
      })
    })
  })

  describe('trackDeliverySlotDropDownOpened', () => {
    test('Should dispatch DELIVERY_SLOT_DROPDOWN_OPEN action when date dropdown is closed', () => {
      deliveries.trackDeliverySlotDropDownOpened()(dispatch)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.DELIVERY_SLOT_DROPDOWN_OPEN,
        trackingData: {
          actionType: 'DeliverySlotDropDown Opened'
        }
      })
    })
  })

  describe('trackDeliveryDayEdited', () => {
    test('Should dispatch DELIVERY_DAY_SELECTION_EDITED action when date dropdown is closed', () => {
      deliveries.trackDeliveryDayEdited()(dispatch)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.DELIVERY_DAY_SELECTION_EDITED,
        trackingData: {
          actionType: 'DeliveryDay Edited'
        }
      })
    })
  })

  describe('trackDeliverySlotEdited', () => {
    test('Should dispatch DELIVERY_SLOT_SELECTION_EDITED action when date dropdown is closed', () => {
      deliveries.trackDeliverySlotEdited()(dispatch)
      expect(dispatch).toHaveBeenCalledWith({
        type: actionTypes.DELIVERY_SLOT_SELECTION_EDITED,
        trackingData: {
          actionType: 'DeliverySlot Edited'
        }
      })
    })
  })
})
