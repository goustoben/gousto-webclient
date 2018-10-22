import Immutable from 'immutable'
import cutoff from 'routes/Menu/selectors/cutoff.js'
import { cutoffDateTimeNow } from 'utils/deliveries.js'

describe('cutoff', () => {
	let state
	describe('getPreviousCutoffDate', () => {
		test('previousCutoffDate is undefined in browse mode', () => {
			state = {
				basket: Immutable.fromJS({
					date: '',
					prevDate: '',
					slotId: '',
					prevSlotId: '',
				}),
				boxSummaryDeliveryDays: {},
			}

			expect(cutoff.getPreviousCutoffDate(state)).toEqual(undefined)
		})

		test('previousCutoffDate is returned', () => {
			state = {
				basket: Immutable.fromJS({
					date: '2018-07-13',
					prevDate: '2018-07-12',
					slotId: 'db015db8-12d1-11e6-b30b-06ddb628bdc5',
					prevSlotId: '3ba3cfaa-06da-47a7-bdf9-3074f79a2324',
				}),
				boxSummaryDeliveryDays: Immutable.fromJS({
					'2018-07-13': {
						id: '83228a25-0808-414e-8c0c-11717744d1a4',
						date: '2018-06-29',
						slots: [
							{
								whenCutoff: '2018-06-29T11:59:59+01:00',
								id: 'db015db8-12d1-11e6-b30b-06ddb628bdc5',
								dayId: '83228a25-0808-414e-8c0c-11717744d1a4',
								cutoffDay: 2,
								isDefault: true,
							},
						],
					},
					'2018-07-12': {
						id: '3ba3cfaa-06da-47a7-bdf9-3074f79a2324',
						date: '2018-07-12',
						slots: [
							{
								whenCutoff: '2018-07-09T11:59:59+01:00',
								id: '3ba3cfaa-06da-47a7-bdf9-3074f79a2324',
								dayId: '3ba3cfaa-06da-47a7-bdf9-3074f79a2324',
								cutoffDay: 1,
								isDefault: false,
							},
						],
					},
				}),
			}

			expect(cutoff.getPreviousCutoffDate(state)).toEqual('2018-07-09T11:59:59+01:00')

		})
	})

	describe('getCutoffDate', () => {
		test('getting cutoff date when menu date selected and user is not Admin', () => {
			const whenCutoffDate = '2018-06-29T11:59:59+01:00'

			state = {
				auth: Immutable.Map({
					isAdmin: false,
				}),
				basket: Immutable.fromJS({
					date: '2018-07-13',
					prevDate: '',
					slotId: 'db015db8',
					prevSlotId: '',
				}),
				boxSummaryDeliveryDays: Immutable.fromJS({
					'2018-07-13': {
						id: '83228a25',
						date: '2018-06-29',
						slots: [
							{
								whenCutoff: whenCutoffDate,
								id: 'db015db8',
								dayId: '83228a25',
								cutoffDay: 2,
								isDefault: true,
							},
						],
					},
				}),
				menuCutoffUntil: '2018-07-10T11:59:59+01:00',
				temp: Immutable.Map({}),
			}

			expect(cutoff.getCutoffDate(state)).toBe(whenCutoffDate)
		})

		test('getting cutoff date when user is Admin', () => {
			const menuCutoffUntilDate = '2018-07-10T11:59:59+01:00'

			state = {
				auth: Immutable.Map({
					isAdmin: true,
				}),
				basket: Immutable.fromJS({
					date: '2018-07-13',
					prevDate: '',
					slotId: 'db015db8',
					prevSlotId: '',
				}),
				boxSummaryDeliveryDays: Immutable.fromJS({
					'2018-07-13': {
						id: '83228a25',
						date: '2018-06-29',
						slots: [
							{
								whenCutoff: '2018-06-29T11:59:59+01:00',
								id: 'db015db8',
								dayId: '83228a25',
								cutoffDay: 2,
								isDefault: true,
							},
						],
					},
				}),
				menuCutoffUntil: menuCutoffUntilDate,
				temp: Immutable.Map({}),
			}

			expect(cutoff.getCutoffDate(state)).toBe(menuCutoffUntilDate)
		})

		test('getting cutoff date on browse mode', () => {
			const menuCutoffUntilDate = '2018-07-10T11:59:59+01:00'

			state = {
				auth: Immutable.Map({
					isAdmin: false,
				}),
				basket: Immutable.fromJS({
					date: '',
					prevDate: '',
					slotId: '',
					prevSlotId: '',
				}),
				boxSummaryDeliveryDays: Immutable.Map({}),
				menuCutoffUntil: menuCutoffUntilDate,
				temp: Immutable.Map({}),
			}

			expect(cutoff.getCutoffDate(state)).toBe(menuCutoffUntilDate)
		})

		test('getting cutoff date on browse mode', () => {
			state = {
				auth: Immutable.Map({
					isAdmin: false,
				}),
				basket: Immutable.fromJS({
					date: '',
					prevDate: '',
					slotId: '',
					prevSlotId: '',
				}),
				boxSummaryDeliveryDays: Immutable.Map({}),
				menuCutoffUntil: '',
				temp: Immutable.Map({}),
			}

			expect(cutoff.getCutoffDate(state)).toBe(cutoffDateTimeNow())
		})
	})
})
