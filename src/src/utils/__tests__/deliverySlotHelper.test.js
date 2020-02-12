
import Immutable from 'immutable'
import { addDisabledSlotIds, formatAndValidateDisabledSlots, getDeliveryDaysAndSlots } from '../deliverySlotHelper'

describe('Delivery Slot Helper', () => {
  let deliveryDays

  beforeEach(() => {
    deliveryDays = Immutable.fromJS({
      aaa: {
        date: "2019-03-03",
        id: "testId",
        slots: [
          {
            deliveryStartTime: "18:00:00",
            deliveryEndTime: "22:00:00",
            id: "testSlotId1",
            disabledSlotId: '2019-03-03_18-22'
          },
          {
            deliveryStartTime: "08:00:00",
            deliveryEndTime: "12:00:00",
            id: "testSlotId2",
            disabledSlotId: '2019-03-03_08-12'
          },
          {
            deliveryStartTime: "08:00:00",
            deliveryEndTime: "19:00:00",
            id: "testSlotId3",
            disabledSlotId: '2019-03-03_08-19'
          }
        ]
      }
    })
  })

  test('should return a map of deliveryDays where each slot has a disabledSlotId property', () => {
    const result = addDisabledSlotIds(deliveryDays)
    const slots = result.get('aaa').get('slots')

    expect(slots.get(0).get('disabledSlotId')).toEqual('2019-03-03_18-22')
    expect(slots.get(1).get('disabledSlotId')).toEqual('2019-03-03_08-12')
    expect(slots.get(2).get('disabledSlotId')).toEqual('2019-03-03_08-19')
  })

  test('should return an empty disabledSlotId when slotStartTime is missing', () => {
    deliveryDays = Immutable.fromJS({
      aaa: {
        date: "2019-03-03",
        id: "testId",
        slots: [
          {
            deliveryStartTime: "18:00:00",
            id: "testSlotId1",
            disabledSlotId: '2019-03-03_18-22'
          },
          {
            deliveryEndTime: "12:00:00",
            id: "testSlotId2",
            disabledSlotId: '2019-03-03_08-12'
          }
        ]
      }
    })
    const result = addDisabledSlotIds(deliveryDays)
    const slots = result.get('aaa').get('slots')

    expect(slots.get(0).get('disabledSlotId')).toEqual('')
    expect(slots.get(1).get('disabledSlotId')).toEqual('')
  })

  describe('getDeliveryDaysAndSlots', () => {
    let props
    const dateToCheck = '2019-03-03'
    beforeEach(() => {
      props = {
        disabledSlots: ['2019-03-03_08-19', '2019-02-04_08-12'],
        isAuthenticated: true,
        isSubscriptionActive: 'inactive',
        tempDate: '2019-03-03',
        userOrders: Immutable.Map(),
        tempSlotId: '',
        deliveryDaysProps: Immutable.List([
          Immutable.Map({
            date: "2019-03-03",
            id: "djhdhds",
            slots: Immutable.List([
              Immutable.Map({
                deliveryStartTime: "08:00:00",
                deliveryEndTime: "19:00:00",
                id: "123sddrdfst456",
                disabledSlotId: '2019-03-03_08-19'
              }),
              Immutable.Map({
                deliveryStartTime: "18:00:00",
                deliveryEndTime: "22:00:00",
                id: "987sddrdfst456",
                disabledSlotId: '2019-03-03_18-22'
              })
            ])
          })
        ])
      }
    })

    describe('when slot is in disabled list', () => {
      test('should return a disabled slot, user logged in and subscription paused', () => {
        const result = getDeliveryDaysAndSlots(dateToCheck, props)
        const slotToCheck = result.slots[dateToCheck][0]
        expect(slotToCheck.disabled).toEqual(true)
      })

      describe('when user subscription is active', () => {
        let result
        beforeEach(() => {
          const newProps = { ...props, isSubscriptionActive: 'active' }
          result = getDeliveryDaysAndSlots(dateToCheck, newProps)
        })

        test('should NOT return a disabled slot', () => {
          const slotToCheck = result.slots[dateToCheck][0]
          expect(slotToCheck.disabled).toEqual(false)
        })
      })

      describe('when user logged out', () => {
        let result
        beforeEach(() => {
          const newProps = { ...props, isAuthenticated: false }
          result = getDeliveryDaysAndSlots(dateToCheck, newProps)
        })

        test('should NOT return a disabled slot but user NOT logged in', () => {
          const slotToCheck = result.slots[dateToCheck][0]
          expect(slotToCheck.disabled).toEqual(false)
        })
      })
    })
    describe('when slot is NOT in disabled list', () => {
      test('should NOT return a disabled slot', () => {
        const result = getDeliveryDaysAndSlots(dateToCheck, props)
        const slotToCheck = result.slots[dateToCheck][1]
        expect(slotToCheck.disabled).toEqual(false)
      })

      describe('when user has order with recipes', () => {
        let result
        beforeEach(() => {
          const newProps = {
            ...props,
            userOrders: Immutable.fromJS({
              1234: {
                id: '1234',
                deliveryDate: '2019-03-03',
                recipeItems: [{
                  id: 1,
                },
                {
                  id: 2,
                }]
              }
            }),
          }
          result = getDeliveryDaysAndSlots(dateToCheck, newProps)
        })
        test('should return icon full-box', () => {
          expect(result.deliveryDays[0].icon).toEqual('full-box')
        })
      })

      describe('when user has order with no recipes', () => {
        let result
        beforeEach(() => {
          const newProps = {
            ...props,
            userOrders: Immutable.fromJS({
              1234: {
                id: '1234',
                deliveryDate: '2019-03-03',
                recipeItems: []
              }
            }),
          }
          result = getDeliveryDaysAndSlots(dateToCheck, newProps)
        })
        test('should return icon full-box', () => {
          expect(result.deliveryDays[0].icon).toEqual('empty-box')
        })
      })
    })
  })
})

describe('Format and validate Disabled Slots', () => {
  test('should return all valid disabled slots', () => {
    const validDisabledSlots = '2019-02-02_08-19,2019-02-02_08-22, 2019-02-02_18-22'
    const validDisabledSlotsArray = ['2019-02-02_08-19', '2019-02-02_08-22', '2019-02-02_18-22']
    const result = formatAndValidateDisabledSlots(validDisabledSlots)

    expect(result).toEqual(validDisabledSlotsArray)
  })

  test('should filter out all invalid disabled slots', () => {
    const validDisabledSlots = '2019-02-02_08-19,2019-02-02_08-22, 2019-02-02_18-22'
    const validDisabledSlotsArray = ['2019-02-02_08-19', '2019-02-02_08-22', '2019-02-02_18-22']
    const invalidDisabledSlots = 'slot,2019-02-02,02-02-2019_00-00, 2019-02-02_00_00, 2019-02-02-00-00'
    const result = formatAndValidateDisabledSlots(validDisabledSlots + ',' + invalidDisabledSlots)

    expect(result).toEqual(validDisabledSlotsArray)
  })

  test('should return empty Array if nothing passed in', () => {
    const result = formatAndValidateDisabledSlots()

    expect(result).toEqual([])
  })
})
