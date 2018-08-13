import sinon from 'sinon'

import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import OrderRecipes from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderRecipes'
import OrderSideSwipe from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderRecipes/OrderSideSwipe'
import Link from 'Link'

describe('OrderRecipes', () => {
	let sandbox
	let wrapper
	const recipes = Immutable.fromJS([
		{
			image: 'http://image-url',
			title: 'A recipe title',
		},
		{
			image: 'http://image-url2',
			title: 'A recipe title 2',
		},
	])
	const orderId = '77'

	beforeEach(() => {
		sandbox = sinon.sandbox.create()
	})
	afterEach(() => {
		sandbox.restore()
	})
	describe('rendering', () => {
		wrapper = shallow(
			<OrderRecipes
				recipes={recipes}
				orderId={orderId}
				orderState="menu open"
				whenCutoff="8 March"
			/>,
		)

		test('should render a <div>', () => {
			expect(wrapper.type()).toEqual('div')
		})

		test('should render <OrderSideSwipe> passing the recipes as prop', () => {
			const sideSwipe = wrapper.children(OrderSideSwipe)
			expect(sideSwipe.prop('recipes')).toEqual(recipes)
		})

		test('should render a CTA to pick recipes if the menu is open that includes the whenCutoff', () => {
			expect(wrapper.text()).toContain(
				'If you do not choose by 8 March, Gousto will send you a selection of recipes based on your subscription settings.',
			)
		})

		test('should render a <Link> pointing to /menu/{orderId} when state is menu open', () => {
			const link = wrapper.children('div').children(Link)
			expect(link.prop('to')).toEqual(`/menu/${orderId}`)
		})

		test('should contain the correct button text', () => {
			wrapper = shallow(
				<OrderRecipes
					recipes={recipes}
					orderId={orderId}
					orderState="menu open"
					whenCutoff="8 March"
				/>,
			)
			expect(wrapper.text()).toContain('GoustoLink')
			expect(
				wrapper.find(Link).props('children').children.props.children,
			).toEqual('Choose recipes')
		})

		test('should contain the correct button text', () => {
			wrapper = shallow(
				<OrderRecipes
					recipes={recipes}
					orderId={orderId}
					orderState="recipes chosen"
					whenCutoff="8 March"
				/>,
			)
			expect(wrapper.text()).toContain('GoustoLink')
			expect(
				wrapper.find(Link).props('children').children.props.children,
			).toEqual('Edit recipes')
		})
	})
})
