import React from 'react'
import { shallow } from 'enzyme'
import Immutable from 'immutable'

import ChefQuote from 'Recipe/ChefQuote'

describe('<ChefQuote />', () => {
	let wrapper
	const quote = 'This is a test quote'
	beforeEach(() => {
		wrapper = shallow(<ChefQuote quote={quote} />)
	})

	describe('rendering', () => {
		test('should return a <div>', () => {
			expect(wrapper.type()).toEqual('div')
		})

		test('should have two div children', () => {
			wrapper.children().forEach(node => {
				expect(node.type()).toEqual('div')
			})
			expect(wrapper.children().length).toEqual(2)
		})

		test('should display the given quote', () => {
			expect(wrapper.find('blockquote p').text()).toEqual(quote)
		})
	})

	describe('with Chef prop with one image', () => {
		const imageUrl =
			'http://vignette2.wikia.nocookie.net/orange-is-the-new-black/images/7/76/Judyking.jpg'
		const chef = Immutable.fromJS({
			media: {
				images: [
					{
						type: 'headshot-image',
						urls: [
							{
								src: imageUrl,
							},
						],
					},
				],
			},
			name: 'Judy King',
		})

		beforeEach(() => {
			wrapper = shallow(<ChefQuote quote={quote} chef={chef} />)
		})

		test('should show Judy King as the chef', () => {
			expect(
				wrapper
					.find('span')
					.at(0)
					.text()
					.indexOf('Judy King'),
			).not.toEqual(-1)
		})
	})

	describe('with Chef prop with two images', () => {
		const imageUrl =
			'http://vignette2.wikia.nocookie.net/orange-is-the-new-black/images/7/76/Judyking.jpg'
		const chef = Immutable.fromJS({
			media: {
				images: [
					{
						type: 'headshot-image',
						urls: [{ src: imageUrl }],
					},
					{
						type: 'signature-image',
						urls: [{ src: imageUrl }],
					},
				],
			},
			name: 'Judy King',
		})

		beforeEach(() => {
			wrapper = shallow(<ChefQuote quote={quote} chef={chef} />)
		})

		test("should show Judy King's second picture instead of her name", () => {
			expect(wrapper.find('span').length).toEqual(0)
			expect(wrapper.find('img').length).toEqual(2)
			expect(
				wrapper
					.find('img')
					.at(1)
					.prop('src'),
			).toEqual(imageUrl)
		})
	})
})
