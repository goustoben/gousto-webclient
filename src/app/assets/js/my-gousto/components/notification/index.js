const React = require('react')
const moment = require('moment')
const Gousto = require('@fe/gousto-generic')
const CONFIG = require('@fe/gousto-config')
const WIDGET_CONFIG = CONFIG.MY_GOUSTO.WIDGETS.NOTIFICATION
const NotificationPanel = require('./NotificationPanel')
const windowUtils = require('../../../utils/windowUtils')

const Notification = React.createClass({

	getInitialState: function() { return { notifications: [] } },

	componentDidMount: function() {
		const userPayment = Gousto.ajaxPromise(WIDGET_CONFIG.ROUTES.API.PAYMENT, 'GET', {}, true);
		const userOrdersCall = Gousto.ajaxPromise(WIDGET_CONFIG.ROUTES.API.USER_ORDERS, 'GET', { limit: 5, sort_order: 'desc' });

		Promise.all([userPayment, userOrdersCall])
		.then(data => { this.setState({ notifications: this.loadNotifications(data) }) })
	},

	componentWillUnmount: function() { this.ignoreFetch = true },

	loadNotifications: function(data) {
		const [payment, userOrders] = data
		const now = moment()

		let notifications = []
		try {
			notifications = notifications.concat(this.checkCardExpiryDate(payment, now))
			notifications = notifications.concat(this.checkAmendedDeliveryDate(userOrders))
			if (notifications.length < 2) {
				notifications = notifications.concat(this.checkOrderAwaitingSelection(userOrders, now))
			}
		} catch (err) {
			if (windowUtils.isDev()) {
				console.log(err.message)
			}
		}

		return notifications
	},

	checkCardExpiryDate: function(payment, now) {
		const card = payment.method.card
		const expiryDate = moment(card.expiry_month + '-' + card.expiry_year, 'M-YY').endOf('month')

		if (now.isBefore(expiryDate) && expiryDate.diff(now, 'days') <= 30) {
			return [WIDGET_CONFIG.MESSAGES.CARD.TOEXPIRE]
		} else if (now.isSameOrAfter(expiryDate)) {
			return [WIDGET_CONFIG.MESSAGES.CARD.EXPIRED]
		}

		return []
	},

	checkAmendedDeliveryDate: function(userOrders) {
		const alternateDeliveryDays = userOrders.filter(order => order.state === 'pending' && order.original_delivery_day)

		return alternateDeliveryDays.length > 0 ? [WIDGET_CONFIG.MESSAGES.AMENDDELIVERY] : []
	},

	checkOrderAwaitingSelection: function(userOrders, now) {
		const notifications = userOrders.filter(order => order.state === 'pending' && order.default === '1')
		.filter(order => moment(order.when_cutoff).isSame(now, 'day'))

		if (notifications.length > 1 && now.isBefore(moment().hours(12))) {
			const message = WIDGET_CONFIG.MESSAGES.ORDER
			message.url += `/${notifications[0].id}`

			return [message]
		}

		return []
	},

	render: function() {
		const notifications = this.state.notifications

		return (
			<div className={notifications.length === 0 ? 'hide' : ''}>
				{notifications.map((notification, index) => (
					<NotificationPanel
						key={index}
						url={notification.url}
						title={notification.title}
						message={notification.message}
						type={notification.type}
					/>
				))}
			</div>
		)
	},
})

module.exports = Notification
