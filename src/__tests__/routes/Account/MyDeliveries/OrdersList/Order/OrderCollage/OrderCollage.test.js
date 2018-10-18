import sinon from 'sinon'

import React from 'react'
import { shallow, mount } from 'enzyme'
import Immutable from 'immutable' // eslint-disable-line no-caps
import OrderCollage from 'routes/Account/MyDeliveries/OrdersList/Order/OrderCollage'
import css from 'routes/Account/MyDeliveries/OrdersList/Order/OrderCollage/OrderCollage.css'

describe('OrderCollage', () => {
	let sandbox
	let recipes

	beforeEach(() => {
		sandbox = sinon.sandbox.create()
		recipes = Immutable.fromJS([])
	})
	afterEach(done => {
		sandbox.restore()
		done()
	})
	describe('rendering', () => {
		let wrapper

		beforeEach(() => {
			wrapper = shallow(<OrderCollage recipes={recipes} />)
		})

		test('should render a <div> with no props', () => {
			expect(wrapper.type()).toBe('div')
		})
		test('should render one collageContainer', () => {
			const className = `.${css.collageContainer.split(' ').join('.')}`
			expect(wrapper.find(className)).toHaveLength(1)
		})
		test('should always render four elements with collageItem class', () => {
			wrapper = mount(<OrderCollage recipes={recipes} />)
			const className = `.${css.emptyItem.split(' ').join('.')}`
			expect(wrapper.find(className)).toHaveLength(4)
		})
		describe('Renders the correct number of images', () => {
			test('should render n <img> components where n is recipes length', () => {
				recipes = Immutable.fromJS([
					{
						image: 'https://external-img.jpg',
						recipeTitle: 'Cheesy Pangasius',
						recipeId: '1',
					},
					{
						image: 'https://external-img.jpg',
						recipeTitle: 'Cheesy Pangasius',
						recipeId: '2',
					},
					{
						image: 'https://external-img.jpg',
						recipeTitle: 'Cheesy Pangasius',
						recipeId: '3',
					},
					{
						image: 'https://external-img.jpg',
						recipeTitle: 'Cheesy Pangasius',
						recipeId: '4',
					},
				])
				wrapper = mount(<OrderCollage isCommitted recipes={recipes} />)
				expect(wrapper.find('img').length).toBe(4)

				recipes = Immutable.fromJS([
					{
						image: 'https://external-img.jpg',
						recipeTitle: 'Cheesy Pangasius',
						recipeId: '1',
					},
					{
						image: 'https://external-img.jpg',
						recipeTitle: 'Cheesy Pangasius',
						recipeId: '2',
					},
				])
				wrapper = mount(<OrderCollage recipes={recipes} />)
				expect(wrapper.find('img').length).toBe(2)
			})
		})
	})
})
