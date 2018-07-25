

const React = require('react')
const Enzyme = require('enzyme')


let shallowRenderer

const CookbookPanel = require('../../../../js/my-gousto/components/cookbook/CookbookPanel')
const RecipePanel = require('../../../../js/my-gousto/components/cookbook/RecipePanel')
const Heading = require('@fe/gousto-generic').Heading
let statPanelContainer

describe('shallowRendering StatPanelContainer', function() {
	beforeEach(function() {
		shallowRenderer = Enzyme.shallow
	})
	it('should return a <div>', function() {
		const result = shallowRenderer(<CookbookPanel />)

		expect(result.type()).toBe('div')
	})
	it('should show <Gousto.Heading/>', function() {
		const result = shallowRenderer(<CookbookPanel />)

		expect(result.find(Heading).length).toEqual(1)
	})
	it('should return 6 <RecipePanel/>s', function() {
		const result = shallowRenderer(<CookbookPanel recipes={[{}, {}, {}, {}, {}, {}]} />)

		expect(result.find(RecipePanel).length).toEqual(6)
	})
})
