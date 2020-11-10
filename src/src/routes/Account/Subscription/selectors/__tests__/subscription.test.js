import Immutable from 'immutable'
import { getDeliveryDays, getUserFullName } from '../subscription'

describe('getDeliveryDays', () => {
  describe('Given delivery data has loaded', () => {
    const boxSummaryDeliveryDays = Immutable.fromJS({
      '2020-05-03': {
        id: '58ecf7d5-8e57-42a0-b5e5-24a82262ffd0',
        date: '2020-05-03',
        slots: [
          {
            id: '6cadeebc-9ada-11e6-b24b-062a27f88e45',
            defaultDay: 0,
            core_slot_id: '13',
            deliveryStartTime: '08:00:00',
            deliveryEndTime: '19:00:00',
            is_default: true,
            when_cutoff: '2020-04-30T11:59:59+01:00'
          }
        ],
      },
    })

    const user = Immutable.fromJS({
      nameFirst: 'Gousto',
      nameLast: 'User',
    })

    describe('when the getDeliveryDays function is called', () => {
      let deliveryDays

      beforeEach(() => {
        deliveryDays = getDeliveryDays({ boxSummaryDeliveryDays })
      })

      test('then the correct data format should be returned', () => {
        expect(deliveryDays).toEqual([
          {
            day: 0,
            deliveryEndTime: '19:00:00',
            deliveryStartTime: '08:00:00',
            id: '6cadeebc-9ada-11e6-b24b-062a27f88e45',
          }
        ])
      })
    })

    describe('when the getUserFullName function is called', () => {
      let userFullName

      beforeEach(() => {
        userFullName = getUserFullName({ user })
      })

      test('then the correct data format should be returned', () => {
        expect(userFullName).toEqual('Gousto User')
      })
    })
  })
})
