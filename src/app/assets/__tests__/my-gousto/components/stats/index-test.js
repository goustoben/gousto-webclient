

const React = require('react')
const Enzyme = require('enzyme')


let shallowRenderer
const StatPanelContainer = require('../../../../js/my-gousto/components/stats/StatPanelContainer')
const StatsIndex = require('../../../../js/my-gousto/components/stats')

describe('StatsIndex', function() {
	beforeEach(function() {
		shallowRenderer = Enzyme.shallow
	})

	it('should return a <StatPanelContainer>', function() {
		const result = shallowRenderer(<StatsIndex />)


		expect(result.find(StatPanelContainer).length).toBe(1)
	})
})
