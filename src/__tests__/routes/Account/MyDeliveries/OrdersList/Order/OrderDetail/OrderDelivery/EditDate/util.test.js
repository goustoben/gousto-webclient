import Immutable from 'immutable'
import { filterOutNDDOptionsWhenNoRecipes } from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderDelivery/OrderDeliveryDate/EditDate/util'

describe('util', () => {
  describe('filterOutNDDOptionsWhenNoRecipes', () => {
    const availableDeliveryDays = Immutable.fromJS(
      {
        '2019-12-28': {
          id: 'd71f9dea-7d6d-4419-b595-dddd3153b718',
          date: '2019-12-28',
          slots: [{
            id: 'd9dc1bf7-f6fc-4163-8df0-3f9701c418d9',
            day_slot_lead_time_is_express: false,
          },
          {
            id: '950007a3-2ceb-41dc-b184-01997628d2b6',
            day_slot_lead_time_is_express: false,
          }
          ],
        },
        '2019-12-29': {
          id: '03bf5450-740f-4b9d-8c02-5c8a79f38259',
          date: '2019-12-29',
          slots: [{
            id: '8f685f7a-6100-4861-a3b0-fa308270f6d0',
            day_slot_lead_time_is_express: true,
          },
          {
            id: '9e0a710d-a70e-41cd-9c2b-86a228aadb24',
            day_slot_lead_time_is_express: true,
          }
          ],
        },
        '2019-12-30': {
          id: '9957765e-becb-436d-8616-a366ffdcdcd6',
          date: '2019-12-30',
          slots: [{
            id: '5e016842-91c9-4558-bc1b-3b2c459e97ab',
            day_slot_lead_time_is_express: true,
          },
          {
            id: '5e016842-91c9-4558-bc1b-3b2c459e97ab',
            day_slot_lead_time_is_express: false,
          }
          ],
        },
      })

    const stateNDDTrue = {
      features: Immutable.fromJS({
        ndd: {
          value: true,
          experiment: true,
        }
      })
    }

    it('should filter out ndd days when order has no recipes', () => {
      const order = Immutable.fromJS({
        id: 12996845,
      })

      const result = filterOutNDDOptionsWhenNoRecipes(stateNDDTrue, availableDeliveryDays, order)

      expect(result.count()).toEqual(2)

      const expectedFirstDay = availableDeliveryDays.get('2019-12-28')
      expect(result.first()).toEqual(expectedFirstDay)

      const expectedSecondDay = result.get('2019-12-30')
      expect(expectedSecondDay.get('id')).toEqual('9957765e-becb-436d-8616-a366ffdcdcd6')
      expect(expectedSecondDay.get('slots').count()).toEqual(1)
    })

    it('should not filter days when recipes are chosen and NDD is true', () => {
      const order = Immutable.fromJS({
        id: 12996845,
        recipes:
          [
            {id: '10763778'},
            {id: '20763779'},
            {id: '30763780'},
          ],
      })

      const result = filterOutNDDOptionsWhenNoRecipes(stateNDDTrue, availableDeliveryDays, order)
      expect(result.count()).toEqual(3)
      expect(result).toEqual(availableDeliveryDays)
    })

    it('should not filter when no express day slot lead times', () => {
      const availableDeliveryDays = Immutable.fromJS(
        {
          '2019-12-28': {
            id: 'd71f9dea-7d6d-4419-b595-dddd3153b718',
            date: '2019-12-28',
            slots: [{
              id: 'd9dc1bf7-f6fc-4163-8df0-3f9701c418d9',
              day_slot_lead_time_is_express: false,
            },
            {
              id: '950007a3-2ceb-41dc-b184-01997628d2b6',
              day_slot_lead_time_is_express: false,
            }
            ],
          },
          '2019-12-29': {
            id: '03bf5450-740f-4b9d-8c02-5c8a79f38259',
            date: '2019-12-29',
            slots: [{
              id: '8f685f7a-6100-4861-a3b0-fa308270f6d0',
              day_slot_lead_time_is_express: false,
            },
            {
              id: '9e0a710d-a70e-41cd-9c2b-86a228aadb24',
              day_slot_lead_time_is_express: false,
            }
            ],
          },
        })

      const order = Immutable.fromJS({
        id: 12996845,
      })

      const result = filterOutNDDOptionsWhenNoRecipes(stateNDDTrue, availableDeliveryDays, order)
      expect(result.count()).toEqual(2)
      expect(result).toEqual(availableDeliveryDays)
    })
  })
})
