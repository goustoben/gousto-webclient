import sinon from 'sinon'

import {
  cutoffDateTimeNow,
  getAvailableDeliveryDays,
  getCutoffDateTime,
  getCutoffs,
  getLandingDay,
  getSlot,
  getSlotTimes,
  transformDaySlotLeadTimesToMockSlots
} from 'utils/deliveries'
import GoustoException from 'utils/GoustoException'
import Immutable from 'immutable' /* eslint-disable new-cap */
import { getDisabledSlots } from 'selectors/features'
import { DeliveryTariffTypes, getDeliveryTariffId, getNDDFeatureFlagVal } from '../deliveries'

jest.mock('selectors/features', () => ({
  getDisabledSlots: jest.fn()
}))

describe('utils/deliveries', () => {
  describe('getSlot', () => {
    test('should return false if deliveryDays is not an Immutable object', () => {
      expect(getSlot()).toBe(false)
    })

    test('should return false if slot is not found', () => {
      expect(getSlot(Immutable.Map({}), '2016-06-26', 'slot1')).toBe(false)
    })

    test('should return the first slot if id is not provided', () => {
      const result = getSlot(
        Immutable.fromJS({
          '2016-06-26': { slots: [{ id: 'slot1' }, { id: 'slot2' }] },
        }),
        '2016-06-26',
        '',
      )
      expect(Immutable.is(result, Immutable.fromJS({ id: 'slot1' }))).toBe(true)
    })

    test('should return the correct slot if id is provided', () => {
      const result = getSlot(
        Immutable.fromJS({
          '2016-06-26': {
            slots: [{ id: 'slot1' }, { id: 'slot2' }, { id: 'slot3' }],
          },
        }),
        '2016-06-26',
        'slot2',
      )
      expect(Immutable.is(result, Immutable.fromJS({ id: 'slot2' }))).toBe(true)
    })
  })

  describe('getSlotTimes', () => {
    test('should return text for slot time', () => {
      const [deliveryDays, date, slotId] = [
        Immutable.fromJS({
          '2016-06-26': {
            slots: [{
              id: 'slot1',
              deliveryStartTime: '08:00:00',
              deliveryEndTime: '12:00:00'

            }, {
              id: 'slot2',
              deliveryStartTime: '08:00:00',
              deliveryEndTime: '19:00:00'
            }, {
              id: 'slot3'
            }],
          },
        }),
        '2016-06-26',
        'slot2',
      ]
      const result = getSlotTimes({ date, deliveryDays, slotId })
      expect(result).toEqual('8am - 7pm ')
    })

    describe('when slot time not sent', () => {
      test('should return text for first slot time', () => {
        const [deliveryDays, date, slotId] = [
          Immutable.fromJS({
            '2016-06-26': {
              slots: [{
                id: 'slot1',
                deliveryStartTime: '08:00:00',
                deliveryEndTime: '12:00:00'

              }, {
                id: 'slot2',
                deliveryStartTime: '08:00:00',
                deliveryEndTime: '19:00:00'
              }, {
                id: 'slot3'
              }],
            },
          }),
          '2016-06-26',
          '',
        ]
        const result = getSlotTimes({ date, deliveryDays, slotId })
        expect(result).toEqual('8am - 12pm ')
      })
    })
  })

  describe('getCutoffs', () => {
    let basket
    let boxSummaryDeliveryDays

    beforeEach(() => {
      basket = Immutable.Map({
        date: '2016-03-02',
        slotId: '123-123-123',

        prevDate: '2015-12-12',
        prevSlotId: '321-321-321',
      })
      boxSummaryDeliveryDays = Immutable.fromJS({
        '2016-03-02': {
          slots: [
            {
              id: '123-123-123',
              whenCutoff: 'asdf',
            },
          ],
        },
        '2015-12-12': {
          slots: [
            {
              id: '321-321-321',
              whenCutoff: 'qwerty',
            },
          ],
        },
      })
    })

    test('should return an array with current cutoff, then previous cutoff, if exists', () => {
      const result = getCutoffs(basket, boxSummaryDeliveryDays)
      const expected = ['asdf', 'qwerty']
      expect(result).toEqual(expected)
    })
    test("should return an array with 2 previous cutoffs if current cutoff doesn't exist", () => {
      basket = Immutable.Map({
        prevDate: '2015-12-12',
        prevSlotId: '321-321-321',
      })

      const result = getCutoffs(basket, boxSummaryDeliveryDays)
      const expected = ['qwerty', 'qwerty']
      expect(result).toEqual(expected)
    })
    test("should return an array with 2 current cutoffs if previous cutoff doesn't exist", () => {
      basket = Immutable.Map({
        date: '2016-03-02',
        slotId: '123-123-123',
      })

      const result = getCutoffs(basket, boxSummaryDeliveryDays)
      const expected = ['asdf', 'asdf']
      expect(result).toEqual(expected)
    })
  })

  describe('getCutoffDateTime', () => {
    let state
    test("should return the slot's cutoff date if it exists", () => {
      state = {
        basket: Immutable.fromJS({
          date: '2016-03-02',
          slotId: '123-123-123',

          prevDate: '2015-12-12',
          prevSlotId: '321-321-321',
        }),
        boxSummaryDeliveryDays: Immutable.fromJS({
          '2016-03-02': {
            slots: [
              {
                id: '123-123-123',
                whenCutoff: 'asdf',
              },
            ],
          },
          '2015-12-12': {
            slots: [
              {
                id: '321-321-321',
                whenCutoff: 'qwerty',
              },
            ],
          },
        }),
      }

      const result = getCutoffDateTime(state)
      const expected = 'asdf'
      expect(result).toEqual(expected)
    })
    test('should otherwise return an empty string', () => {
      state = {
        basket: Immutable.fromJS({
          date: '2016-03-02',
          slotId: '678-678-678',

          prevDate: '2015-12-12',
          prevSlotId: '321-321-321',
        }),
        boxSummaryDeliveryDays: Immutable.fromJS({
          '2016-03-02': {
            slots: [
              {
                id: '123-123-123',
                whenCutoff: 'asdf',
              },
            ],
          },
          '2015-12-12': {
            slots: [
              {
                id: '321-321-321',
                whenCutoff: 'qwerty',
              },
            ],
          },
        }),
      }

      const result = getCutoffDateTime(state)
      const expected = ''
      expect(result).toEqual(expected)
    })
  })
  describe('getLandingDay', () => {
    let state
    let date
    let deliveryDays
    let deliveryDaysWithDisabledSlotIds
    let userOrders
    let slotId
    let prevSlotId
    let defaultDay

    beforeEach(() => {
      date = null
      deliveryDays = Immutable.fromJS({})
      userOrders = Immutable.fromJS([])
      slotId = ''
      prevSlotId = ''
      defaultDay = ''
      state = {
        basket: Immutable.Map({
          date,
          slotId,
          prevSlotId,
        }),
        features: Immutable.Map({
          default_day: Immutable.Map({
            value: defaultDay,
          }),
        }),
        boxSummaryDeliveryDays: deliveryDays,
        user: Immutable.Map({
          orders: userOrders,
        }),
      }
    })

    describe('with only state passed in', () => {
      test('should not blow up', () => {
        try {
          getLandingDay(state)
        } catch (err) {
          expect(err).toBe(null)
        }
      })
    })

    describe('with no date passed in', () => {
      describe('with a default delivery day set', () => {
        beforeEach(() => {
          deliveryDays = Immutable.fromJS({
            '2016-03-02': {
              isDefault: false,
              date: '2016-03-02',
              slots: [
                {
                  id: '123-123-123',
                  whenCutoff: 'asdf',
                },
              ],
            },
            '2015-12-12': {
              date: '2015-12-12',
              isDefault: true,
              slots: [
                {
                  id: '321-321-321',
                  whenCutoff: 'qwerty',
                },
              ],
            },
            '2014-12-12': {
              date: '2014-12-12',
              isDefault: false,
              slots: [
                {
                  id: '456-456-456',
                  whenCutoff: 'zxcvb',
                },
              ],
            },
          })
          state = Object.assign({}, state, {
            boxSummaryDeliveryDays: deliveryDays,
          })
        })
        test('should return that day', () => {
          const result = getLandingDay(state, false, true)
          const expected = { date: '2015-12-12', slotId: '321-321-321' }

          expect(state.boxSummaryDeliveryDays).toEqual(deliveryDays)
          expect(result).toEqual(expected)
        })
        describe('and an order on that date', () => {
          beforeEach(() => {
            userOrders = Immutable.fromJS([{ deliveryDate: '2015-12-12' }])
            state = Object.assign({}, state, {
              user: Immutable.Map({ orders: userOrders }),
            })
          })
          test('should not default to the default day', () => {
            const result = getLandingDay(state, false, true)
            const expected = { date: '2014-12-12', slotId: '456-456-456' }
            expect(result).toEqual(expected)
          })
        })
        describe('but it has alternate day', () => {
          beforeEach(() => {
            const alternate = Immutable.fromJS({
              '2015-12-12': {
                date: '2015-12-12',
                isDefault: true,
                unavailableReason: 'holiday',
                alternateDeliveryDay: {
                  date: '2015-12-24',
                  isDefault: false,
                },
                slots: [
                  {
                    id: '321-321-321',
                    whenCutoff: 'qwerty',
                  },
                ],
              },
              '2015-12-24': {
                date: '2015-12-24',
                isDefault: false,
                slots: [
                  {
                    id: '12a-12a-12a',
                    whenCutoff: 'qwerty',
                  },
                ],
              },
            })
            deliveryDays = deliveryDays.mergeDeep(alternate)
            state = Object.assign({}, state, {
              boxSummaryDeliveryDays: deliveryDays,
            })
          })
          test('should use the alternate day instead', () => {
            const result = getLandingDay(state, false, true)
            const expected = { date: '2015-12-24', slotId: '12a-12a-12a' }
            expect(result).toEqual(expected)
          })
        })
      })
      describe('without a default delivery day set', () => {
        beforeEach(() => {
          deliveryDays = Immutable.fromJS({
            '2016-03-02': {
              date: '2016-03-02',
              isDefault: false,
              slots: [
                {
                  id: '123-123-123',
                  whenCutoff: 'asdf',
                },
              ],
            },
            '2015-12-12': {
              date: '2015-12-12',
              isDefault: false,
              slots: [
                {
                  id: '321-321-321',
                  whenCutoff: 'qwerty',
                },
              ],
            },
            '2014-12-12': {
              date: '2014-12-12',
              isDefault: false,
              slots: [
                {
                  id: '456-456-456',
                  whenCutoff: 'zxcvb',
                },
              ],
            },
          })
          state = Object.assign({}, state, {
            boxSummaryDeliveryDays: deliveryDays,
          })
        })
        test('should return the first day available', () => {
          const result = getLandingDay(state, false, true)
          const expected = { date: '2014-12-12', slotId: '456-456-456' }
          expect(result).toEqual(expected)
        })
        describe('and an order on the first day available', () => {
          beforeEach(() => {
            userOrders = Immutable.fromJS([{ deliveryDate: '2014-12-12' }])
            state = Object.assign({}, state, {
              user: Immutable.Map({ orders: userOrders }),
            })
          })
          test('should return the next date', () => {
            const result = getLandingDay(state, prevSlotId, true)
            const expected = { date: '2015-12-12', slotId: '321-321-321' }
            expect(result).toEqual(expected)
          })
        })
        describe('and a valid feature date set', () => {
          beforeEach(() => {
            defaultDay = '2016-03-02'
            state = Object.assign({}, state, {
              features: Immutable.Map({
                default_day: Immutable.Map({ value: defaultDay }),
              }),
            })
          })
          test('should return the feature date', () => {
            const result = getLandingDay(state)
            const expected = { date: '2016-03-02', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })
        describe('and an invalid feature date set', () => {
          beforeEach(() => {
            defaultDay = '2017-10-10'
            state = Object.assign({}, state, {
              features: Immutable.Map({
                default_day: Immutable.Map({ value: defaultDay }),
              }),
            })
          })
          test('should return the first day available', () => {
            const result = getLandingDay(state)
            const expected = { date: '2014-12-12', slotId: '456-456-456' }
            expect(result).toEqual(expected)
          })
        })
      })
    })

    describe('with a basket date passed in', () => {
      beforeEach(() => {
        date = '2017-01-01'
        state = Object.assign({}, state, { basket: Immutable.Map({ date }) })
      })
      test('should return undefined', () => {
        const result = getLandingDay(state, false, true)
        const expected = { date: undefined, slotId: undefined }
        expect(result).toEqual(expected)
      })
      describe('and a delivery day for that date', () => {
        beforeEach(() => {
          deliveryDays = Immutable.fromJS({
            '2016-03-02': {
              date: '2016-03-02',
              isDefault: false,
              slots: [
                {
                  id: '123-123-123',
                  whenCutoff: 'asdf',
                },
              ],
            },
            '2015-12-12': {
              date: '2015-12-12',
              isDefault: false,
              slots: [
                {
                  id: '321-321-321',
                  whenCutoff: 'qwerty',
                },
              ],
            },
            '2014-12-12': {
              date: '2014-12-12',
              isDefault: false,
              slots: [
                {
                  id: '456-456-456',
                  whenCutoff: 'zxcvb',
                },
              ],
            },
            '2017-01-01': {
              date: '2017-01-01',
              isDefault: false,
              slots: [
                {
                  id: '789-789-789',
                  whenCutoff: 'zxcvb',
                },
              ],
            },
          })
          state = Object.assign({}, state, {
            boxSummaryDeliveryDays: deliveryDays,
          })
        })

        test('should return with that date', () => {
          const result = getLandingDay(state, false, true)
          const expected = { date: '2017-01-01', slotId: '789-789-789' }
          expect(result).toEqual(expected)
        })

        describe('and a valid feature date set', () => {
          beforeEach(() => {
            defaultDay = '2016-03-02'
            state = Object.assign({}, state, {
              features: Immutable.Map({
                default_day: Immutable.Map({ value: defaultDay }),
              }),
            })
          })
          test('should return the basket date', () => {
            const result = getLandingDay(state)
            const expected = { date: '2017-01-01', slotId: '789-789-789' }
            expect(result).toEqual(expected)
          })
        })
      })
    })

    describe('with a date selected with default slots', () => {
      beforeEach(() => {
        date = '2017-01-01'
        deliveryDays = Immutable.fromJS({
          '2016-03-02': {
            date: '2016-03-02',
            isDefault: false,
            slots: [
              {
                id: '123-123-123',
                whenCutoff: 'asdf',
              },
            ],
          },
          '2015-12-12': {
            date: '2015-12-12',
            isDefault: false,
            slots: [
              {
                id: '321-321-321',
                whenCutoff: 'qwerty',
              },
            ],
          },
          '2014-12-12': {
            date: '2014-12-12',
            isDefault: false,
            slots: [
              {
                id: '456-456-456',
                whenCutoff: 'zxcvb',
              },
            ],
          },
          '2017-01-01': {
            date: '2017-01-01',
            isDefault: false,
            slots: [
              {
                id: '789-789-789',
                whenCutoff: 'zxcvb',
              },
              {
                id: '123-123-123',
                whenCutoff: 'jfklsad',
                isDefault: true,
              },
            ],
          },
        })
        deliveryDaysWithDisabledSlotIds = Immutable.fromJS({
          '2016-03-02': {
            date: '2016-03-02',
            isDefault: false,
            slots: [
              {
                id: '123-123-123',
                whenCutoff: 'asdf',
                disabledSlotId: '2016-03-02_08-19',
              },
            ],
          },
          '2015-12-12': {
            date: '2015-12-12',
            isDefault: false,
            slots: [
              {
                id: '321-321-321',
                whenCutoff: 'qwerty',
                disabledSlotId: '2015-12-12_08-19'
              },
            ],
          },
          '2014-12-12': {
            date: '2014-12-12',
            isDefault: false,
            slots: [
              {
                id: '456-456-456',
                whenCutoff: 'zxcvb',
                disabledSlotId: '2014-12-12_08-19'
              },
            ],
          },
          '2017-01-01': {
            date: '2017-01-01',
            isDefault: false,
            slots: [
              {
                id: '789-789-789',
                whenCutoff: 'zxcvb',
                disabledSlotId: '2017-01-01_08-19'
              },
              {
                id: '123-123-123',
                whenCutoff: 'jfklsad',
                disabledSlotId: '2017-01-01_18-22',
                isDefault: true,
              },
            ],
          },
        })
        state = Object.assign({}, state, {
          basket: Immutable.Map({ date }),
          boxSummaryDeliveryDays: deliveryDays,
        })
      })
      test('should return the default delivery slot if not disabled', () => {
        getDisabledSlots.mockImplementation(() => '')

        const result = getLandingDay(state, false, true, deliveryDaysWithDisabledSlotIds)
        const expected = { date: '2017-01-01', slotId: '123-123-123' }
        expect(result).toEqual(expected)
      })

      test('should NOT return the default delivery slot if disabled', () => {
        getDisabledSlots.mockImplementation(() => '2017-01-01_18-22')

        const result = getLandingDay(state, false, true, deliveryDaysWithDisabledSlotIds)
        const expected = { date: '2017-01-01', slotId: '123-123-123' }
        expect(result).not.toEqual(expected)
      })

      test('should return nothing if the default delivery slot if disabled and all other slots are disabled', () => {
        getDisabledSlots.mockImplementation(() => '2017-01-01_18-22')

        const result = getLandingDay(state, false, true, deliveryDaysWithDisabledSlotIds)
        const expected = { date: '2017-01-01', slotId: '123-123-123' }
        expect(result).not.toEqual(expected)
      })

      test('should return first non blocked slot if the default delivery slot if disabled', () => {
        getDisabledSlots.mockImplementation(() => '2017-01-01_18-22, 2017-01-01_08-19')

        const result = getLandingDay(state, false, true, deliveryDaysWithDisabledSlotIds)
        const expected = { date: '2017-01-01', slotId: undefined }
        expect(result).toEqual(expected)
      })
    })

    describe('with user orders, a date selected, delivery days, and an order on that day', () => {
      beforeEach(() => {
        date = '2017-01-01'
        prevSlotId = '123-123-123'
        deliveryDays = Immutable.fromJS({
          '2016-03-02': {
            date: '2016-03-02',
            isDefault: false,
            slots: [
              {
                id: '123-123-123',
                whenCutoff: 'asdf',
              },
            ],
          },
          '2015-12-12': {
            date: '2015-12-12',
            isDefault: false,
            slots: [
              {
                id: '321-321-321',
                whenCutoff: 'qwerty',
              },
            ],
          },
          '2014-12-12': {
            date: '2014-12-12',
            isDefault: false,
            slots: [
              {
                id: '456-456-456',
                whenCutoff: 'zxcvb',
              },
            ],
          },
          '2017-01-01': {
            date: '2017-01-01',
            isDefault: false,
            slots: [
              {
                id: '789-789-789',
                whenCutoff: 'zxcvb',
              },
              {
                id: '123-123-123',
                whenCutoff: 'jfklsad',
              },
            ],
          },
        })
        userOrders = Immutable.fromJS([{ deliveryDate: '2016-03-02' }])
        state = Object.assign({}, state, {
          basket: Immutable.Map({
            date,
            prevSlotId,
          }),
          boxSummaryDeliveryDays: deliveryDays,
          user: Immutable.Map({ orders: userOrders }),
        })
      })

      test('should keep the selected date', () => {
        const result = getLandingDay(state, false, true)
        const expected = { date: '2017-01-01', slotId: '123-123-123' }
        expect(result).toEqual(expected)
      })
    })

    describe('with the cantLandOnOrderDate argument set to falsey', () => {
      let clock

      beforeEach(() => {
        const slot = {
          id: '123-123-123',
          whenCutoff: 'asdf',
          coreSlotId: '1',
        }
        const dds = {}
        // two weeks of valid delivery days with slots
        for (let i = 1; i <= 14; i++) {
          const d = `2016-03-${i < 10 ? `0${i}` : i}`
          dds[d] = { date: d, slots: [slot] }
        }
        deliveryDays = Immutable.fromJS(dds)
        state = Object.assign({}, state, {
          boxSummaryDeliveryDays: deliveryDays,
        })
        clock = sinon.useFakeTimers(
          new Date(Date.UTC(2016, 2, 1, 0, 0, 0)).getTime(),
        )
      })

      afterEach(() => {
        clock.restore()
      })

      describe('with this weeks order: none, next weeks order: none, default delivery day: not set', () => {
        test('should choose the next available date', () => {
          const result = getLandingDay(state)
          const expected = { date: '2016-03-01', slotId: '123-123-123' }
          expect(result).toEqual(expected)
        })
      })

      describe('with this weeks order: empty, next weeks order: none, default delivery day: not set', () => {
        test('should land on the empty order date', () => {
          userOrders = Immutable.fromJS([
            {
              deliveryDate: '2016-03-03',
              recipeItems: [],
              deliverySlot: { id: '1' },
              whenCutoff: '2017-01-01',
            },
          ])
          state = Object.assign({}, state, {
            user: Immutable.Map({ orders: userOrders }),
          })
          const result = getLandingDay(state)
          const expected = { date: '2016-03-03', slotId: '123-123-123' }
          expect(result).toEqual(expected)
        })
      })

      describe('with this weeks order: filled, next weeks order: empty, default delivery day: not set', () => {
        test('should land on empty order date', () => {
          userOrders = Immutable.fromJS([
            {
              deliveryDate: '2016-03-03',
              recipeItems: ['lots', 'of', 'recipes'],
              deliverySlot: { id: '1' },
              whenCutoff: '2017-01-01',
            },
            {
              deliveryDate: '2016-03-10',
              recipeItems: [],
              deliverySlot: { id: '1' },
              whenCutoff: '2017-01-01',
            },
          ])
          state = Object.assign({}, state, {
            user: Immutable.Map({ orders: userOrders }),
          })
          const result = getLandingDay(state)
          const expected = { date: '2016-03-10', slotId: '123-123-123' }
          expect(result).toEqual(expected)
        })
      })

      describe('with this weeks order: filled, next weeks order: none, default delivery day: not set', () => {
        test('should land on filled order date + 1 week', () => {
          userOrders = Immutable.fromJS([
            {
              deliveryDate: '2016-03-03',
              recipeItems: ['lots', 'of', 'recipes'],
              deliverySlot: { id: '1' },
              whenCutoff: '2017-01-01',
            },
          ])
          state = Object.assign({}, state, {
            user: Immutable.Map({ orders: userOrders }),
          })
          const result = getLandingDay(state)
          const expected = { date: '2016-03-10', slotId: '123-123-123' }
          expect(result).toEqual(expected)
        })
      })

      describe('with this weeks order: none, next weeks order: empty, default delivery day: not set', () => {
        test('should land on empty order date minus 1 week', () => {
          userOrders = Immutable.fromJS([
            {
              deliveryDate: '2016-03-10',
              recipeItems: [],
              deliverySlot: { id: '1' },
              whenCutoff: '2017-01-01',
            },
          ])
          state = Object.assign({}, state, {
            user: Immutable.Map({ orders: userOrders }),
          })
          const result = getLandingDay(state)
          const expected = { date: '2016-03-03', slotId: '123-123-123' }
          expect(result).toEqual(expected)
        })
      })

      describe('with this weeks order: empty, next weeks order: empty, default delivery day: not set', () => {
        test('should land on the first empty order', () => {
          userOrders = Immutable.fromJS([
            {
              deliveryDate: '2016-03-03',
              recipeItems: [],
              deliverySlot: { id: '1' },
              whenCutoff: '2017-01-01',
            },
            {
              deliveryDate: '2016-03-10',
              recipeItems: [],
              deliverySlot: { id: '1' },
              whenCutoff: '2017-01-01',
            },
          ])
          state = Object.assign({}, state, {
            user: Immutable.Map({ orders: userOrders }),
          })
          const result = getLandingDay(state)
          const expected = { date: '2016-03-03', slotId: '123-123-123' }
          expect(result).toEqual(expected)
        })
      })

      describe('with this weeks order: filled, next weeks order: empty, default delivery day: not set', () => {
        test('should land on empty order date', () => {
          userOrders = Immutable.fromJS([
            {
              deliveryDate: '2016-03-03',
              recipeItems: ['lots', 'of', 'recipes'],
              deliverySlot: { id: '1' },
              whenCutoff: '2017-01-01',
            },
            {
              deliveryDate: '2016-03-10',
              recipeItems: [],
              deliverySlot: { id: '1' },
              whenCutoff: '2017-01-01',
            },
          ])
          state = Object.assign({}, state, {
            user: Immutable.Map({ orders: userOrders }),
          })
          const result = getLandingDay(state)
          const expected = { date: '2016-03-10', slotId: '123-123-123' }
          expect(result).toEqual(expected)
        })
      })

      describe('with this weeks order: none, next weeks order: filled, default delivery day: not set', () => {
        test('should land on filled order date minus 1 week', () => {
          userOrders = Immutable.fromJS([
            {
              deliveryDate: '2016-03-10',
              recipeItems: ['lots', 'of', 'food'],
              deliverySlot: { id: '1' },
              whenCutoff: '2017-01-01',
            },
          ])
          state = Object.assign({}, state, {
            user: Immutable.Map({ orders: userOrders }),
          })
          const result = getLandingDay(state)
          const expected = { date: '2016-03-03', slotId: '123-123-123' }
          expect(result).toEqual(expected)
        })
      })

      describe('with this weeks order: empty, next weeks order: filled, default delivery day: not set', () => {
        test('should land on next weeks order date', () => {
          userOrders = Immutable.fromJS([
            {
              deliveryDate: '2016-03-03',
              recipeItems: [],
              deliverySlot: { id: '1' },
              whenCutoff: '2017-01-01',
            },
            {
              deliveryDate: '2016-03-10',
              recipeItems: ['lots', 'of', 'food'],
              deliverySlot: { id: '1' },
              whenCutoff: '2017-01-01',
            },
          ])
          state = Object.assign({}, state, {
            user: Immutable.Map({ orders: userOrders }),
          })
          const result = getLandingDay(state)
          const expected = { date: '2016-03-03', slotId: '123-123-123' }
          expect(result).toEqual(expected)
        })
      })

      describe('with this weeks order: filled, next weeks order: filled, default delivery day: not set', () => {
        test('should land on available delivery date', () => {
          userOrders = Immutable.fromJS([
            {
              deliveryDate: '2016-03-03',
              recipeItems: ['lots', 'of', 'food'],
              deliverySlot: { id: '1' },
              whenCutoff: '2017-01-01',
            },
            {
              deliveryDate: '2016-03-10',
              recipeItems: ['lots', 'of', 'food'],
              deliverySlot: { id: '1' },
              whenCutoff: '2017-01-01',
            },
          ])
          state = Object.assign({}, state, {
            user: Immutable.Map({ orders: userOrders }),
          })
          const result = getLandingDay(state)
          const expected = { date: '2016-03-01', slotId: '123-123-123' }
          expect(result).toEqual(expected)
        })
      })

      describe('with this weeks order: none, next weeks order: none, default delivery day: not set', () => {
        test('should land on first available delivery date', () => {
          userOrders = Immutable.fromJS([])
          state = Object.assign({}, state, {
            user: Immutable.Map({ orders: userOrders }),
          })
          const result = getLandingDay(state)
          const expected = { date: '2016-03-01', slotId: '123-123-123' }
          expect(result).toEqual(expected)
        })
      })

      describe('with this weeks order: cutoff, next weeks order: none, default delivery day: not set', () => {
        test('should land on the cutoff order date + 1 week', () => {
          userOrders = Immutable.fromJS([
            {
              deliveryDate: '2016-03-03',
              recipeItems: ['lots', 'of', 'food'],
              deliverySlot: { id: '1' },
              whenCutoff: '2016-02-20',
            },
          ])
          state = Object.assign({}, state, {
            user: Immutable.Map({ orders: userOrders }),
          })
          const result = getLandingDay(state)
          const expected = { date: '2016-03-10', slotId: '123-123-123' }
          expect(result).toEqual(expected)
        })
      })
      describe('with this weeks order: cutoff, next weeks order: empty, default delivery day: not set', () => {
        test('should land on next weeks order date', () => {
          userOrders = Immutable.fromJS([
            {
              deliveryDate: '2016-03-03',
              recipeItems: ['lots', 'of', 'food'],
              deliverySlot: { id: '1' },
              whenCutoff: '2016-02-20',
            },
            {
              deliveryDate: '2016-03-10',
              recipeItems: [],
              deliverySlot: { id: '1' },
              whenCutoff: '2017-01-01',
            },
          ])
          state = Object.assign({}, state, {
            user: Immutable.Map({ orders: userOrders }),
          })
          const result = getLandingDay(state)
          const expected = { date: '2016-03-10', slotId: '123-123-123' }
          expect(result).toEqual(expected)
        })
      })
      describe('with this weeks order: cutoff, next weeks order: filled, default delivery day: not set', () => {
        test('should land on available delivery date', () => {
          userOrders = Immutable.fromJS([
            {
              deliveryDate: '2016-03-03',
              recipeItems: ['lots', 'of', 'food'],
              deliverySlot: { id: '1' },
              whenCutoff: '2016-02-20',
            },
            {
              deliveryDate: '2016-03-10',
              recipeItems: ['lots', 'of', 'food'],
              deliverySlot: { id: '1' },
              whenCutoff: '2017-01-01',
            },
          ])
          state = Object.assign({}, state, {
            user: Immutable.Map({ orders: userOrders }),
          })
          const result = getLandingDay(state)
          const expected = { date: '2016-03-01', slotId: '123-123-123' }
          expect(result).toEqual(expected)
        })
      })

      describe('with a default delivery day set to a day with no order', () => {
        beforeEach(() => {
          const slot = {
            id: '123-123-123',
            whenCutoff: 'asdf',
            coreSlotId: '1',
          }
          const dds = {}
          // two weeks of valid delivery days with slots
          for (let i = 1; i <= 14; i++) {
            const d = `2016-03-${i < 10 ? `0${i}` : i}`
            dds[d] = { date: d, slots: [slot] }
          }
          dds['2016-03-05'].isDefault = true
          deliveryDays = Immutable.fromJS(dds)
          state = Object.assign({}, state, {
            boxSummaryDeliveryDays: deliveryDays,
          })
        })

        describe('with this weeks order: none, next weeks order: none, default delivery day: set to day with no order', () => {
          test('should choose the default date', () => {
            const result = getLandingDay(state)
            const expected = { date: '2016-03-05', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })

        describe('with this weeks order: empty, next weeks order: none, default delivery day: set to day with no order', () => {
          test('should land on the empty order date', () => {
            userOrders = Immutable.fromJS([
              {
                deliveryDate: '2016-03-03',
                recipeItems: [],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
            ])
            state = Object.assign({}, state, {
              user: Immutable.Map({ orders: userOrders }),
            })
            const result = getLandingDay(state)
            const expected = { date: '2016-03-03', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })

        describe('with this weeks order: filled, next weeks order: none, default delivery day: set to day with no order', () => {
          test('should land on empty order date', () => {
            userOrders = Immutable.fromJS([
              {
                deliveryDate: '2016-03-03',
                recipeItems: ['lots', 'of', 'recipes'],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
              {
                deliveryDate: '2016-03-10',
                recipeItems: [],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
            ])
            state = Object.assign({}, state, {
              user: Immutable.Map({ orders: userOrders }),
            })
            const result = getLandingDay(state)
            const expected = { date: '2016-03-10', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })

        describe('with this weeks order: none, next weeks order: empty, default delivery day: set to day with no order', () => {
          test('should land on the default day', () => {
            userOrders = Immutable.fromJS([
              {
                deliveryDate: '2016-03-10',
                recipeItems: [],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
            ])
            state = Object.assign({}, state, {
              user: Immutable.Map({ orders: userOrders }),
            })
            const result = getLandingDay(state)
            const expected = { date: '2016-03-05', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })

        describe('with this weeks order: empty, next weeks order: empty, default delivery day: set to day with no order', () => {
          test('should land on the first empty order', () => {
            userOrders = Immutable.fromJS([
              {
                deliveryDate: '2016-03-03',
                recipeItems: [],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
              {
                deliveryDate: '2016-03-10',
                recipeItems: [],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
            ])
            state = Object.assign({}, state, {
              user: Immutable.Map({ orders: userOrders }),
            })
            const result = getLandingDay(state)
            const expected = { date: '2016-03-03', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })

        describe('with this weeks order: filled, next weeks order: empty, default delivery day: set to day with no order', () => {
          test('should land on empty order date', () => {
            userOrders = Immutable.fromJS([
              {
                deliveryDate: '2016-03-03',
                recipeItems: ['lots', 'of', 'recipes'],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
              {
                deliveryDate: '2016-03-10',
                recipeItems: [],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
            ])
            state = Object.assign({}, state, {
              user: Immutable.Map({ orders: userOrders }),
            })
            const result = getLandingDay(state)
            const expected = { date: '2016-03-10', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })

        describe('with this weeks order: none, next weeks order: filled, default delivery day: set to day with no order', () => {
          test('should land on default day', () => {
            userOrders = Immutable.fromJS([
              {
                deliveryDate: '2016-03-10',
                recipeItems: ['lots', 'of', 'food'],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
            ])
            state = Object.assign({}, state, {
              user: Immutable.Map({ orders: userOrders }),
            })
            const result = getLandingDay(state)
            const expected = { date: '2016-03-05', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })

        describe('with this weeks order: empty, next weeks order: filled, default delivery day: set to day with no order', () => {
          test('should land on the empty order date', () => {
            userOrders = Immutable.fromJS([
              {
                deliveryDate: '2016-03-03',
                recipeItems: [],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
              {
                deliveryDate: '2016-03-10',
                recipeItems: ['lots', 'of', 'food'],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
            ])
            state = Object.assign({}, state, {
              user: Immutable.Map({ orders: userOrders }),
            })
            const result = getLandingDay(state)
            const expected = { date: '2016-03-03', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })

        describe('with this weeks order: filled, next weeks order: filled, default delivery day: set to day with no order', () => {
          test('should land on the default date', () => {
            userOrders = Immutable.fromJS([
              {
                deliveryDate: '2016-03-03',
                recipeItems: ['lots', 'of', 'food'],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
              {
                deliveryDate: '2016-03-10',
                recipeItems: ['lots', 'of', 'food'],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
            ])
            state = Object.assign({}, state, {
              user: Immutable.Map({ orders: userOrders }),
            })
            const result = getLandingDay(state)
            const expected = { date: '2016-03-05', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })

        describe('with this weeks order: cutoff, next weeks order: none, default delivery day: set to day with no order', () => {
          test('should land on default day', () => {
            userOrders = Immutable.fromJS([
              {
                deliveryDate: '2016-03-03',
                recipeItems: ['lots', 'of', 'food'],
                deliverySlot: { id: '1' },
                whenCutoff: '2016-02-20',
              },
            ])
            state = Object.assign({}, state, {
              user: Immutable.Map({ orders: userOrders }),
            })
            const result = getLandingDay(state)
            const expected = { date: '2016-03-05', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })
        describe('with this weeks order: cutoff, next weeks order: empty, default delivery day: set to day with no order', () => {
          test('should land on next weeks order', () => {
            userOrders = Immutable.fromJS([
              {
                deliveryDate: '2016-03-03',
                recipeItems: ['lots', 'of', 'food'],
                deliverySlot: { id: '1' },
                whenCutoff: '2016-02-20',
              },
              {
                deliveryDate: '2016-03-10',
                recipeItems: [],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
            ])
            state = Object.assign({}, state, {
              user: Immutable.Map({ orders: userOrders }),
            })
            const result = getLandingDay(state)
            const expected = { date: '2016-03-10', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })
        describe('with this weeks order: cutoff, next weeks order: filled, default delivery day: set to day with no order', () => {
          test('should land on default delivery date', () => {
            userOrders = Immutable.fromJS([
              {
                deliveryDate: '2016-03-03',
                recipeItems: ['lots', 'of', 'food'],
                deliverySlot: { id: '1' },
                whenCutoff: '2016-02-20',
              },
              {
                deliveryDate: '2016-03-10',
                recipeItems: ['lots', 'of', 'food'],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
            ])
            state = Object.assign({}, state, {
              user: Immutable.Map({ orders: userOrders }),
            })
            const result = getLandingDay(state)
            const expected = { date: '2016-03-05', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })
      })

      describe('with a default delivery day set to a day with an empty order', () => {
        let dds
        beforeEach(() => {
          const slot = {
            id: '123-123-123',
            whenCutoff: 'asdf',
            coreSlotId: '1',
          }
          dds = {}
          // two weeks of valid delivery days with slots
          for (let i = 1; i <= 14; i++) {
            const d = `2016-03-${i < 10 ? `0${i}` : i}`
            dds[d] = { date: d, slots: [slot] }
          }
        })

        describe('with this weeks order: empty, next weeks order: none, default delivery day: set to day with an empty order', () => {
          test('should land on the empty order date', () => {
            userOrders = Immutable.fromJS([
              {
                deliveryDate: '2016-03-03',
                recipeItems: [],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
            ])
            dds['2016-03-03'].isDefault = true
            deliveryDays = Immutable.fromJS(dds)
            state = Object.assign({}, state, {
              boxSummaryDeliveryDays: deliveryDays,
              user: Immutable.Map({ orders: userOrders }),
            })
            const result = getLandingDay(state)
            const expected = { date: '2016-03-03', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })

        describe('with this weeks order: none, next weeks order: empty, default delivery day: set to day with an empty order', () => {
          test('should land on empty order date minus 1 week', () => {
            userOrders = Immutable.fromJS([
              {
                deliveryDate: '2016-03-10',
                recipeItems: [],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
            ])
            dds['2016-03-10'].isDefault = true
            deliveryDays = Immutable.fromJS(dds)
            state = Object.assign({}, state, {
              boxSummaryDeliveryDays: deliveryDays,
              user: Immutable.Map({ orders: userOrders }),
            })

            const result = getLandingDay(state)
            const expected = { date: '2016-03-03', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })

        describe('with this weeks order: empty, next weeks order: empty, default delivery day: set to day with an empty order', () => {
          test('should land on the first empty order', () => {
            userOrders = Immutable.fromJS([
              {
                deliveryDate: '2016-03-03',
                recipeItems: [],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
              {
                deliveryDate: '2016-03-10',
                recipeItems: [],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
            ])
            dds['2016-03-03'].isDefault = true
            deliveryDays = Immutable.fromJS(dds)
            state = Object.assign({}, state, {
              boxSummaryDeliveryDays: deliveryDays,
              user: Immutable.Map({ orders: userOrders }),
            })

            const result = getLandingDay(state)
            const expected = { date: '2016-03-03', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })

        describe('with this weeks order: filled, next weeks order: empty, default delivery day: set to day with an empty order', () => {
          test('should land on empty order date', () => {
            userOrders = Immutable.fromJS([
              {
                deliveryDate: '2016-03-03',
                recipeItems: ['lots', 'of', 'recipes'],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
              {
                deliveryDate: '2016-03-10',
                recipeItems: [],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
            ])
            dds['2016-03-10'].isDefault = true
            deliveryDays = Immutable.fromJS(dds)
            state = Object.assign({}, state, {
              boxSummaryDeliveryDays: deliveryDays,
              user: Immutable.Map({ orders: userOrders }),
            })

            const result = getLandingDay(state)
            const expected = { date: '2016-03-10', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })

        describe('with this weeks order: empty, next weeks order: filled, default delivery day: set to day with an empty order', () => {
          test('should land on empty order date', () => {
            userOrders = Immutable.fromJS([
              {
                deliveryDate: '2016-03-03',
                recipeItems: [],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
              {
                deliveryDate: '2016-03-10',
                recipeItems: ['lots', 'of', 'recipes'],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
            ])
            dds['2016-03-03'].isDefault = true
            deliveryDays = Immutable.fromJS(dds)
            state = Object.assign({}, state, {
              boxSummaryDeliveryDays: deliveryDays,
              user: Immutable.Map({ orders: userOrders }),
            })

            const result = getLandingDay(state)
            const expected = { date: '2016-03-03', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })

        describe('with this weeks order: cutoff, next weeks order: empty, default delivery day: set to day with an empty order', () => {
          test('should land on next weeks order', () => {
            userOrders = Immutable.fromJS([
              {
                deliveryDate: '2016-03-03',
                recipeItems: [],
                deliverySlot: { id: '1' },
                whenCutoff: '2016-02-20',
              },
              {
                deliveryDate: '2016-03-10',
                recipeItems: [],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
            ])
            dds['2016-03-10'].isDefault = true
            deliveryDays = Immutable.fromJS(dds)
            state = Object.assign({}, state, {
              boxSummaryDeliveryDays: deliveryDays,
              user: Immutable.Map({ orders: userOrders }),
            })

            const result = getLandingDay(state)
            const expected = { date: '2016-03-10', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })
      })

      describe('with a default delivery day set to a day with a filled order', () => {
        let dds
        beforeEach(() => {
          const slot = {
            id: '123-123-123',
            whenCutoff: 'asdf',
            coreSlotId: '1',
          }
          dds = {}
          // two weeks of valid delivery days with slots
          for (let i = 1; i <= 14; i++) {
            const d = `2016-03-${i < 10 ? `0${i}` : i}`
            dds[d] = { date: d, slots: [slot] }
          }
        })

        describe('with this weeks order: filled, next weeks order: none, default delivery day: set to day with a filled order', () => {
          test('should land on filled order date + 1 week', () => {
            userOrders = Immutable.fromJS([
              {
                deliveryDate: '2016-03-03',
                recipeItems: ['lots', 'of', 'recipes'],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
            ])
            dds['2016-03-10'].isDefault = true
            deliveryDays = Immutable.fromJS(dds)
            state = Object.assign({}, state, {
              boxSummaryDeliveryDays: deliveryDays,
              user: Immutable.Map({ orders: userOrders }),
            })

            const result = getLandingDay(state)
            const expected = { date: '2016-03-10', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })

        describe('with this weeks order: filled, next weeks order: empty, default delivery day: set to day with a filled order', () => {
          test('should land on empty order date', () => {
            userOrders = Immutable.fromJS([
              {
                deliveryDate: '2016-03-03',
                recipeItems: ['lots', 'of', 'recipes'],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
              {
                deliveryDate: '2016-03-10',
                recipeItems: [],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
            ])
            dds['2016-03-03'].isDefault = true
            deliveryDays = Immutable.fromJS(dds)
            state = Object.assign({}, state, {
              boxSummaryDeliveryDays: deliveryDays,
              user: Immutable.Map({ orders: userOrders }),
            })

            const result = getLandingDay(state)
            const expected = { date: '2016-03-10', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })

        describe('with this weeks order: none, next weeks order: filled, default delivery day: set to day with a filled order', () => {
          test('should land on filled order date minus 1 week', () => {
            userOrders = Immutable.fromJS([
              {
                deliveryDate: '2016-03-10',
                recipeItems: ['lots', 'of', 'food'],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
            ])
            dds['2016-03-10'].isDefault = true
            deliveryDays = Immutable.fromJS(dds)
            state = Object.assign({}, state, {
              boxSummaryDeliveryDays: deliveryDays,
              user: Immutable.Map({ orders: userOrders }),
            })

            const result = getLandingDay(state)
            const expected = { date: '2016-03-03', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })

        describe('with this weeks order: empty, next weeks order: filled, default delivery day: set to day with a filled order', () => {
          test('should land on empty order date', () => {
            userOrders = Immutable.fromJS([
              {
                deliveryDate: '2016-03-03',
                recipeItems: [],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
              {
                deliveryDate: '2016-03-10',
                recipeItems: ['lots', 'of', 'food'],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
            ])
            dds['2016-03-10'].isDefault = true
            deliveryDays = Immutable.fromJS(dds)
            state = Object.assign({}, state, {
              boxSummaryDeliveryDays: deliveryDays,
              user: Immutable.Map({ orders: userOrders }),
            })

            const result = getLandingDay(state)
            const expected = { date: '2016-03-03', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })

        describe('with this weeks order: filled, next weeks order: filled, default delivery day: set to day with a filled order', () => {
          test('should land on the first date available', () => {
            userOrders = Immutable.fromJS([
              {
                deliveryDate: '2016-03-03',
                recipeItems: ['lots', 'of', 'food'],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
              {
                deliveryDate: '2016-03-10',
                recipeItems: ['lots', 'of', 'food'],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
            ])
            dds['2016-03-10'].isDefault = true
            deliveryDays = Immutable.fromJS(dds)
            state = Object.assign({}, state, {
              boxSummaryDeliveryDays: deliveryDays,
              user: Immutable.Map({ orders: userOrders }),
            })

            const result = getLandingDay(state)
            const expected = { date: '2016-03-01', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })
        describe('with this weeks order: cutoff, next weeks order: filled, default delivery day: set to day with a filled order', () => {
          test('should land on the next available delivery date', () => {
            userOrders = Immutable.fromJS([
              {
                deliveryDate: '2016-03-03',
                recipeItems: ['lots', 'of', 'food'],
                deliverySlot: { id: '1' },
                whenCutoff: '2016-02-20',
              },
              {
                deliveryDate: '2016-03-10',
                recipeItems: ['lots', 'of', 'food'],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
            ])
            dds['2016-03-10'].isDefault = true
            deliveryDays = Immutable.fromJS(dds)
            state = Object.assign({}, state, {
              boxSummaryDeliveryDays: deliveryDays,
              user: Immutable.Map({ orders: userOrders }),
            })

            const result = getLandingDay(state)
            const expected = { date: '2016-03-01', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })

        describe('with last weeks order: cutoff, this weeks order: filled, next weeks order: filled, default delivery day: set to day with another filled order', () => {
          test('should land on the next available delivery date after the default day', () => {
            userOrders = Immutable.fromJS([
              {
                deliveryDate: '2016-03-02',
                recipeItems: ['lots', 'of', 'food'],
                deliverySlot: { id: '1' },
                whenCutoff: '2016-02-20',
              },
              {
                deliveryDate: '2016-03-05',
                recipeItems: ['lots', 'of', 'food'],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
              {
                deliveryDate: '2016-03-06',
                recipeItems: ['lots', 'of', 'food'],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
            ])
            dds['2016-03-05'].isDefault = true
            deliveryDays = Immutable.fromJS(dds)
            state = Object.assign({}, state, {
              boxSummaryDeliveryDays: deliveryDays,
              user: Immutable.Map({ orders: userOrders }),
            })

            const result = getLandingDay(state)
            const expected = { date: '2016-03-07', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })
        describe('with last weeks order: cutoff, this weeks order: filled, next weeks order: filled, with a day between, default delivery day: set to day with another filled order', () => {
          test('should land on the next available delivery date after the default day', () => {
            userOrders = Immutable.fromJS([
              {
                deliveryDate: '2016-03-02',
                recipeItems: ['lots', 'of', 'food'],
                deliverySlot: { id: '1' },
                whenCutoff: '2016-02-20',
              },
              {
                deliveryDate: '2016-03-05',
                recipeItems: ['lots', 'of', 'food'],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
              {
                deliveryDate: '2016-03-07',
                recipeItems: ['lots', 'of', 'food'],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
            ])
            dds['2016-03-05'].isDefault = true
            deliveryDays = Immutable.fromJS(dds)
            state = Object.assign({}, state, {
              boxSummaryDeliveryDays: deliveryDays,
              user: Immutable.Map({ orders: userOrders }),
            })

            const result = getLandingDay(state)
            const expected = { date: '2016-03-06', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })

        describe('with last weeks order: cutoff, this weeks order: filled, next weeks order: filled, default delivery day: set to day with another filled order, and an alternateDeliveryDay day after', () => {
          test('should land on the next available delivery date after the default day and ADD day', () => {
            userOrders = Immutable.fromJS([
              {
                deliveryDate: '2016-03-02',
                recipeItems: ['lots', 'of', 'food'],
                deliverySlot: { id: '1' },
                whenCutoff: '2016-02-20',
              },
              {
                deliveryDate: '2016-03-05',
                recipeItems: ['lots', 'of', 'food'],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
              {
                deliveryDate: '2016-03-06',
                recipeItems: ['lots', 'of', 'food'],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
            ])
            dds['2016-03-05'].isDefault = true
            dds['2016-03-07'].alternateDeliveryDay = true
            deliveryDays = Immutable.fromJS(dds)
            state = Object.assign({}, state, {
              boxSummaryDeliveryDays: deliveryDays,
              user: Immutable.Map({ orders: userOrders }),
            })

            const result = getLandingDay(state)
            const expected = { date: '2016-03-08', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })

        describe('with last weeks order: cutoff, this weeks order: filled, next weeks order: filled, default delivery day: set to day with another filled order, and an alternateDeliveryDay day after', () => {
          test('should land on the first available delivery date', () => {
            userOrders = Immutable.fromJS([
              {
                deliveryDate: '2016-03-02',
                recipeItems: ['lots', 'of', 'food'],
                deliverySlot: { id: '1' },
                whenCutoff: '2016-02-20',
              },
              {
                deliveryDate: '2016-03-05',
                recipeItems: ['lots', 'of', 'food'],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
              {
                deliveryDate: '2016-03-10',
                recipeItems: ['lots', 'of', 'food'],
                deliverySlot: { id: '1' },
                whenCutoff: '2017-01-01',
              },
            ])
            dds['2016-03-05'].isDefault = true
            dds['2016-03-06'].alternateDeliveryDay = true
            dds['2016-03-07'].alternateDeliveryDay = true
            dds['2016-03-08'].alternateDeliveryDay = true
            dds['2016-03-09'].alternateDeliveryDay = true
            dds['2016-03-11'].alternateDeliveryDay = true
            dds['2016-03-12'].alternateDeliveryDay = true
            dds['2016-03-13'].alternateDeliveryDay = true
            dds['2016-03-14'].alternateDeliveryDay = true

            deliveryDays = Immutable.fromJS(dds)
            state = Object.assign({}, state, {
              boxSummaryDeliveryDays: deliveryDays,
              user: Immutable.Map({ orders: userOrders }),
            })

            const result = getLandingDay(state)
            const expected = { date: '2016-03-01', slotId: '123-123-123' }
            expect(result).toEqual(expected)
          })
        })
      })
    })
  })

  describe('cutoffDateTimeNow', () => {
    test('should return the current hour plus 2, rounded down to the hour', () => {
      const baseTime = new Date(Date.UTC(2013, 9, 23, 11, 9, 3)).getTime()
      const clock = sinon.useFakeTimers(baseTime)

      const result = cutoffDateTimeNow()

      expect(result).toBe('2013-10-23T13:00:00.000Z')

      clock.restore()
    })
  })

  describe('getAvailableDeliveryDays', () => {
    const days = [
      {
        id: 'day1',
        date: '2016-06-26',
        slots: [{ whenCutoff: '2016-07-01' }, { whenCutoff: '2016-07-05' }],
      },
      {
        id: 'day2',
        date: '2016-06-30',
        slots: [{ whenCutoff: '2016-07-03' }, { whenCutoff: '2016-07-08' }],
      },
    ]

    beforeEach(() => {
      sinon.useFakeTimers(new Date(2016, 5, 24).getTime())
    })

    test('should return a new object by day id, unfiltered when no cutoffDatetimeFrom is passed in', async () => {
      const result = getAvailableDeliveryDays(days)

      expect(result).toEqual({
        '2016-06-26': {
          id: 'day1',
          date: '2016-06-26',
          slots: [{ whenCutoff: '2016-07-01' }, { whenCutoff: '2016-07-05' }],
        },
        '2016-06-30': {
          id: 'day2',
          date: '2016-06-30',
          slots: [{ whenCutoff: '2016-07-03' }, { whenCutoff: '2016-07-08' }],
        },
      })
    })

    test('should filter the returned delivery day slots by the cutoffDatetimeFrom passed in', async () => {
      const result = getAvailableDeliveryDays(days, '2016-07-02')

      expect(result).toEqual({
        '2016-06-26': {
          id: 'day1',
          date: '2016-06-26',
          slots: [{ whenCutoff: '2016-07-05' }],
        },
        '2016-06-30': {
          id: 'day2',
          date: '2016-06-30',
          slots: [{ whenCutoff: '2016-07-03' }, { whenCutoff: '2016-07-08' }],
        },
      })
    })

    test('should not return delivery days with no slots when filtered', async () => {
      const result = getAvailableDeliveryDays(days, '2016-07-05')
      expect(result).toEqual({
        '2016-06-30': {
          id: 'day2',
          date: '2016-06-30',
          slots: [{ whenCutoff: '2016-07-08' }],
        },
      })
    })
  })

  describe('transformDaySlotLeadTimesToMockSlots', () => {

    // Arrange a minimal response from the delivery service days endpoint
    const daysFromDeliveryService = [
      {
        id: "98b901bc-0157-11e6-bbb4-080027089d5f",
        date: "2014-01-15",
        isDefault: false,
        coreDayId: "3",
        unavailableReason: "",
        alternateDeliveryDay: null,
        daySlotLeadTimes: [
          {
            id: "7bdd00f7-af72-41af-8444-a35f1467be49",
            dayId: "98b901bc-0157-11e6-bbb4-080027089d5f",
            slotId: "dafe3372-12d1-11e6-bee5-06ddb628bdc5",
            leadTime: 24,
            coreSlotId: "4",
            isSlotDefault: true,
            date: "2014-01-15",
            active: true,
            startTime: "18:00:00",
            endTime: "22:00:00",
            deliveryPrice: "2.99",
            shouldCutoffAt: "2014-01-14T11:59:59+00:00"
          },
          {
            id: "386932e5-71bd-4610-b9a4-baae4bc91be9",
            dayId: "98b901bc-0157-11e6-bbb4-080027089d5f",
            slotId: "dafa1c2e-12d1-11e6-b5f6-06ddb628bdc5",
            leadTime: 24,
            coreSlotId: "3",
            isSlotDefault: false,
            date: "2014-01-15",
            active: true,
            startTime: "08:00:00",
            endTime: "19:00:00",
            deliveryPrice: "0.00",
            shouldCutoffAt: "2014-01-14T11:59:59+00:00"
          }
        ]
      }
    ]

    test('should transform a dslt response to a mock slot', () => {

      const transformedMockSlot = transformDaySlotLeadTimesToMockSlots(daysFromDeliveryService)

      const expectedMockSlot = [
        {
          id: "98b901bc-0157-11e6-bbb4-080027089d5f",
          date: "2014-01-15",
          isDefault: false,
          coreDayId: "3",
          unavailableReason: "",
          alternateDeliveryDay: null,
          slots: [
            {
              whenCutoff: "2014-01-14T11:59:59+00:00",
              deliveryEndTime: "22:00:00",
              deliveryPrice: "2.99",
              isDefault: true,
              coreSlotId: "4",
              deliveryStartTime: "18:00:00",
              id: "dafe3372-12d1-11e6-bee5-06ddb628bdc5",
              daySlotLeadTimeId: "7bdd00f7-af72-41af-8444-a35f1467be49"
            },
            {
              whenCutoff: "2014-01-14T11:59:59+00:00",
              deliveryEndTime: "19:00:00",
              deliveryPrice: "0.00",
              isDefault: false,
              coreSlotId: "3",
              deliveryStartTime: "08:00:00",
              id: "dafa1c2e-12d1-11e6-b5f6-06ddb628bdc5",
              daySlotLeadTimeId: "386932e5-71bd-4610-b9a4-baae4bc91be9",
            }
          ]
        },
      ]

      expect(transformedMockSlot).toContainEqual(expectedMockSlot[0])
      expect(transformedMockSlot).toHaveLength(1)
      expect(transformedMockSlot[0].slots).toHaveLength(2)
    })

    test('should throw a GoustoException when no days with DSLTs passed', () => {
      expect(() => transformDaySlotLeadTimesToMockSlots()).toThrow(GoustoException)
    })

    test('should throw a GoustoException when no days with DSLTs passed', () => {
      expect(() => transformDaySlotLeadTimesToMockSlots(new Error('Is broke'))).toThrow(GoustoException)
    })
  })

  describe('getDeliveryTariffId', () => {
    const getUser = (deliveryTariffId) => {
      return {
        delivery_tariff_id: deliveryTariffId,
      }
    }

    test('it should return a user\'s existing tariff ID', () => {
      const expectedTariff = DeliveryTariffTypes.PAID_NDD

      const resolvedTariff = getDeliveryTariffId(getUser(expectedTariff), DeliveryTariffTypes.FREE_NDD)
      expect(resolvedTariff).toEqual(expectedTariff)
    })

    test('it should return the experiment tariff without a user', () => {
      const expectedTariff = DeliveryTariffTypes.NON_NDD

      const resolvedTariff = getDeliveryTariffId(null, expectedTariff)
      expect(resolvedTariff).toEqual(expectedTariff)
    })
  })

  describe('getNDDFeatureFlagVal', () => {
    const getUser = (deliveryTariffId) => {
      return {
        delivery_tariff_id: deliveryTariffId,
      }
    }

    const nddTariffs = [
      DeliveryTariffTypes.PAID_NDD,
      DeliveryTariffTypes.FREE_NDD,
    ]

    test('it should return true when user is already set to a free NDD tariff.', () => {
      const user = getUser(DeliveryTariffTypes.FREE_NDD)

      const resolvedFeatureFlagValue = getNDDFeatureFlagVal(user, DeliveryTariffTypes.NON_NDD)

      expect(resolvedFeatureFlagValue).toEqual(true)
    })

    test('it should return true when user is already set to a paid NDD tariff.', () => {
      const user = getUser(DeliveryTariffTypes.PAID_NDD)

      const resolvedFeatureFlagValue = getNDDFeatureFlagVal(user, DeliveryTariffTypes.NON_NDD)

      expect(resolvedFeatureFlagValue).toEqual(true)
    })

    test('it should return true when a new user is in the experiment.', () => {
      const experimentValue = nddTariffs[Math.floor(Math.random() * nddTariffs.length)]

      const resolvedFeatureFlagValue = getNDDFeatureFlagVal(null, experimentValue)

      expect(resolvedFeatureFlagValue).toEqual(true)
    })

    test('it should return false when a new user is not in the experiment.', () => {
      const resolvedFeatureFlagValue = getNDDFeatureFlagVal(null, DeliveryTariffTypes.NON_NDD)

      expect(resolvedFeatureFlagValue).toEqual(false)
    })

    test('it should return false when an existing user is not in the experiment.', () => {
      const user = getUser(DeliveryTariffTypes.NON_NDD)

      const resolvedFeatureFlagValue = getNDDFeatureFlagVal(user, DeliveryTariffTypes.FREE_NDD)

      expect(resolvedFeatureFlagValue).toEqual(false)
    })
  })
})
