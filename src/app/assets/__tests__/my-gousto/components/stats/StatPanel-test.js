

const React = require('react')
const Enzyme = require('enzyme')


let shallowRenderer

const StatPanel = require('../../../../js/my-gousto/components/stats/StatPanel')
const Svg = require('@fe/gousto-generic').Svg

describe('StatPanelContainer', function() {
	beforeEach(function() {
		shallowRenderer = Enzyme.shallow
	})

	it('should return a <div>', function() {
		const result = shallowRenderer(<StatPanel />)


		expect(result.type()).toBe('div')
	})

	it('should show <Gousto.Svg/>', function() {
		const result = shallowRenderer(<StatPanel />)


		expect(result.find(Svg).length).toEqual(1)
	})
})
