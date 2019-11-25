import Immutable from 'immutable'
import * as reactRouterPush from 'react-router-redux'
import basketActions from 'actions/basket'
import boxSummary from 'actions/boxSummary'
import { fetchDeliveryDays } from 'apis/deliveries'
import * as deliveriesUtils from 'utils/deliveries'

jest.mock('apis/deliveries', () => ({
  fetchDeliveryDays: jest.fn().mockReturnValue({
    data: [{id: 1}]
  })
}))

jest.mock('react-router-redux', () => ({
  push: jest.fn()
}))

jest.mock('actions/basket', () => ({
  basketAddressChange: jest.fn(),
  basketPostcodeChange: jest.fn(),
  portionSizeSelectedTracking: jest.fn()
}))

deliveriesUtils.transformDaySlotLeadTimesToMockSlots = jest.fn()

describe('boxSummary actions', () => {
  describe('boxSummaryDeliveryDaysLoad', () => {

    const from = '2017-12-05'
    const to = '2017-12-30'
    const getStateArgs = {
      auth: Immutable.fromJS({ accessToken: 'access token' }),
      basket: Immutable.fromJS({}),
    }

    const dispatchSpy = jest.fn()

    test('should fetch delivery days with menu cutoff date', async () => {
      const menuCutoffUntil = '2017-12-30T00:00:00.000Z'
      const expectedRequestData = {
        'direction': 'asc',
        'filters[cutoff_datetime_from]': '2017-12-05T00:00:00.000Z',
        'filters[cutoff_datetime_until]': menuCutoffUntil,
        'sort': 'date',
        'ndd': 'false',
        'delivery_tariff_id': deliveriesUtils.deliveryTariffTypes.NON_NDD,
      }

      const getStateSpy = jest.fn().mockReturnValue({
        ...getStateArgs,
        menuCutoffUntil,
        features: Immutable.fromJS({
          ndd: {
            value: deliveriesUtils.deliveryTariffTypes.NON_NDD,
            experiment: false,
          }
        }
        ),
      })

      await boxSummary.boxSummaryDeliveryDaysLoad(from)(dispatchSpy, getStateSpy)

      expect(deliveriesUtils.transformDaySlotLeadTimesToMockSlots).not.toHaveBeenCalled()
      expect(fetchDeliveryDays).toHaveBeenCalledWith('access token', expectedRequestData)
    })

    test('should fetch delivery days with requested cut off dates', async () => {
      const expectedRequestData = {
        'direction': 'asc',
        'filters[cutoff_datetime_from]': '2017-12-05T00:00:00.000Z',
        'filters[cutoff_datetime_until]': '2017-12-30T23:59:59.999Z',
        'sort': 'date',
        'ndd': 'false',
        'delivery_tariff_id': deliveriesUtils.deliveryTariffTypes.NON_NDD,
      }

      const getStateSpy = jest.fn().mockReturnValue({
        ...getStateArgs,
        features: Immutable.fromJS({
          ndd: {
            value: deliveriesUtils.deliveryTariffTypes.NON_NDD,
            experiment: false,
          }
        }
        ),
      })

      await boxSummary.boxSummaryDeliveryDaysLoad(from, to)(dispatchSpy, getStateSpy)

      expect(fetchDeliveryDays).toHaveBeenCalledWith('access token', expectedRequestData)
      expect(deliveriesUtils.transformDaySlotLeadTimesToMockSlots).not.toHaveBeenCalled()
    })

    test('should fetch next day delivery days with requested cut off dates when feature flag is enabled', async () => {
      const expectedRequestData = {
        'direction': 'asc',
        'filters[cutoff_datetime_from]': '2017-12-05T00:00:00.000Z',
        'filters[cutoff_datetime_until]': '2017-12-30T23:59:59.999Z',
        'sort': 'date',
        'ndd': 'true',
        'delivery_tariff_id': deliveriesUtils.deliveryTariffTypes.FREE_NDD,
      }

      const getStateSpy = jest.fn().mockReturnValue({
        ...getStateArgs,
        features: Immutable.fromJS({
          ndd: {
            value: deliveriesUtils.deliveryTariffTypes.FREE_NDD,
            experiment: false,
          }
        }
        ),
      })

      await boxSummary.boxSummaryDeliveryDaysLoad(from, to)(dispatchSpy, getStateSpy)

      expect(fetchDeliveryDays).toHaveBeenCalledWith('access token', expectedRequestData)
      expect(deliveriesUtils.transformDaySlotLeadTimesToMockSlots).toHaveBeenCalled()
    })
  })

  describe('boxSummaryNext', () => {
    let getStateSpy
    let dispatchSpy
    let pushSpy
    let basketAddressChange
    let basketPostcodeChange
    const defaultProps = {
      basket: Immutable.Map({
        postcode: 'w3',
        slotId: '',
        recipes: Immutable.Map()
      }),
      temp: Immutable.Map({
      }),
      user: Immutable.Map({
        orders: Immutable.List([]),
      }),
      features: Immutable.Map({}),
      error: Immutable.Map({}),
      boxSummaryDeliveryDays: Immutable.List([])
    }
    beforeEach(() => {
      dispatchSpy = jest.fn()
      getStateSpy = jest.fn()
      basketPostcodeChange = jest.spyOn(basketActions, 'basketPostcodeChange')
      basketAddressChange = jest.spyOn(basketActions, 'basketAddressChange')
      pushSpy = jest.spyOn(reactRouterPush, 'push')
      getStateSpy = jest.fn().mockReturnValue({
        ...defaultProps,
        temp: Immutable.Map({
          orderId: '12345',
        }),
      })
    })
    describe('with an order id in the temp state and a postcode in the basket state', () => {
      afterEach(() => {
         jest.clearAllMocks()
      })
      test('should redirect the user to /order/:orderId', () => {
        boxSummary.boxSummaryNext()(dispatchSpy, getStateSpy)
        expect(pushSpy).toHaveBeenCalledTimes(1)
        expect(pushSpy.mock.calls[0][0]).toEqual('/menu/12345')
        expect(dispatchSpy).toHaveBeenCalledTimes(3)
      })
    })
    describe('with no order id in the temp state but a postcode in the basket state', () => {
      beforeEach(() => {
        getStateSpy = jest.fn().mockReturnValue({
          ...defaultProps,
        })
      })
      afterEach(() => {
         jest.clearAllMocks()
      })

      describe('when hide box summary feature flag is present', () => {
        describe('and the basket is empty', () => {
          beforeEach(() => {
            getStateSpy = jest.fn().mockReturnValue({
              ...defaultProps,
              features: Immutable.fromJS({
                hideBoxSummary: {
                  value: true
                }
              })
            })
          })
          test('should dispatch boxSummaryVisibilityChange(false)', () => {
            boxSummary.boxSummaryNext()(dispatchSpy, getStateSpy)
            expect(dispatchSpy).toHaveBeenCalledTimes(3)
          })
        })

        describe('and the basket contains recipes', () => {
          beforeEach(() => {
            getStateSpy = jest.fn().mockReturnValue({
              ...defaultProps,
              basket: Immutable.Map({
                postcode: 'w3',
                slotId: '',
                recipes: Immutable.Map({
                  '123': 1
                })
              }),
              features: Immutable.fromJS({
                hideBoxSummary: {
                  value: true
                }
              })
            })
          })
          test('should dispatch boxSummaryVisibilityChange(false)', () => {
            boxSummary.boxSummaryNext()(dispatchSpy, getStateSpy)
            expect(dispatchSpy).toHaveBeenCalledTimes(2)
          })
        })
      })

      test('should dispatch a boxSummaryDeliverySlotChosen action', () => {
        boxSummary.boxSummaryNext()(dispatchSpy, getStateSpy)
        expect(dispatchSpy).toHaveBeenCalledTimes(2)
      })
    })

    describe('with no basket postcode, and a postcode in the temp state', () => {
      beforeEach(() => {
        getStateSpy = jest.fn().mockReturnValue({
          ...defaultProps,
          basket: Immutable.Map({
            postcode: '',
          }),
          temp: Immutable.Map({
            postcode: 'w3',
          }),
        })
      })
      afterEach(() => {
         jest.clearAllMocks()
      })
      test('should dispatch a basketPostcodeChange action', () => {
        boxSummary.boxSummaryNext()(dispatchSpy, getStateSpy)
        expect(basketPostcodeChange).toHaveBeenCalledTimes(1)
        expect(basketPostcodeChange.mock.calls[0][0]).toEqual('w3')
      })
    })
    describe('with a basket postcode, and a postcode in the temp state, and a boxSummaryDeliveryDaysErr', () => {
      beforeEach(() => {
        getStateSpy = jest.fn().mockReturnValue({
          ...defaultProps,
          basket: Immutable.Map({
            postcode: 'asdfg',
          }),
          temp: Immutable.Map({
            postcode: 'w3',
          }),
          error: Immutable.Map({
            BOXSUMMARY_DELIVERY_DAYS_RECEIVE: 'error',
          }),
        })
      })
      afterEach(() => {
        jest.clearAllMocks()
     })
      test('should dispatch a basketPostcodeChange action', () => {
        boxSummary.boxSummaryNext()(dispatchSpy, getStateSpy)
        expect(basketPostcodeChange).toHaveBeenCalledTimes(1)
        expect(basketPostcodeChange.mock.calls[0][0]).toEqual('w3')
      })
    })
    describe('with no basket postcode, and a chosen address in the basket state', () => {
      beforeEach(() => {
        getStateSpy = jest.fn().mockReturnValue({
          ...defaultProps,
          basket: Immutable.Map({
            postcode: '',
            chosenAddress: Immutable.Map({
              postcode: 'w4',
            }),
          }),
          temp: Immutable.Map({
            postcode: 'w3',
          }),
        })
      })
      afterEach(() => {
        jest.clearAllMocks()
     })
      test('should dispatch basketPostcodeChange and basketAddressChange actions', () => {
        boxSummary.boxSummaryNext()(dispatchSpy, getStateSpy)
        expect(basketPostcodeChange).toHaveBeenCalledTimes(1)
        expect(basketPostcodeChange.mock.calls[0][0]).toEqual('w4')
        expect(basketAddressChange).toHaveBeenCalledTimes(1)
        expect(Immutable.is(basketAddressChange.mock.calls[0][0], Immutable.Map({ postcode: 'w4' }))).toEqual(true)
      })
    })
  })
})
