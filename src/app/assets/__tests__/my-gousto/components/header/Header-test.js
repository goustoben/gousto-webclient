

const React = require('react')
const ReactDOMServer = require('react-dom/server')
const Enzyme = require('enzyme')

const moment = require('moment')
let shallowRenderer

const Header = require('../../../../js/my-gousto/components/header/Header')

describe('Header', function() {
	beforeEach(function() {
		shallowRenderer = Enzyme.shallow
	})

	it('should return a <div>', function() {
		const result = shallowRenderer(<Header />)


		expect(result.type()).toBe('div')
	})

	it('formatDeliveryDate should return a link to TWR if no upcoming order found', function() {
		let order = null
		let header = shallowRenderer(<Header />).instance()
		let html = ReactDOMServer.renderToStaticMarkup(header.formatDeliveryDate(order, moment('2016-03-24')))

		expect(html.indexOf('This Weeks Menu')).not.toEqual(-1)
	})

	it('formatDeliveryDate should return the upcoming order details', function() {
		let order = {
			"delivery_date": "2016-03-26 00:00:00",
			"delivery_slot": {
				"cutoff_time": "11:59:59",
				"delivery_start": "08:00:00",
				"delivery_end": "18:59:59",
			}
		}
		let header = shallowRenderer(<Header />).instance()
		let html = ReactDOMServer.renderToStaticMarkup(header.formatDeliveryDate(order, moment('2016-03-24')))

		expect(html.indexOf('26th March')).not.toEqual(-1)
	})

	it('formatDeliveryDate should return the upcoming order details and say today if delivery is today', function() {
		let order = {
			"delivery_date": "2016-03-26 00:00:00",
			"delivery_slot": {
				"cutoff_time": "11:59:59",
				"delivery_start": "08:00:00",
				"delivery_end": "18:59:59",
			}
		}
		let header = shallowRenderer(<Header />).instance()
		let html = ReactDOMServer.renderToStaticMarkup(header.formatDeliveryDate(order, moment('2016-03-26')))

		expect(html.indexOf('today')).not.toEqual(-1)
	})
})
