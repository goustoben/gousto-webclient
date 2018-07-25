

const React = require('react')
const Enzyme = require('enzyme')

const moment = require('moment')
let shallowRenderer

const HeaderIndex = require('../../../../js/my-gousto/components/header')
const Header = require('../../../../js/my-gousto/components/header/Header')

describe('HeaderIndex', function() {
	beforeEach(function() {
		shallowRenderer = Enzyme.shallow
	})

	it('should return a <Header>', function() {
		const result = shallowRenderer(<HeaderIndex />)


		expect(result.find(Header).length).toBe(1)
	})

	it('findNextOrderId should return null when there is no next order', function() {
		let orders = [
			{
				"delivery_date": moment().subtract(2, 'days').format('YYYY-MM-DD 00:00:00'),
				"delivery_slot": {
					"cutoff_time": "11:59:59",
					"delivery_start": "08:00:00",
					"delivery_end": "18:59:59",
				}
			},
			{
				"delivery_date": moment().subtract(1, 'days').format('YYYY-MM-DD 00:00:00'),
				"delivery_slot": {
					"cutoff_time": "11:59:59",
					"delivery_start": "08:00:00",
					"delivery_end": "18:59:59",
				}
			}
		]
		let header = shallowRenderer(<HeaderIndex />).instance()

		expect(header.findNextOrderId(orders, moment())).toEqual(null)
	})

	it('findNextOrderId should return the closest to today order index when there is a next order', function() {
		let orders = [
			{
				"delivery_date": moment().add(2, 'days').format('YYYY-MM-DD 00:00:00'),
				"delivery_slot": {
					"cutoff_time": "11:59:59",
					"delivery_start": "08:00:00",
					"delivery_end": "18:59:59",
				}
			},
			{
				"delivery_date": moment().add(1, 'days').format('YYYY-MM-DD 00:00:00'),
				"delivery_slot": {
					"cutoff_time": "11:59:59",
					"delivery_start": "08:00:00",
					"delivery_end": "18:59:59",
				}
			},
			{
				"delivery_date": moment().add(3, 'days').format('YYYY-MM-DD 00:00:00'),
				"delivery_slot": {
					"cutoff_time": "11:59:59",
					"delivery_start": "08:00:00",
					"delivery_end": "18:59:59",
				}
			}
		]
		let header = shallowRenderer(<HeaderIndex />).instance()

		expect(header.findNextOrderId(orders, moment())).toEqual(1)
	})

	it('findNextOrderId should return the closest to today even if it has passed but was today', function() {
		let orders = [
			{
				"delivery_date": moment().add(2, 'days').format('YYYY-MM-DD 00:00:00'),
				"delivery_slot": {
					"cutoff_time": "11:59:59",
					"delivery_start": "08:00:00",
					"delivery_end": "18:59:59",
				}
			},
			{
				"delivery_date": moment().format('YYYY-MM-DD 00:00:00'),
				"delivery_slot": {
					"cutoff_time": "11:59:59",
					"delivery_start": "08:00:00",
					"delivery_end": "18:59:59",
				}
			},
			{
				"delivery_date": moment().add(3, 'days').format('YYYY-MM-DD 00:00:00'),
				"delivery_slot": {
					"cutoff_time": "11:59:59",
					"delivery_start": "08:00:00",
					"delivery_end": "18:59:59",
				}
			}
		]
		let header = shallowRenderer(<HeaderIndex />).instance()

		expect(header.findNextOrderId(orders, moment())).toEqual(1)
	})
})
