import Immutable from 'immutable'
import * as reactRouterPush from 'react-router-redux'
import basketActions from 'actions/basket'
import { boxSummaryDeliveryDaysLoad, boxSummaryNext } from 'actions/boxSummary'
import { fetchDeliveryDays } from 'apis/deliveries'
import * as deliveriesUtils from 'utils/deliveries'

jest.mock('apis/deliveries', () => ({
  fetchDeliveryDays: jest.fn().mockReturnValue({
    data: [{ id: 1 }]
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
    describe('given postcode is provided in state', () => {
      const dispatchSpy = jest.fn()
      const getStateSpy = jest.fn()

      const accessToken = 'access token'
      const postcode = 'RM14 1DL'
      const menuCutoffUntil = '2017-12-30T00:00:00.000Z'
      let state

      beforeEach(() => {
        state = {
          auth: Immutable.fromJS({ accessToken }),
          basket: Immutable.fromJS({ postcode }),
          menuCutoffUntil
        }
      })

      describe('and NDD is not enabled', () => {
        const deliveryTariffId = deliveriesUtils.deliveryTariffTypes.NON_NDD

        beforeEach(() => {
          state.features = Immutable.fromJS({
            ndd: {
              value: deliveriesUtils.deliveryTariffTypes.NON_NDD,
              experiment: false,
            }
          })

          getStateSpy.mockReturnValue(state)
        })

        describe('when `boxSummaryDeliveryDaysLoad` is called with only `cutoffDatetimeFrom`', () => {
          const from = '2017-12-05'
          const menuCutoffFrom = '2017-12-05T00:00:00.000Z'

          beforeEach(async () => {
            await boxSummaryDeliveryDaysLoad(from)(dispatchSpy, getStateSpy)
          })

          test('the `fetchDeliveryDays` was called with correct parameters', () => {
            expect(fetchDeliveryDays).toHaveBeenCalledWith('access token', menuCutoffFrom, menuCutoffUntil, false, deliveryTariffId, postcode)
          })

          test('then `transformDaySlotLeadTimesToMockSlots` should not have been called', () => {
            expect(deliveriesUtils.transformDaySlotLeadTimesToMockSlots).not.toHaveBeenCalled()
          })
        })

        describe('when `boxSummaryDeliveryDaysLoad` is called with `cutoffDatetimeFrom` and `cutoffDatetimeUntil`', () => {
          const from = '2017-12-05'
          const until = '2018-12-05'
          const menuCutoffFrom = '2017-12-05T00:00:00.000Z'
          const providedenuCutoffUntil = '2018-12-05T23:59:59.999Z'

          beforeEach(async () => {
            await boxSummaryDeliveryDaysLoad(from, until)(dispatchSpy, getStateSpy)
          })

          test('the `fetchDeliveryDays` was called with correct parameters', () => {
            expect(fetchDeliveryDays).toHaveBeenCalledWith('access token', menuCutoffFrom, providedenuCutoffUntil, false, deliveryTariffId, postcode)
          })

          test('then `transformDaySlotLeadTimesToMockSlots` should not have been called', () => {
            expect(deliveriesUtils.transformDaySlotLeadTimesToMockSlots).not.toHaveBeenCalled()
          })
        })
      })

      describe('and NDD is enabled', () => {
        const deliveryTariffId = deliveriesUtils.deliveryTariffTypes.FREE_NDD

        beforeEach(() => {
          state.features = Immutable.fromJS({
            ndd: {
              value: deliveriesUtils.deliveryTariffTypes.FREE_NDD,
              experiment: false,
            }
          })

          getStateSpy.mockReturnValue(state)
        })

        describe('when `boxSummaryDeliveryDaysLoad` is called with only `cutoffDatetimeFrom`', () => {
          const from = '2017-12-05'
          const menuCutoffFrom = '2017-12-05T00:00:00.000Z'

          beforeEach(async () => {
            await boxSummaryDeliveryDaysLoad(from)(dispatchSpy, getStateSpy)
          })

          test('the `fetchDeliveryDays` was called with correct parameters', () => {
            expect(fetchDeliveryDays).toHaveBeenCalledWith('access token', menuCutoffFrom, menuCutoffUntil, true, deliveryTariffId, postcode)
          })

          test('then `transformDaySlotLeadTimesToMockSlots` should have been called', () => {
            expect(deliveriesUtils.transformDaySlotLeadTimesToMockSlots).toHaveBeenCalled()
          })
        })

        describe('when `boxSummaryDeliveryDaysLoad` is called with `cutoffDatetimeFrom` and `cutoffDatetimeUntil`', () => {
          const from = '2017-12-05'
          const until = '2018-12-05'
          const menuCutoffFrom = '2017-12-05T00:00:00.000Z'
          const providedenuCutoffUntil = '2018-12-05T23:59:59.999Z'

          beforeEach(async () => {
            await boxSummaryDeliveryDaysLoad(from, until)(dispatchSpy, getStateSpy)
          })

          test('the `fetchDeliveryDays` was called with correct parameters', () => {
            expect(fetchDeliveryDays).toHaveBeenCalledWith('access token', menuCutoffFrom, providedenuCutoffUntil, true, deliveryTariffId, postcode)
          })

          test('then `transformDaySlotLeadTimesToMockSlots` should have been called', () => {
            expect(deliveriesUtils.transformDaySlotLeadTimesToMockSlots).toHaveBeenCalled()
          })
        })
      })
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
        boxSummaryNext()(dispatchSpy, getStateSpy)
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
            boxSummaryNext()(dispatchSpy, getStateSpy)
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
            boxSummaryNext()(dispatchSpy, getStateSpy)
            expect(dispatchSpy).toHaveBeenCalledTimes(2)
          })
        })
      })

      test('should dispatch a boxSummaryDeliverySlotChosen action', () => {
        boxSummaryNext()(dispatchSpy, getStateSpy)
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
        boxSummaryNext()(dispatchSpy, getStateSpy)
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
        boxSummaryNext()(dispatchSpy, getStateSpy)
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
        boxSummaryNext()(dispatchSpy, getStateSpy)
        expect(basketPostcodeChange).toHaveBeenCalledTimes(1)
        expect(basketPostcodeChange.mock.calls[0][0]).toEqual('w4')
        expect(basketAddressChange).toHaveBeenCalledTimes(1)
        expect(Immutable.is(basketAddressChange.mock.calls[0][0], Immutable.Map({ postcode: 'w4' }))).toEqual(true)
      })
    })
  })
})
