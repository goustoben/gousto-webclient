import Immutable from 'immutable'
import * as reactRouterPush from 'react-router-redux'
import * as basketActions from 'actions/basket'
import { boxSummaryDeliveryDaysLoad, boxSummaryNext, basketDeliveryDaysReceive, trackingUnavailableRecipeList, boxSummaryDeliverySlotChosen } from 'actions/boxSummary'
import { menuLoadMenu } from 'actions/menu'
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
  portionSizeSelectedTracking: jest.fn(),
  basketDateChange: jest.fn(),
  basketSlotChange: jest.fn()
}))

jest.mock('actions/menu', () => ({
  menuLoadMenu: jest.fn(),
  menuLoadStock: jest.fn()
}))

describe('boxSummary actions', () => {
  beforeEach(() => {
    jest.spyOn(deliveriesUtils, 'transformDaySlotLeadTimesToMockSlots')
  })

  describe('basketDeliveryDaysReceive', () => {
    test('should return an action with the correct response', () => {
      const days = {
        alternateDeliveryDay: null,
        coredayId: '231',
        date: '2020-02-02',
        id: '12',
        isDefault: false,
        unavailableReason: ''}
      const result = basketDeliveryDaysReceive(days)
      expect(result).toEqual({
        type: 'BOXSUMMARY_DELIVERY_DAYS_RECEIVE',
        days,
      })
    })
  })
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
      auth: Immutable.Map(),
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
        expect(dispatchSpy).toHaveBeenCalledTimes(2)
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

      describe('when the basket is empty', () => {
        beforeEach(() => {
          getStateSpy = jest.fn().mockReturnValue({
            ...defaultProps,
          })
        })
        test('should dispatch boxSummaryVisibilityChanged', () => {
          boxSummaryNext()(dispatchSpy, getStateSpy)
          expect(dispatchSpy).toHaveBeenCalledTimes(2)
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
                123: 1
              })
            }),
          })
        })
        test('should dispatch boxSummaryVisibilityChange(false)', () => {
          boxSummaryNext()(dispatchSpy, getStateSpy)
          expect(dispatchSpy).toHaveBeenCalledTimes(1)
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

  describe('trackingUnavailableRecipeList', () => {
    test('should return tracking action', () => {
      const unavailableRecipeList = Immutable.fromJS({
        '12ss2': {},
        '234seds44': {}
      })
      const unavailableRecipeArray = ['12ss2', '234seds44']
      const result = trackingUnavailableRecipeList(unavailableRecipeList)
      expect(result).toEqual({
        type: 'TRACKING_UNAVAILABLE_RECIPE_LIST',
        trackingData: {
          actionType: 'unavailable_recipe_list',
          unavailableRecipeList: unavailableRecipeArray
        }
      })
    })
  })

  describe('boxSummaryDeliverySlotChosen', () => {
    const defaultProps = {
      auth: Immutable.Map(),
      basket: Immutable.Map({
        postcode: 'w3',
        slotId: '',
        recipes: Immutable.Map(),
      }),
      temp: Immutable.Map({}),
      user: Immutable.Map({
        orders: Immutable.List([]),
      }),
      features: Immutable.Map({}),
      error: Immutable.Map({}),
      boxSummaryDeliveryDays: Immutable.fromJS({
        '2021-05-20': {
          slots: [
            {
              id: 'dg015db8',
              coreSlotId: '001',
              whenCutoff: '2021-05-13',
            },
          ],
        },
        '2021-05-21': {
          slots: [
            {
              id: 'zk984as1',
              coreSlotId: '002',
              whenCutoff: '2021-05-14',
            },
          ],
        },
      }),
    }

    const getStateSpy = jest.fn()
    const dispatchSpy = jest.fn()

    beforeEach(() => {
      getStateSpy.mockReturnValue({
        ...defaultProps,
      })
    })

    describe('when displayMenuForFirstWeekOnly is false by default', () => {
      test('then it should load menu with default cutoff date', async () => {
        await boxSummaryDeliverySlotChosen({ date: '2021-05-21', slotId: 'zk984as1' })(
          dispatchSpy,
          getStateSpy
        )
        expect(menuLoadMenu).toHaveBeenCalledWith(null)
      })
    })

    describe('when displayMenuForFirstWeekOnly is true', () => {
      test('then it should instead use the first available date', async () => {
        await boxSummaryDeliverySlotChosen({
          date: '2021-05-21',
          slotId: 'zk984as1',
          displayMenuForFirstWeekOnly: true,
        })(dispatchSpy, getStateSpy)

        expect(menuLoadMenu).toHaveBeenCalledWith('2021-05-13')
      })
    })
  })
})
