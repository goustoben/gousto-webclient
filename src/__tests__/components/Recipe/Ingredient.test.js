import React from 'react'

import { shallow } from 'enzyme'
import Ingredient from 'Recipe/Ingredients/Ingredient.js'
import Image from 'Image'
import Svg from 'Svg'
import Immutable from 'immutable'

describe('<Ingredient />', () => {
	let ingredient
	let mutableIngredient
	let wrapper

	beforeEach(() => {
		mutableIngredient = {
			media: {
				images: [
					{
						urls: [
							{
								src: 'carrot.small.jpg',
								width: 100,
							},
							{
								src: 'carrot.medium.jpg',
								width: 150,
							},
							{
								src: 'carrot.large.jpg',
								width: 200,
							},
							{
								src: 'carrot.extraLarge.jpg',
								width: 250,
							},
						],
					},
				],
			},
			allergens: [],
			name: 'carrot',
			label: 'one carrot',
		}
		ingredient = Immutable.fromJS(mutableIngredient)

		wrapper = shallow(<Ingredient ingredient={ingredient} />)
	})

	test('should return a <div>', () => {
		expect(wrapper.type()).toEqual('div')
	})

	test('should return a <span> with label', () => {
		const label = wrapper.find('span')
		expect(label.length).toEqual(1)
		expect(label.getElement().props.children[0]).toEqual(ingredient.get('label'))
	})

	test('should render an Image', () => {
		expect(wrapper.find(Image).length).toEqual(1)
	})

	test('should render a span ingredient label', () => {
		expect(wrapper.find('span').text()).toEqual(mutableIngredient.label)
	})

	test('should render the placeholder Svg if there is no image', () => {
		mutableIngredient = {
			media: {
				images: [],
			},
			name: 'carrot',
			label: 'one carrot',
		}
		ingredient = Immutable.fromJS(mutableIngredient)

		wrapper = shallow(<Ingredient ingredient={ingredient} />)
		expect(wrapper.find(Svg).length).toEqual(1)
	})

	test('should render allergens sign when allergens are provided in ingredient', () => {
		mutableIngredient = {
			media: {
				images: [
					{
						urls: [
							{
								src: 'carrot.small.jpg',
								width: 100,
							},
							{
								src: 'carrot.medium.jpg',
								width: 150,
							},
							{
								src: 'carrot.large.jpg',
								width: 200,
							},
							{
								src: 'carrot.extraLarge.jpg',
								width: 250,
							},
						],
					},
				],
			},
			allergens: ['test'],
			name: 'carrot',
			label: 'one carrot',
		}
		ingredient = Immutable.fromJS(mutableIngredient)

		wrapper = shallow(<Ingredient ingredient={ingredient} />)
		const label = wrapper.find('span')
		const cross = <span>&#8224;</span>
		expect(label.length).toEqual(2)
		expect(label.first().childAt(0).text()).toEqual(ingredient.get('label'))
		expect(label.last().childAt(0).text()).toEqual(
			cross.props.children,
		)
	})
})
