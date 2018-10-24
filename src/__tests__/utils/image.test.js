import {
	getMenuRecipeImage,
	getFeaturedImage,
	getRangeImages,
} from 'utils/image'
import Immutable from 'immutable' /* eslint-disable new-cap */

describe('getMenuRecipeImage', () => {
	let urls
	beforeEach(() => {
		urls = Immutable.fromJS([
			{ src: 'image3', width: '700' },
			{ src: 'image5', width: '1500' },
			{ src: 'image1', width: '50' },
			{ src: 'image4', width: '1000' },
			{ src: 'image2', width: '200' },
		])
	})

	test('should return image4 for size 900', () => {
		expect(getMenuRecipeImage(urls, 900)).toEqual('image4')
	})

	test('should return image3 for size 600', () => {
		expect(getMenuRecipeImage(urls, 600)).toEqual('image3')
	})

	test('should return image2 for size 200', () => {
		expect(getMenuRecipeImage(urls, 200)).toEqual('image2')
	})

	test('should return image2 for size 100', () => {
		expect(getMenuRecipeImage(urls, 100)).toEqual('image2')
	})

	test('should return image5 for size 1400', () => {
		expect(getMenuRecipeImage(urls, 1400)).toEqual('image5')
	})

	test('should return image5 for size 1600', () => {
		expect(getMenuRecipeImage(urls, 1600)).toEqual('image5')
	})
})

describe('getFeaturedImage when there IS a homepage image', () => {
	let recipe
	beforeEach(() => {
		recipe = Immutable.fromJS({
			media: {
				images: [
					{
						type: 'mood-image',
						urls: [
							{
								src:
									'https://s3-gousto-haricots-media.s3.amazonaws.com/cms/mood-image/324-x50.jpg',
								width: 50,
							},
						],
					},
					{
						type: 'homepage-image',
						urls: [
							{
								src:
									'https://s3-gousto-haricots-media.s3.amazonaws.com/cms/homepage-image/324-x50.jpg',
								width: 50,
							},
						],
					},
				],
			},
		})
	})

	test('should return the homepage image if it is the featured image', () => {
		expect(JSON.stringify(getFeaturedImage(recipe, 'featured'))).toContain(
			'homepage-image',
		)
	})

	test('should return the homepage image if it is the detail image', () => {
		expect(JSON.stringify(getFeaturedImage(recipe, 'detail'))).toContain(
			'homepage-image',
		)
	})

	test('should not return the homepage image', () => {
		expect(JSON.stringify(getFeaturedImage(recipe, 'not featured'))).toContain(
			'mood-image',
		)
	})
})

describe('getFeaturedImage when there IS NOT a homepage image', () => {
	let recipe
	beforeEach(() => {
		recipe = Immutable.fromJS({
			media: {
				images: [
					{
						type: 'mood-image',
						urls: [
							{
								src:
									'https://s3-gousto-haricots-media.s3.amazonaws.com/cms/mood-image/324-x50.jpg',
								width: 50,
							},
						],
					},
				],
			},
		})
	})

	test('if it is a featured section should return the mood image if there is no homepage image', () => {
		expect(JSON.stringify(getFeaturedImage(recipe, 'featured'))).toContain(
			'mood-image',
		)
	})

	test('if it is a detail section should return the mood image if there is no homepage image', () => {
		expect(JSON.stringify(getFeaturedImage(recipe, 'detail'))).toContain(
			'mood-image',
		)
	})
})

describe('getRangeImages', () => {
	let recipe

	describe('should return an empty list', () => {
		test('when recipe is undefined', () => {
			recipe = undefined

			expect(getRangeImages(recipe)).toEqual(Immutable.List())
		})

		test('when given a recipe with no images', () => {
			recipe = Immutable.Map({})

			expect(getRangeImages(recipe)).toEqual(Immutable.List())
		})

		test('when given recipes image list not containing any fine dine in image types', () => {
			recipe = Immutable.fromJS({
				media: {
					images: [{ type: 'mood-image' }, { type: 'homepage-image' }],
				},
			})

			expect(getRangeImages(recipe)).toEqual(Immutable.List())
		})
	})

	test('should return a subset of fine dine-in image types', () => {
		recipe = Immutable.fromJS({
			media: {
				images: [
					{ type: 'mood-image' },
					{ type: 'homepage-image' },
					{ type: 'range-main-image' },
					{ type: 'range-detail-1-image' },
				],
			},
		})

		expect(getRangeImages(recipe).size).toEqual(2)
	})

	test('should return fine dine-in image types ordered by type', () => {
		recipe = Immutable.fromJS({
			media: {
				images: [
					{ type: 'mood-image' },
					{ type: 'range-detail-2-image' },
					{ type: 'homepage-image' },
					{ type: 'range-main-image' },
					{ type: 'range-detail-1-image' },
				],
			},
		})

		const expected = Immutable.fromJS([
			{ type: 'range-main-image' },
			{ type: 'range-detail-1-image' },
			{ type: 'range-detail-2-image' },
		])

		const result = getRangeImages(recipe)

		expect(result).toEqual(expected)
	})
})
