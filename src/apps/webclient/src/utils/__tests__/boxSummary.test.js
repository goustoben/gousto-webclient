import { getCurrentBoxSummaryView } from 'utils/boxSummary'
import Immutable from 'immutable'

describe('utils/boxSummary', () => {
  describe('getCurrentBoxSummaryView', () => {
    let state
    beforeEach(() => {
      state = {
        basket: Immutable.fromJS({
          postcode: 'w3',
          postcodePending: false,
          slotId: '123-uuid',
        }),
        boxSummaryDeliveryDaysErr: false,
        menuReceiveMenuPending: false,
        menuReceiveBoxPricesPending: false,
        pending: Immutable.Map({}),
      }
    })

    describe('with no postcode', () => {
      beforeEach(() => {
        state = {
          basket: Immutable.fromJS({
            postcode: '',
            postcodePending: false,
            slotId: '123-uuid',
          }),
          error: Immutable.Map({}),
          menuReceiveMenuPending: false,
          menuReceiveBoxPricesPending: false,
          pending: Immutable.Map({}),
        }
      })

      test('should return POSTCODE', () => {
        const result = getCurrentBoxSummaryView(state)
        expect(result).toEqual('POSTCODE')
      })
    })

    describe('with a postcode but no slotId', () => {
      beforeEach(() => {
        state = {
          basket: Immutable.fromJS({
            postcode: 'w3',
            postcodePending: false,
            slotId: '',
          }),
          error: Immutable.Map({}),
          menuReceiveMenuPending: false,
          menuReceiveBoxPricesPending: false,
          pending: Immutable.Map({}),
        }
      })

      test('should return DELIVERY_SLOT', () => {
        const result = getCurrentBoxSummaryView(state)
        expect(result).toEqual('DELIVERY_SLOT')
      })
    })

    describe('with a postcode and a slotId', () => {
      beforeEach(() => {
        state = {
          basket: Immutable.fromJS({
            postcode: 'w3',
            postcodePending: false,
            slotId: '123-uuid',
          }),
          error: Immutable.Map({}),
          menuReceiveMenuPending: false,
          menuReceiveBoxPricesPending: false,
          pending: Immutable.Map({}),
        }
      })

      test('should return DETAILS', () => {
        const result = getCurrentBoxSummaryView(state)
        expect(result).toEqual('DETAILS')
      })
    })

    describe('with MENU_FETCH_DATA pending', () => {
      beforeEach(() => {
        state = {
          basket: Immutable.fromJS({
            postcode: 'w3',
            postcodePending: false,
            slotId: '123-uuid',
          }),
          error: Immutable.Map({}),
          menuReceiveMenuPending: false,
          menuReceiveBoxPricesPending: false,
          pending: Immutable.Map({
            MENU_FETCH_DATA: true,
          }),
        }
      })
      test('should return DELIVERY_SLOT', () => {
        const result = getCurrentBoxSummaryView(state)
        expect(result).toEqual('DELIVERY_SLOT')
      })
    })
  })
})
