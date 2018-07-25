

const React = require('react')
const Enzyme = require('enzyme')

const moment = require('moment')
let shallowRenderer

const Editorial = require('../../../../js/my-gousto/components/editorial')

describe('Editorial', function () {
	beforeEach(function () {
		shallowRenderer = Enzyme.shallow
	})

	it('should return a <div>', function () {
		const result = shallowRenderer(<Editorial />)


		expect(result.type()).toBe('div')
	})

	it('should have a child of <div.editorial-image--container/>', function () {
		const result = shallowRenderer(<Editorial />)


		expect(result.find('.editorial-image--container').length).toEqual(1)
	})

	it('should have a child of <div.editorial-content/>', function () {
		const result = shallowRenderer(<Editorial />)


		expect(result.find('.editorial-content').length).toEqual(1)
	})

	it('should display BestChoise banner when the date is due', function () {
		const result = shallowRenderer(<Editorial displayBestChoiseDate={moment().format('YYYY-MM-DD')} />)

		expect(result.find('.editorial-content-title').props().children).toEqual('Variety (the spice of life and all that...)')
	})

	it('should display Nutritionist banner when the displayBestChoiseDate is not due', function () {
		const result = shallowRenderer(<Editorial displayBestChoiseDate={moment().add(1, 'day').format('YYYY-MM-DD')} />)

		expect(result.find('.editorial-content-title').props().children).toEqual('A word from our nutritionist')
	})
})
