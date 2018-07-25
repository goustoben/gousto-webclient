

const React = require('react')
const Enzyme = require('enzyme')


let shallowRenderer
let recipeData
let recipePanel

const RecipePanel = require('../../../../js/my-gousto/components/cookbook/RecipePanel')
const Image = require('@fe/gousto-generic').Image

describe('StatPanelContainer', function() {

	describe('shalowRendering without recipeData', function() {
		beforeEach(function() {
			shallowRenderer = Enzyme.shallow
			recipeData = {url:'', img:'img-url-1', title:''}
		})

		it('should return a <div>', function() {
			const result = shallowRenderer(<RecipePanel recipeData={recipeData} ready={true} />)


			expect(result.type()).toBe('div')
		})

		it('should show <Gousto.Image/>', function() {
			const result = shallowRenderer(<RecipePanel recipeData={recipeData} ready={true} />)


			expect(result.find(Image).length).toEqual(1)
		})
	})

	describe('getRecipePanel with recipeData', function() {
		beforeEach(function() {
			shallowRenderer = Enzyme.shallow
			recipePanel = shallowRenderer(<RecipePanel />).instance()
			recipeData = {url:'url-1', img:'img-url-1', title:'recipe-1'}
		})

		it('should return a <div>', function() {
			const result = shallowRenderer(<RecipePanel recipeData={recipeData} ready={true} />)
			result.setState({ imageLoaded: true })

			expect(result.children().type()).toBe('div')
			expect(result.children().hasClass('cookbook-container')).toBe(true)
		})

		it('should show <Gousto.Image/>', function() {
			const result = shallowRenderer(<RecipePanel recipeData={recipeData} ready={true} />)
			result.setState({ imageLoaded: true })
			expect(result.children().find(Image).length).toEqual(1)
		})
	})
})
