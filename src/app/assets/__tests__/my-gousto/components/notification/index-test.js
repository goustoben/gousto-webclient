const moment = require('moment')
const CONFIG = require('@fe/gousto-config')
const Enzyme = require('enzyme')
const WIDGET_CONFIG = CONFIG.MY_GOUSTO.WIDGETS.NOTIFICATION
const Notification = require('../../../../js/my-gousto/components/notification')

describe('Notification', () => {
	describe('checkCardExpiryDate', () => {
		let notification
		beforeEach(() => {
			notification = Enzyme.shallow(<Notification />).instance()
		})

		it('should not return any notification if the payment card is not expired', () => {
			const payment = {
				method: {
					card: {
						expiry_month: '4',
						expiry_year: '20',
					},
				},
			}
			const date = moment('01-03-2020', 'DD-MM-YYYY')
			const messages = notification.checkCardExpiryDate(payment, date)
			expect(messages.length).toEqual(0)
		})

		it('should return warning notification if the payment card is expired', () => {
			const payment = { method: { card: {
				expiry_month: '4',
				expiry_year: '20',
			} } }
			const date = moment('01-05-2020', 'DD-MM-YYYY')
			const messages = notification.checkCardExpiryDate(payment, date)
			expect(messages.length).toEqual(1)
			expect(messages[0]).toEqual(WIDGET_CONFIG.MESSAGES.CARD.EXPIRED)
		})

		it('should return warning notification if the payment card about to expire in the next 30 days', () => {
			const payment = { method: { card: {
				expiry_month: '2',
				expiry_year: '20',
			} } }
			const date = moment('30-01-2020', 'DD-MM-YYYY')
			const messages = notification.checkCardExpiryDate(payment, date)
			expect(messages.length).toEqual(1)
			expect(messages[0]).toEqual(WIDGET_CONFIG.MESSAGES.CARD.TOEXPIRE)
		})

		it('should not return warning notification if the payment card about to expire in the next 31 days', () => {
			const payment = { method: { card: {
				expiry_month: '2',
				expiry_year: '20',
			} } }
			const date = moment('29-01-2020', 'DD-MM-YYYY')
			const messages = notification.checkCardExpiryDate(payment, date)
			expect(messages.length).toEqual(0)
		})
	})

	describe('checkAmendedDeliveryDate', () => {
		let notification
		beforeEach(() => {
			notification = Enzyme.shallow(<Notification />).instance()
		})

		it('should return notification if the user order has same delivery date as amended delivery day', () => {
			const userOrders = [
				{
					id: '1',
					default: '1',
					state: 'pending',
					delivery_date: '2016-05-04',
					original_delivery_day: '2016-05-04',
				},
				{
					id: '2',
					default: '1',
					state: 'pending',
					delivery_date: '2016-05-04',
					original_delivery_day: '2016-05-04',
				},
			]
			const messages = notification.checkAmendedDeliveryDate(userOrders)
			expect(messages.length).toEqual(1)
			expect(messages[0]).toEqual(WIDGET_CONFIG.MESSAGES.AMENDDELIVERY)
		})

		it('should not return notification if there are not alternate delivery_date', () => {
			const userOrders = [
				{
					id: '1',
					default: '1',
					state: 'pending',
					delivery_date: '2016-05-04',
					original_delivery_day: null,
				},
				{
					id: '2',
					default: '1',
					state: 'pending',
					delivery_date: '2016-05-04',
					original_delivery_day: null,
				},
			]
			const messages = notification.checkAmendedDeliveryDate(userOrders)
			expect(messages.length).toEqual(0)
		})
	})

	describe('checkOrderAwaitingSelection', () => {
		let notification
		beforeEach(() => {
			notification = Enzyme.shallow(<Notification />).instance()
		})

		it('should return notification if user has pending order in the TWR', () => {
			const userOrders = [
				{
					id: '1',
					default: '1',
					state: 'pending',
					is_current_period: true,
					period_id: 2,
					delivery_date: '2016-05-04',
					when_cutoff: '2016-05-04 11:59:59',
				},
				{
					id: '2',
					default: '1',
					state: 'pending',
					is_current_period: true,
					period_id: 2,
					delivery_date: '2016-05-04',
					when_cutoff: '2016-05-04 11:59:59',
				},
			]
			const now = moment('2016-05-04 11:00:00')
			const messages = notification.checkOrderAwaitingSelection(userOrders, now)
			expect(messages.length).toEqual(1)
			expect(messages[0]).toEqual(WIDGET_CONFIG.MESSAGES.ORDER)
		})

		it('should not return twr notification when twr orders are committed', () => {
			const userOrders = [
				{
					id: '1',
					default: '1',
					state: 'committed',
					is_current_period: true,
					period_id: 1,
					delivery_date: '2016-05-04',
					when_cutoff: '2016-05-04 11:59:59',
				},
				{
					id: '1',
					default: '1',
					state: 'committed',
					is_current_period: false,
					period_id: 2,
					delivery_date: '2016-05-04',
					when_cutoff: '2016-05-04 11:59:59',
				},
			]
			const now = moment('2016-05-04 11:00:00')
			const messages = notification.checkOrderAwaitingSelection(userOrders, now)
			expect(messages.length).toEqual(0)
		})

		it('should not return notification if there are no orders awaiting selection', () => {
			const userOrders = [
				{
					id: '1',
					default: '1',
					state: 'committed',
					is_current_period: true,
					period_id: 1,
					delivery_date: '2016-05-04',
					when_cutoff: '2016-05-04 11:59:59',
				},
				{
					id: '1',
					default: '0',
					state: 'pending',
					is_current_period: false,
					period_id: 2,
					delivery_date: '2016-05-04',
					when_cutoff: '2016-05-04 11:59:59',
				},
			]
			const now = moment('2016-05-04 11:00:00')
			const messages = notification.checkOrderAwaitingSelection(userOrders, now)
			expect(messages.length).toEqual(0)
		})

		it('should not return notification if it is past cutoff', () => {
			const userOrders = [
				{
					id: '1',
					default: '1',
					state: 'committed',
					is_current_period: true,
					period_id: 1,
					delivery_date: '2016-05-04',
					when_cutoff: '2016-05-04 11:59:59',
				},
				{
					id: '1',
					default: '0',
					state: 'pending',
					is_current_period: false,
					period_id: 2,
					delivery_date: '2016-05-04',
					when_cutoff: '2016-05-04 11:59:59',
				},
			]
			const now = moment('2016-05-04 13:00:00')
			const messages = notification.checkOrderAwaitingSelection(userOrders, now)
			expect(messages.length).toEqual(0)
		})
	})
})
