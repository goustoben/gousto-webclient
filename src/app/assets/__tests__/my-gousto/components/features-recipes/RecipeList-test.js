

const React = require('react')
const Enzyme = require('enzyme')

let shallowRenderer

const RecipeList = require('../../../../js/my-gousto/components/featured-recipes/RecipeList')
const RecipeItem = require('../../../../js/my-gousto/components/featured-recipes/RecipeItem')
const Heading = require('@fe/gousto-generic').Heading
let recipeList

describe('RecipeList', function() {

	describe('shallowRendering RecipeList', function() {
		beforeEach(function() {
			shallowRenderer = Enzyme.shallow
		})

		it('should return a <div> when recipes provided', function() {
			let recipes = [{label: 'Test Recipes'}]
			const result = shallowRenderer(<RecipeList recipes={recipes} />)


			expect(result.type()).toBe('div')
		})

		it('should show <Gousto.Heading/>', function() {
			let recipes = [{label: 'Test Recipes'}]
			const result = shallowRenderer(<RecipeList recipes={recipes} />)


			expect(result.find(Heading).length).toEqual(1)
		})

		it('should return 3 <RecipeItem/>s when no recipes provided', function() {
			const result = shallowRenderer(<RecipeList />)


			expect(result.find(RecipeItem).length).toEqual(3)
		})

		it('should show 3 <RecipeItem/>s, even if less given', function() {
			let recipes = [{label: 'Test Recipes'}, {label: 'Test Recipes2'}]
			const result = shallowRenderer(<RecipeList recipes={recipes} />)


			expect(result.find(RecipeItem).length).toEqual(3)
		})

		it('should not show <RecipeItem/>s, if finished and no recipes', function() {
			const result = shallowRenderer(<RecipeList recipes={[]} ready={true} />)


			expect(result.find(RecipeItem).length).toEqual(0)
		})
	})

	describe('getRecipesLink', function() {
		beforeEach(function() {
			recipeList = shallowRenderer(<RecipeList />).instance()
		})
		it('should returns concated url if orderId is set', function() {
			let routes = {
				twr: 'this-weeks-recipes',
				nwr: 'next-weeks-recipes'
			}
			let week = 'twr'
			let orderId = 3
			const result = recipeList.getRecipesLink(routes, week, orderId)
			expect(result).toEqual('this-weeks-recipes/3')
		})
		it('should returns config route if orderId is not set', function() {
			let routes = {
				twr: 'this-weeks-recipes',
				nwr: 'next-weeks-recipes'
			}
			let week = 'twr'
			let orderId
			const result = recipeList.getRecipesLink(routes, week, orderId)
			expect(result).toEqual('this-weeks-recipes')
		})
		it('should returns undefined if week priod key does not exist in the config routes', function() {
			let routes = {
				twr: 'this-weeks-recipes',
				nwr: 'next-weeks-recipes'
			}
			let week = 'wrong'
			let orderId
			const result = recipeList.getRecipesLink(routes, week, orderId)
			expect(result).toEqual(undefined)
		})
	})
})
