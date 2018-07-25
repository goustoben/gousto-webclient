

const React = require('react')
const Enzyme = require('enzyme')


let shallowRenderer
const CookbookPanel = require('../../../../js/my-gousto/components/cookbook/CookbookPanel')
const CookbookIndex = require('../../../../js/my-gousto/components/cookbook')

describe('CookbookIndex', function() {

	it('should return a <CookbookPanel>', function() {
		shallowRenderer = Enzyme.shallow
		const result = shallowRenderer(<CookbookIndex />)


		expect(result.find(CookbookPanel).length).toBe(1)
	})

	describe('getRecipes', function() {
		it('should return 6 recipes length even though user does not have 6 orders', function() {
			let cookbook = shallowRenderer(<CookbookIndex />).instance()
			let userOrders = new Map ([
				['1', {
					url: 'url-1',
					title: 'recipe-1',
					media: [
						{url: 'media-url-1'}
					]
				}],
				['2', {
					url: 'url-2',
					title: 'recipe-2',
					media: [
						{url: 'media-url-2'}
					]
				}],
				['3', {
					url: 'url-3',
					title: 'recipe-3',
					media: [
						{url: 'media-url-3'}
					]
				}]
			])
			let recipes = cookbook.getRecipes(userOrders)

			expect(recipes.length).toEqual(6)
		})

		it('should return empty array when no falsy value is passed as user recipes', function() {
			let cookbook = shallowRenderer(<CookbookIndex />).instance()
			let recipes = cookbook.getRecipes(undefined)

			expect(recipes.length).toEqual(0)
		})

		it('should return placeholder array when empty object is passed as user recipes', function() {
			let cookbook = shallowRenderer(<CookbookIndex />).instance()
			let recipes = cookbook.getRecipes(new Map())

			expect(recipes.length).toEqual(6)
		})
	})
})
