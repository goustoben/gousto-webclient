

const React = require('react')
const Enzyme = require('enzyme')

let shallowRenderer

const RecipeItem = require('../../../../js/my-gousto/components/featured-recipes/RecipeItem')
const Image = require('@fe/gousto-generic').Image

describe('RecipeItem', function() {
	beforeEach(function() {
		shallowRenderer = Enzyme.shallow
	})

	it('should return a <div> when recipes provided', function() {
		let recipe = {label: 'Test Recipes'}
		const result = shallowRenderer(<RecipeItem recipe={recipe} />)


		expect(result.type()).toBe('div')
	})

	it('should have an image', function() {
		let recipe = {
			label: 'Test Recipes',
			media: [
				{
					purpose: 'mood-image',
					url: 'https://s3-gousto-staging-media.s3.amazonaws.com/cms/mood-image/58.tamil-nadu-prawn-masala-53bab81bceb4f-x50.jpg',
				}
			]
		}
		const result = shallowRenderer(<RecipeItem recipe={recipe} />)


		expect(result.find(Image).length).toEqual(1)
	})

})
