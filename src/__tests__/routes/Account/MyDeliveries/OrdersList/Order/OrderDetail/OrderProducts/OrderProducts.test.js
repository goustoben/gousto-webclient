import sinon from 'sinon'

import React from 'react'
import Immutable from 'immutable'
import { shallow } from 'enzyme'
import { Button } from 'goustouicomponents'
import OrderProducts from 'routes/Account/MyDeliveries/OrdersList/Order/OrderDetail/OrderProducts'
import ProductImage from 'routes/Account/AccountComponents/ProductImage'

describe('OrderProducts', () => {
	let sandbox
	let wrapper
	const productsSample = Immutable.fromJS([
		{ id: '1', title: 'title 1', quantity: 4, unitPrice: 14.323 },
		{ id: '2', title: 'title 2', quantity: 5, unitPrice: 15.0 },
		{ id: '3', title: 'title 3', quantity: 6, unitPrice: 20 },
	])
	const randomProductsSample = Immutable.fromJS([
		{ id: 1 },
		{ id: 2 },
		{ id: 3 },
		{ id: 4 },
		{ id: 5 },
		{ id: 6 },
		{ id: 7 },
	])

	beforeEach(() => {
		sandbox = sinon.sandbox.create()
	})
	afterEach(() => {
		sandbox.restore()
	})
	describe('rendering', () => {
		beforeEach(() => {
			wrapper = shallow(
				<OrderProducts
					orderId={'777'}
					products={productsSample}
					periodId={1}
					randomProducts={randomProductsSample}
				/>,
			)
		})

		test('should render a <div>', () => {
			expect(wrapper.type()).toBe('div')
		})

		test('should render as many <ProductImage> as products are passed', () => {
			expect(wrapper.find(ProductImage)).toHaveLength(3)
		})

		test('should render the titles of the products', () => {
			expect(wrapper.text()).toContain('title 1')
			expect(wrapper.text()).toContain('title 2')
			expect(wrapper.text()).toContain('title 3')
		})

		test('should render the quantity of products in "x howMany" format', () => {
			expect(wrapper.text()).toContain('x 4')
			expect(wrapper.text()).toContain('x 5')
			expect(wrapper.text()).toContain('x 6')
		})

		test('should render the price of the articles with 2 decimals', () => {
			expect(wrapper.text()).toContain('£14.32')
			expect(wrapper.text()).toContain('£15.00')
			expect(wrapper.text()).toContain('£20.00')
		})

		test('should render as many <ProductImage> as random products are passed, when no products are passed', () => {
			wrapper = shallow(<OrderProducts randomProducts={randomProductsSample} />)
			expect(wrapper.find(ProductImage)).toHaveLength(7)
		})

		test('should render a button', () => {
			expect(wrapper.find(Button)).toHaveLength(1)
		})
	})
})
