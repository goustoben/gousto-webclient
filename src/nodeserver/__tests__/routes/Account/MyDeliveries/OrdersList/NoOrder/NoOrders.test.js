import sinon from 'sinon'

import Immutable from 'immutable' // eslint-disable-line no-caps

import React from 'react'
import { shallow } from 'enzyme'
import NoOrders from 'routes/Account/MyDeliveries/OrdersList/NoOrders/NoOrders'
import css from 'routes/Account/MyDeliveries/OrdersList/NoOrders/NoOrders.css'
import Content from 'containers/Content'

describe('OrdersList', () => {
	describe('rendering', () => {
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

		beforeEach(() => {
			wrapper = shallow(<NoOrders recipes={recipes} dietType="gourmet" />)
		})

		test('should render 2 cards', () => {
			const className = `.${css.orderWrap.split(' ').join('.')}`
			expect(wrapper.find(className)).toHaveLength(2)
		})

		test('should render one card of type order', () => {
			const className = `.${css.order.split(' ').join('.')}`
			expect(wrapper.find(className)).toHaveLength(2)
		})

		test('should render a SeeMenuSection', () => {
			expect(wrapper.text()).toContain('<SeeMenuSection />')
		})

		test('should render a SeeMenuSection', () => {
			expect(wrapper.text()).toContain('<GoustoLink />')
		})

		test('should render a message saying there are no upcoming deliveries', () => {
			expect(
				wrapper
					.find(Content)
					.first()
					.props().contentKeys,
			).toBe('myDeliveriesNoOrdersBaseMessage')
			expect(
				wrapper
					.find(Content)
					.at(1)
					.props().contentKeys,
			).toBe('myDeliveriesNoOrdersBaseCopy')
		})
	})
})
