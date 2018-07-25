

const React = require('react')
const Enzyme = require('enzyme')


let shallowRenderer

const StatPanelContainer = require('../../../../js/my-gousto/components/stats/StatPanelContainer')
const StatPanel = require('../../../../js/my-gousto/components/stats/StatPanel')
const Heading = require('@fe/gousto-generic').Heading
let statPanelContainer

describe('StatPanelContainer', function() {

	describe('shallowRendering StatPanelContainer', function() {
		beforeEach(function() {
			shallowRenderer = Enzyme.shallow
		})
		it('should return a <div>', function() {
			const result = shallowRenderer(<StatPanelContainer />)

			expect(result.type()).toBe('div')
		})
		it('should show <Gousto.Heading/>', function() {
			const result = shallowRenderer(<StatPanelContainer />)

			expect(result.find(Heading).length).toEqual(1)
		})
		it('should return 4 <StatPanel/>s', function() {
			const result = shallowRenderer(<StatPanelContainer />)

			expect(result.find(StatPanel).length).toEqual(4)
		})
	})

	describe('getStatValue', function() {
		beforeEach(function() {
			statPanelContainer = shallowRenderer(<StatPanelContainer />).instance()
		})
		it('getWaste should return rounded calculation', function() {
			const result = statPanelContainer.getWaste(1)
			expect(result.unit).toEqual('Kilos')
			expect(result.value).toEqual(2)
		})
		it('getWaste should return rounded calculation', function() {
			const result = statPanelContainer.getWaste(1000)
			expect(result.unit).toEqual('Tons')
			expect(result.value).toEqual('1.90')
		})
		it('getTimeSaved should return rounded calculation', function() {
			const result = statPanelContainer.getTimeSaved(1)
			expect(result.unit).toEqual('Hours')
			expect(result.value).toEqual(1)
		})
	})
})
