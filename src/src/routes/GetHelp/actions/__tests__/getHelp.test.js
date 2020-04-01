import {
  trackDeliveryOther,
  trackDeliveryStatus,
  trackNextBoxTrackingClick
} from '../getHelp'

describe('given trackDeliveryOther is called', () => {
  let trackingData

  beforeEach(() => {
    trackingData = trackDeliveryOther().trackingData
  })

  test('the trackingData is being set correctly', () => {
    expect(trackingData).toEqual({
      actionType: 'GetHelpTrackDeliveryOther Clicked',
    })
  })
})

describe('given trackDeliveryStatus is called', () => {
  let trackingData

  beforeEach(() => {
    trackingData = trackDeliveryStatus().trackingData
  })

  test('the trackingData is being set correctly', () => {
    expect(trackingData).toEqual({
      actionType: 'GetHelpTrackDeliveryStatus Clicked',
    })
  })
})

describe('given trackNextBoxTrackingClick is called', () => {
  let trackingData

  beforeEach(() => {
    trackingData = trackNextBoxTrackingClick('o123').trackingData
  })

  test('the trackingData is being set correctly', () => {
    expect(trackingData).toEqual({
      actionType: 'GetHelpTrackMyBox Clicked',
      orderId: 'o123',
    })
  })
})
